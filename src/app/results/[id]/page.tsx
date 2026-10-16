'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Sparkles,
  Share2,
  Bookmark,
  RefreshCw,
  Download,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Info,
  Check,
  IndianRupee,
  Instagram,
  MessageCircle,
  Sliders,
  Layers,
  Wand2,
  Layout,
  Compass,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import BeforeAfterSlider from '@/components/common/BeforeAfterSlider';
import AiRoomStylistAgent from '@/components/ai/AiRoomStylistAgent';
import Planner5dRoomViewer from '@/components/planner5d/Planner5dRoomViewer';
import NexCartProductShowcase from '@/components/planner5d/NexCartProductShowcase';
import WhatsAppShareModal from '@/components/modals/WhatsAppShareModal';
import { MOCK_PRODUCTS } from '@/data/mockProducts';
import { VIBES } from '@/data/vibes';
import HeronButton from '@/components/common/HeronButton';

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = (params?.id as string) || '';

  const {
    getProject,
    saveProject,
    isLoggedIn,
    openLoginModal,
    showToast,
    addToCart,
    setIsCartOpen,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'planner5d' | 'agent' | 'comparison'>('planner5d');
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Retrieve project from AppContext or fallback to mock
  const project = getProject(projectId) || {
    id: projectId || 'demo-makeover',
    title: 'Modern Indian Hostel Room Makeover',
    room_type: 'hostel_room',
    vibe_style: 'cozy',
    budget_range: 'under_5000',
    custom_budget_inr: 4290,
    renter_friendly: true,
    keep_existing_furniture: true,
    no_drilling: true,
    small_space_optimized: true,
    style_match_score: 98,
    budget_match_score: 96,
    renter_friendly_score: 100,
    original_image_url:
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
    generated_image_url:
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
  };

  const vibeMeta = VIBES.find((v) => v.id === project.vibe_style) || VIBES[0];

  const handleSaveDesign = () => {
    if (!isLoggedIn) {
      openLoginModal('Create a free account to permanently save your makeover');
      return;
    }
    setSavedSuccess(true);
    showToast('Design saved to your profile boards! 📌', 'success');
  };

  const handleDownload = () => {
    showToast('High resolution design preview downloaded! 📥', 'success');
    const link = document.createElement('a');
    link.href = project.generated_image_url;
    link.download = `Vibin-Makeover-${project.vibe_style}.jpg`;
    link.target = '_blank';
    link.click();
  };

  const previewProducts = MOCK_PRODUCTS.slice(0, 4);
  const totalShoppingEst = 3996;

  const handleAddAllToUniversalCart = () => {
    previewProducts.forEach((prod) => {
      addToCart(prod);
    });
    setIsCartOpen(true);
    showToast('All makeover items added to your Universal Cart! 🛒', 'success');
  };

  return (
    // Luminous Pure White Canvas with Radiant Coral & Sunny Gold Accents
    <div className="min-h-screen bg-white text-[#1E2229] antialiased selection:bg-[#FF5738] selection:text-white pb-28 md:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Top Breadcrumb & Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#FFE8DE]">
          <div className="flex items-start gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/vibin-mark.png"
              alt="Vibin Emblem"
              className="h-14 w-14 object-contain border border-[#FFE8DE] bg-[#FFF9F5] p-1.5 shadow-sm rounded-xl shrink-0 mt-1"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FF5738] bg-[#FFF2EC] px-2.5 py-0.5 rounded-full border border-[#FFD8C9]">
                  {vibeMeta.name} Vibe
                </span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#10B981] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  ✓ 100% Renter Friendly
                </span>
                <span className="font-mono text-[10px] text-stone-400">
                  PLANNER 5D // VIB-CAD-98
                </span>
              </div>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#1E2229] sm:text-3xl">
                {project.title || 'Your Room Transformation'}
              </h1>
              <p className="mt-1 text-xs text-[#4A5568] font-mono">
                AI Spatial Concept • Preserves your actual uploaded room without drilling
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push('/create')}
              className="flex items-center gap-1.5 border border-[#FFE8DE] bg-white px-4 py-2 font-mono text-xs font-semibold text-[#1E2229] hover:bg-[#FFF9F5] transition rounded-lg"
            >
              <RefreshCw className="h-3.5 w-3.5 text-[#FF5738]" />
              <span>Try Another Vibe</span>
            </button>

            <HeronButton
              onClick={handleSaveDesign}
              variant={savedSuccess ? 'outline' : 'brand'}
              className="!py-2 !px-4 !text-[11px]"
            >
              {savedSuccess ? 'Design Saved' : 'Save Design'}
            </HeronButton>
          </div>
        </div>

        {/* View Mode Tabs (Planner 5D vs Spatial AI Agent vs Before/After) */}
        <div className="mt-6 flex flex-wrap items-center justify-between border-b border-[#FFE8DE] pb-3 gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('planner5d')}
              className={`flex items-center gap-1.5 px-4 py-1.5 font-mono text-xs font-bold uppercase transition rounded-full border ${
                activeTab === 'planner5d'
                  ? 'bg-[#FF5738] text-white border-[#FF5738] shadow-md shadow-[#FF5738]/20'
                  : 'border-[#FFE8DE] bg-white text-[#1E2229] hover:bg-[#FFF9F5]'
              }`}
            >
              <Layout className="h-3.5 w-3.5" />
              <span>Planner 5D Room Tool (2D/3D)</span>
            </button>

            <button
              onClick={() => setActiveTab('agent')}
              className={`flex items-center gap-1.5 px-4 py-1.5 font-mono text-xs font-bold uppercase transition rounded-full border ${
                activeTab === 'agent'
                  ? 'bg-[#FF5738] text-white border-[#FF5738] shadow-md shadow-[#FF5738]/20'
                  : 'border-[#FFE8DE] bg-white text-[#1E2229] hover:bg-[#FFF9F5]'
              }`}
            >
              <Wand2 className="h-3.5 w-3.5" />
              <span>Spatial AI Stylist (Photo Layers)</span>
            </button>

            <button
              onClick={() => setActiveTab('comparison')}
              className={`flex items-center gap-1.5 px-4 py-1.5 font-mono text-xs font-bold uppercase transition rounded-full border ${
                activeTab === 'comparison'
                  ? 'bg-[#FF5738] text-white border-[#FF5738] shadow-md shadow-[#FF5738]/20'
                  : 'border-[#FFE8DE] bg-white text-[#1E2229] hover:bg-[#FFF9F5]'
              }`}
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Before & After Slider</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setWhatsappModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#10B981] text-white px-3.5 py-1.5 font-mono text-xs font-bold hover:bg-[#059669] transition shadow-md shadow-[#10B981]/20 rounded-full"
            >
              <MessageCircle className="h-3.5 w-3.5 text-white" />
              <span>WhatsApp Spec</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 border border-[#FFE8DE] bg-white px-3.5 py-1.5 font-mono text-xs text-[#1E2229] hover:bg-[#FFF9F5] rounded-full transition"
              title="Download High-Res Render"
            >
              <Download className="h-3.5 w-3.5 text-[#FF5738]" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* PRIMARY VIEW 1: PLANNER 5D ROOM PLANNER TOOL */}
        {activeTab === 'planner5d' && (
          <div className="mt-6">
            <Planner5dRoomViewer
              originalPhotoUrl={project.original_image_url}
              generatedPhotoUrl={project.generated_image_url}
              roomTitle={project.title}
              vibeName={vibeMeta.name}
            />
          </div>
        )}

        {/* PRIMARY VIEW 2: SPATIAL AI STYLIST AGENT */}
        {activeTab === 'agent' && (
          <div className="mt-6">
            <AiRoomStylistAgent
              actualPhotoUrl={project.original_image_url}
              roomTitle={project.title}
              styleName={vibeMeta.name}
            />
          </div>
        )}

        {/* PRIMARY VIEW 3: BEFORE & AFTER SLIDER */}
        {activeTab === 'comparison' && (
          <div className="mt-6 border border-[#FFE8DE] bg-white p-4 shadow-xl rounded-2xl">
            <BeforeAfterSlider
              beforeImage={project.original_image_url}
              afterImage={project.generated_image_url}
              beforeLabel="Original Room"
              afterLabel={`Vibin Spatial (${vibeMeta.name})`}
            />

            <div className="mt-4 pt-4 border-t border-[#FFE8DE] flex items-center justify-between">
              <span className="font-mono text-xs text-[#10B981] font-semibold">
                ✓ 100% Zero-Drilling Protocol Verified
              </span>
              <HeronButton
                onClick={handleAddAllToUniversalCart}
                variant="brand"
                className="!py-2 !px-4"
              >
                Add All to Universal Cart
              </HeronButton>
            </div>
          </div>
        )}

        {/* FEASIBILITY AUDIT SCORES */}
        <div className="mt-8 border border-[#FFE8DE] bg-white p-6 shadow-xl rounded-2xl">
          <div className="flex items-center justify-between border-b border-[#FFE8DE] pb-4">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FF5738]">
                PLANNER 5D // FEASIBILITY AUDIT
              </span>
              <h2 className="text-xl font-bold text-[#1E2229]">Vibin Room Audit Score</h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-[#10B981] bg-emerald-50 text-[#10B981] font-mono font-bold text-base shadow-sm">
              98%
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#FFF9F5] p-5 border border-[#FFE8DE] rounded-xl hover:border-[#FF5738] transition">
              <div className="flex items-center justify-between text-xs font-semibold text-[#1E2229] font-mono">
                <span>STYLE MATCH</span>
                <span className="font-bold text-[#FF5738]">{project.style_match_score || 98}%</span>
              </div>
              <div className="mt-2.5 h-2 w-full bg-[#FFE8DE] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FF5738] rounded-full"
                  style={{ width: `${project.style_match_score || 98}%` }}
                />
              </div>
              <p className="mt-2 text-[11px] text-[#4A5568] leading-relaxed font-sans">
                Accurately layers the {vibeMeta.name} mood palette and lighting warmth
              </p>
            </div>

            <div className="bg-[#FFF9F5] p-5 border border-[#FFE8DE] rounded-xl hover:border-[#FFB703] transition">
              <div className="flex items-center justify-between text-xs font-semibold text-[#1E2229] font-mono">
                <span>BUDGET COMPLIANCE</span>
                <span className="font-bold text-[#FFB703]">{project.budget_match_score || 96}%</span>
              </div>
              <div className="mt-2.5 h-2 w-full bg-[#FFE8DE] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FFB703] rounded-full"
                  style={{ width: `${project.budget_match_score || 96}%` }}
                />
              </div>
              <p className="mt-2 text-[11px] text-[#4A5568] leading-relaxed font-sans">
                Decor checklist costs comfortably under your budget target
              </p>
            </div>

            <div className="bg-[#FFF9F5] p-5 border border-[#FFE8DE] rounded-xl hover:border-[#10B981] transition">
              <div className="flex items-center justify-between text-xs font-semibold text-[#1E2229] font-mono">
                <span>RENTER FRIENDLY</span>
                <span className="font-bold text-[#10B981]">{project.renter_friendly_score || 100}%</span>
              </div>
              <div className="mt-2.5 h-2 w-full bg-[#FFE8DE] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#10B981] rounded-full"
                  style={{ width: `${project.renter_friendly_score || 100}%` }}
                />
              </div>
              <p className="mt-2 text-[11px] text-[#4A5568] leading-relaxed font-sans">
                Zero drilling, adhesive command strips, and 100% portable decor
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. NEXCART PRODUCT SHOWCASE */}
      <div className="mt-12">
        <NexCartProductShowcase />
      </div>

      {/* WhatsApp Share Modal */}
      <WhatsAppShareModal
        isOpen={whatsappModalOpen}
        onClose={() => setWhatsappModalOpen(false)}
        styleName={vibeMeta.name}
        budgetString={`₹${totalShoppingEst.toLocaleString('en-IN')}`}
        totalInr={totalShoppingEst}
        items={previewProducts.map((p) => ({ title: p.name, priceInr: p.estimatedPriceInr }))}
        imageUrl={project.generated_image_url}
      />
    </div>
  );
}
