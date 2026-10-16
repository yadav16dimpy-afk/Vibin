'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Profile,
  RoomProject,
  RoomType,
  RoomSize,
  FurnishingStatus,
  BudgetTier,
  VibeStyleId,
  SavedItem,
} from '@/lib/supabase/types';
import { MOCK_MAKEOVERS } from '@/data/mockMakeovers';
import { MOCK_PRODUCTS, ProductItem } from '@/data/mockProducts';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

export interface RoomRules {
  renterFriendly: boolean;
  keepExistingFurniture: boolean;
  noDrilling: boolean;
  smallSpaceOptimized: boolean;
  petFriendly: boolean;
}

export interface MakeoverDraft {
  photoFile: File | null;
  photoPreviewUrl: string | null;
  roomType: RoomType;
  roomSize: RoomSize;
  furnishingStatus: FurnishingStatus;
  customNotes: string;
  vibeStyle: VibeStyleId;
  budgetRange: BudgetTier;
  customBudgetInr: number | null;
  rules: RoomRules;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  priceInr: number;
  merchant: string;
  imageUrl: string;
  quantity: number;
  deliveryEstimate: string;
  category: string;
}

export interface StylistMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  actionApplied?: string;
  suggestedItem?: ProductItem;
}

const DEFAULT_DRAFT: MakeoverDraft = {
  photoFile: null,
  photoPreviewUrl: null,
  roomType: 'hostel_room',
  roomSize: 'small',
  furnishingStatus: 'partly_furnished',
  customNotes: '',
  vibeStyle: 'cozy',
  budgetRange: 'under_5000',
  customBudgetInr: null,
  rules: {
    renterFriendly: true,
    keepExistingFurniture: true,
    noDrilling: true,
    smallSpaceOptimized: true,
    petFriendly: false,
  },
};

interface ToastState {
  message: string;
  type: 'success' | 'info' | 'error';
}

export type AddToCartInput =
  | ProductItem
  | CartItem
  | {
      productId: string;
      name: string;
      priceInr: number;
      merchant: string;
      imageUrl: string;
      category?: string;
      deliveryEstimate?: string;
    };

interface AppContextType {
  // Auth
  user: Profile | null;
  isLoggedIn: boolean;
  loginModalOpen: boolean;
  loginModalReason: string;
  openLoginModal: (reason?: string) => void;
  closeLoginModal: () => void;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;

  // Credits
  credits: number;
  planType: 'free' | 'starter' | 'pass' | 'pro';
  buyCreditsModalOpen: boolean;
  openBuyCreditsModal: () => void;
  closeBuyCreditsModal: () => void;
  deductCredit: () => boolean;
  addCredits: (count: number, plan: 'starter' | 'pass' | 'pro') => void;

  // Makeover Wizard Draft
  draft: MakeoverDraft;
  updateDraft: (partial: Partial<MakeoverDraft>) => void;
  updateDraftRules: (partialRules: Partial<RoomRules>) => void;
  resetDraft: () => void;

  // Projects
  projects: RoomProject[];
  saveProject: (project: RoomProject) => void;
  deleteProject: (id: string) => void;
  getProject: (id: string) => RoomProject | undefined;

  // Universal Consolidated Multi-Merchant Cart
  cart: CartItem[];
  addToCart: (product: AddToCartInput, qty?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Checklist
  savedItems: SavedItem[];
  toggleItemCheck: (id: string) => void;
  updateItemQuantity: (id: string, qty: number) => void;
  addItemToShoppingList: (product: ProductItem) => void;
  removeItemFromShoppingList: (id: string) => void;
  totalShoppingCost: number;

  // AI Room Stylist Transformation Agent
  activeTransformLayers: {
    warmLighting: boolean;
    linenBedding: boolean;
    juteRug: boolean;
    wallAdhesives: boolean;
    airPlants: boolean;
  };
  toggleTransformLayer: (layer: 'warmLighting' | 'linenBedding' | 'juteRug' | 'wallAdhesives' | 'airPlants') => void;
  stylistMessages: StylistMessage[];
  sendStylistPrompt: (userPrompt: string) => Promise<void>;

  // Language & PWA
  language: 'en' | 'hinglish';
  setLanguage: (lang: 'en' | 'hinglish') => void;
  canInstallPwa: boolean;
  installPwa: () => Promise<void>;

  // Toast
  toast: ToastState | null;
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // 1. Auth State
  const [user, setUser] = useState<Profile | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginModalReason, setLoginModalReason] = useState('Sign in to continue');

  // 2. Credits State
  const [credits, setCredits] = useState<number>(2);
  const [planType, setPlanType] = useState<'free' | 'starter' | 'pass' | 'pro'>('free');
  const [buyCreditsModalOpen, setBuyCreditsModalOpen] = useState(false);

  // 3. Draft State
  const [draft, setDraft] = useState<MakeoverDraft>(DEFAULT_DRAFT);

  // 4. Universal Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    return [
      {
        id: 'cart-1',
        productId: 'prod-lights-1',
        name: 'Warm White 2700K Fairy Copper Wire String Lights',
        priceInr: 349,
        merchant: 'Amazon India',
        imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
        quantity: 1,
        deliveryEstimate: 'Guaranteed Delivery in 24h',
        category: 'Lighting',
      },
      {
        id: 'cart-2',
        productId: 'prod-rug-1',
        name: 'Hand-braided Natural Jute Circular Floor Mat',
        priceInr: 1199,
        merchant: 'IKEA India',
        imageUrl: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80',
        quantity: 1,
        deliveryEstimate: 'Standard Express: 3 Business Days',
        category: 'Flooring',
      },
      {
        id: 'cart-3',
        productId: 'prod-cushions-1',
        name: 'Jaipuri Hand Block Print Cotton Cushion Covers (Set of 5)',
        priceInr: 899,
        merchant: 'Pepperfry',
        imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80',
        quantity: 1,
        deliveryEstimate: 'Dispatched from Artisan Warehouse in Jaipur',
        category: 'Textiles',
      },
    ];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 5. AI Room Stylist Transformation Layers & Agent Chat
  const [activeTransformLayers, setActiveTransformLayers] = useState({
    warmLighting: true,
    linenBedding: true,
    juteRug: true,
    wallAdhesives: true,
    airPlants: true,
  });

  const [stylistMessages, setStylistMessages] = useState<StylistMessage[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      text: 'Namaste! I am your AI Room Stylist. I have scanned your actual room photo and created renter-safe transformation overlays. Your original walls, window frames, and floor tiles are preserved. What would you like to refine?',
      timestamp: 'Just now',
    },
  ]);

  // 6. Projects State
  const [projects, setProjects] = useState<RoomProject[]>(() => {
    return MOCK_MAKEOVERS.map((mock) => ({
      id: mock.id,
      user_id: 'user_demo',
      title: mock.title,
      room_type: (mock.roomType.toLowerCase().includes('hostel') ? 'hostel_room' : 'living_room') as RoomType,
      room_size: 'medium' as RoomSize,
      furnishing_status: 'partly_furnished' as FurnishingStatus,
      vibe_style: mock.vibeId as VibeStyleId,
      budget_range: mock.budgetInr <= 5000 ? 'under_5000' : '5000_10000',
      custom_budget_inr: mock.budgetInr,
      custom_notes: mock.tagline,
      renter_friendly: true,
      keep_existing_furniture: true,
      no_drilling: true,
      small_space_optimized: true,
      pet_friendly: false,
      status: 'saved',
      original_image_url: mock.beforeImage,
      generated_image_url: mock.afterImage,
      style_match_score: mock.styleScore,
      budget_match_score: mock.budgetScore,
      renter_friendly_score: mock.renterScore,
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      updated_at: new Date().toISOString(),
    }));
  });

  // 7. Saved Items
  const [savedItems, setSavedItems] = useState<SavedItem[]>(() => {
    return MOCK_PRODUCTS.slice(0, 4).map((p) => ({
      id: `saved-${p.id}`,
      user_id: 'user_demo',
      product_id: p.id,
      custom_title: p.name,
      price_inr: p.estimatedPriceInr,
      quantity: 1,
      is_checked: false,
      category: p.category,
      merchant_name: p.merchant,
      image_url: p.imageUrl,
    }));
  });

  // 8. Language & PWA
  const [language, setLanguage] = useState<'en' | 'hinglish'>('en');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstallPwa, setCanInstallPwa] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  // Client hydration
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedCart = localStorage.getItem('vibin_universal_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedUser = localStorage.getItem('vibin_user');
      if (savedUser) setUser(JSON.parse(savedUser));

      const savedCredits = localStorage.getItem('vibin_credits');
      if (savedCredits) setCredits(Number(savedCredits));

      const savedLang = localStorage.getItem('vibin_lang');
      if (savedLang === 'hinglish' || savedLang === 'en') setLanguage(savedLang);

      const localProjects = localStorage.getItem('vibin_projects');
      if (localProjects) {
        const parsed = JSON.parse(localProjects);
        if (Array.isArray(parsed) && parsed.length > 0) setProjects(parsed);
      }
    } catch (e) {
      console.warn('Could not read saved local state:', e);
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstallPwa(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('vibin_universal_cart', JSON.stringify(cart));
      } catch (e) {
        console.warn('Failed to persist cart:', e);
      }
    }
  }, [cart]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3600);
  };

  // Cart operations
  const addToCart = (product: AddToCartInput, qty = 1) => {
    const isCartType = 'productId' in product;
    const prodId = isCartType ? product.productId : product.id;
    const price = 'priceInr' in product ? product.priceInr : product.estimatedPriceInr;
    const category = 'category' in product && product.category ? product.category : 'Decor';

    setCart((prev) => {
      const existing = prev.find((item) => item.productId === prodId);
      if (existing) {
        return prev.map((item) =>
          item.productId === prodId ? { ...item, quantity: item.quantity + qty } : item
        );
      }

      const newItem: CartItem = {
        id: `cart-${prodId}-${Date.now()}`,
        productId: prodId,
        name: product.name,
        priceInr: price,
        merchant: product.merchant,
        imageUrl: product.imageUrl,
        quantity: qty,
        deliveryEstimate:
          'deliveryEstimate' in product && product.deliveryEstimate
            ? product.deliveryEstimate
            : 'Live Merchant Fulfilled • 2-3 Days',
        category,
      };
      return [newItem, ...prev];
    });

    showToast(`Added to unified cart: ${product.name.slice(0, 24)}... 🛒`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.priceInr * item.quantity, 0);

  // AI Room Stylist Transformation Layer Toggle
  const toggleTransformLayer = (layer: 'warmLighting' | 'linenBedding' | 'juteRug' | 'wallAdhesives' | 'airPlants') => {
    setActiveTransformLayers((prev) => {
      const next = { ...prev, [layer]: !prev[layer] };
      showToast(`${layer.replace(/([A-Z])/g, ' $1').toLowerCase()} ${next[layer] ? 'applied' : 'hidden'} on your photo`, 'info');
      return next;
    });
  };

  // AI Room Stylist Conversational Agent
  const sendStylistPrompt = async (userPrompt: string) => {
    const userMsg: StylistMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userPrompt,
      timestamp: 'Just now',
    };
    setStylistMessages((prev) => [...prev, userMsg]);

    const lower = userPrompt.toLowerCase();
    setTimeout(() => {
      let agentReply = '';
      let suggested: ProductItem | undefined;

      if (lower.includes('light') || lower.includes('dark') || lower.includes('lamp') || lower.includes('tube')) {
        agentReply = 'I have adjusted the lighting matrix over your photo: dialed down the harsh overhead tube light and overlaid 2700K warm string lights along the perimeter.';
        setActiveTransformLayers((prev) => ({ ...prev, warmLighting: true }));
        suggested = MOCK_PRODUCTS.find((p) => p.id === 'prod-lights-1');
      } else if (lower.includes('rug') || lower.includes('floor') || lower.includes('tile')) {
        agentReply = 'Detected the tile layout in your photo. I overlaid a 90cm natural braided jute rug in the center to warm up the floor while keeping your rented tiles intact.';
        setActiveTransformLayers((prev) => ({ ...prev, juteRug: true }));
        suggested = MOCK_PRODUCTS.find((p) => p.id === 'prod-rug-1');
      } else if (lower.includes('bed') || lower.includes('sheet') || lower.includes('pillow') || lower.includes('cushion')) {
        agentReply = 'Preserved your existing cot dimensions. Overlaid washed organic cotton bedding with earthy block-print cushions.';
        setActiveTransformLayers((prev) => ({ ...prev, linenBedding: true }));
        suggested = MOCK_PRODUCTS.find((p) => p.id === 'prod-bedsheet-1');
      } else if (lower.includes('plant') || lower.includes('green')) {
        agentReply = 'Placed a low-light indoor Sansevieria snake plant near your window ledge to add organic life without needing drilling.';
        setActiveTransformLayers((prev) => ({ ...prev, airPlants: true }));
        suggested = MOCK_PRODUCTS.find((p) => p.id === 'prod-plant-1');
      } else {
        agentReply = `Understood: "${userPrompt}". I have recalibrated the room styler to maintain your original furniture while tuning the decor accents for high cohesion.`;
      }

      const agentMsg: StylistMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: agentReply,
        timestamp: 'Just now',
        suggestedItem: suggested,
      };
      setStylistMessages((prev) => [...prev, agentMsg]);
    }, 900);
  };

  // Auth & Project handlers
  const openLoginModal = (reason = 'Sign in to continue') => {
    setLoginModalReason(reason);
    setLoginModalOpen(true);
  };
  const closeLoginModal = () => setLoginModalOpen(false);
  const openBuyCreditsModal = () => setBuyCreditsModalOpen(true);
  const closeBuyCreditsModal = () => setBuyCreditsModalOpen(false);

  const loginWithGoogle = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined },
      });
    } else {
      const mockUser: Profile = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        email: 'priya.sharma@example.com',
        full_name: 'Priya Sharma',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        preferred_language: language,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setUser(mockUser);
      if (typeof window !== 'undefined') localStorage.setItem('vibin_user', JSON.stringify(mockUser));
      closeLoginModal();
      showToast('Welcome back, Priya! ✨', 'success');
    }
  };

  const loginWithEmail = async (email: string, name?: string) => {
    const mockUser: Profile = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      email,
      full_name: name || email.split('@')[0],
      avatar_url: null,
      preferred_language: language,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setUser(mockUser);
    if (typeof window !== 'undefined') localStorage.setItem('vibin_user', JSON.stringify(mockUser));
    closeLoginModal();
    showToast(`Signed in as ${mockUser.full_name}`, 'success');
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) await supabase.auth.signOut();
    setUser(null);
    if (typeof window !== 'undefined') localStorage.removeItem('vibin_user');
    showToast('Logged out safely', 'info');
  };

  const deductCredit = (): boolean => {
    if (credits <= 0) {
      openBuyCreditsModal();
      return false;
    }
    const updated = credits - 1;
    setCredits(updated);
    if (typeof window !== 'undefined') localStorage.setItem('vibin_credits', String(updated));
    return true;
  };

  const addCredits = (count: number, plan: 'starter' | 'pass' | 'pro') => {
    const updated = credits + count;
    setCredits(updated);
    setPlanType(plan);
    if (typeof window !== 'undefined') localStorage.setItem('vibin_credits', String(updated));
    showToast(`Added ${count} Credits! ✨`, 'success');
  };

  const updateDraft = (partial: Partial<MakeoverDraft>) => setDraft((prev) => ({ ...prev, ...partial }));
  const updateDraftRules = (partialRules: Partial<RoomRules>) =>
    setDraft((prev) => ({ ...prev, rules: { ...prev.rules, ...partialRules } }));
  const resetDraft = () => setDraft(DEFAULT_DRAFT);

  const saveProject = (project: RoomProject) => {
    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === project.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = project;
        return copy;
      }
      return [project, ...prev];
    });
    showToast('Design saved to vibe board 📌', 'success');
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    showToast('Project deleted', 'info');
  };

  const getProject = (id: string) => projects.find((p) => p.id === id);

  const toggleItemCheck = (id: string) => {
    setSavedItems((prev) => prev.map((item) => (item.id === id ? { ...item, is_checked: !item.is_checked } : item)));
  };

  const updateItemQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      setSavedItems((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setSavedItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)));
  };

  const addItemToShoppingList = (product: ProductItem) => {
    addToCart(product, 1);
    setSavedItems((prev) => {
      const exists = prev.find((item) => item.product_id === product.id);
      if (exists) {
        return prev.map((item) => (item.product_id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [
        {
          id: `saved-${product.id}-${Date.now()}`,
          user_id: user?.id || 'user_demo',
          product_id: product.id,
          custom_title: product.name,
          price_inr: product.estimatedPriceInr,
          quantity: 1,
          is_checked: false,
          category: product.category,
          merchant_name: product.merchant,
          image_url: product.imageUrl,
        },
        ...prev,
      ];
    });
  };

  const removeItemFromShoppingList = (id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed', 'info');
  };

  const totalShoppingCost = savedItems.reduce((acc, item) => acc + item.price_inr * (item.quantity || 1), 0);

  const installPwa = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setCanInstallPwa(false);
    setDeferredPrompt(null);
  };

  const setLanguageHandler = (lang: 'en' | 'hinglish') => {
    setLanguage(lang);
    if (typeof window !== 'undefined') localStorage.setItem('vibin_lang', lang);
    showToast(lang === 'hinglish' ? 'Switched to Hinglish' : 'Language set to English', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isLoggedIn: Boolean(user),
        loginModalOpen,
        loginModalReason,
        openLoginModal,
        closeLoginModal,
        loginWithGoogle,
        loginWithEmail,
        logout,
        credits,
        planType,
        buyCreditsModalOpen,
        openBuyCreditsModal,
        closeBuyCreditsModal,
        deductCredit,
        addCredits,
        draft,
        updateDraft,
        updateDraftRules,
        resetDraft,
        projects,
        saveProject,
        deleteProject,
        getProject,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        savedItems,
        toggleItemCheck,
        updateItemQuantity,
        addItemToShoppingList,
        removeItemFromShoppingList,
        totalShoppingCost,
        activeTransformLayers,
        toggleTransformLayer,
        stylistMessages,
        sendStylistPrompt,
        language,
        setLanguage: setLanguageHandler,
        canInstallPwa,
        installPwa,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}
