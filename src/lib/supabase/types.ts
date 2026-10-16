export type RoomType =
  | 'bedroom'
  | 'living_room'
  | 'hostel_room'
  | 'pg_room'
  | 'study_area'
  | 'balcony'
  | 'kitchen';

export type RoomSize = 'small' | 'medium' | 'large';

export type FurnishingStatus = 'empty' | 'partly_furnished' | 'fully_furnished';

export type BudgetTier =
  | 'under_5000'
  | '5000_10000'
  | '10000_25000'
  | '25000_50000'
  | '50000_plus';

export type VibeStyleId =
  | 'modern_indian'
  | 'minimal'
  | 'cozy'
  | 'boho'
  | 'scandinavian'
  | 'japandi'
  | 'traditional_indian'
  | 'warm_earthy'
  | 'pinterest_aesthetic'
  | 'luxury_hotel';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  phone_number?: string | null;
  preferred_language: 'en' | 'hinglish' | string;
  created_at: string;
  updated_at: string;
}

export interface UserCredits {
  id: string;
  user_id: string;
  credits_remaining: number;
  plan_type: 'free' | 'starter' | 'pass' | 'pro';
  pro_expires_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface RoomProject {
  id: string;
  user_id: string;
  title: string;
  room_type: RoomType;
  room_size: RoomSize;
  furnishing_status: FurnishingStatus;
  vibe_style: VibeStyleId;
  budget_range: BudgetTier;
  custom_budget_inr?: number | null;
  custom_notes?: string | null;
  renter_friendly: boolean;
  keep_existing_furniture: boolean;
  no_drilling: boolean;
  small_space_optimized: boolean;
  pet_friendly: boolean;
  status: 'draft' | 'generating' | 'generated' | 'saved' | 'archived';
  original_image_url: string;
  generated_image_url: string;
  style_match_score: number;
  budget_match_score: number;
  renter_friendly_score: number;
  created_at: string;
  updated_at: string;
  recommendations?: ProductRecommendation[];
}

export interface ProductRecommendation {
  id: string;
  project_id: string;
  category: string;
  title: string;
  image_url: string;
  estimated_price_inr: number;
  merchant_name: 'Amazon India' | 'IKEA India' | 'Pepperfry' | 'Myntra Home' | 'Meesho' | 'Flipkart' | string;
  merchant_url?: string;
  affiliate_tag?: string;
  is_essential: boolean;
  is_budget_dupe: boolean;
  original_item_comparison?: string;
  quantity?: number;
}

export interface SavedItem {
  id: string;
  user_id: string;
  project_id?: string;
  product_id?: string;
  custom_title: string;
  price_inr: number;
  quantity: number;
  is_checked: boolean;
  category: string;
  merchant_name: string;
  image_url: string;
}

export interface PaymentRecord {
  id: string;
  user_id: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  amount_inr: number;
  plan_tier: 'starter_49' | 'pass_99' | 'pro_299';
  credits_added: number;
  status: 'created' | 'captured' | 'failed' | 'refunded';
  created_at: string;
}

export interface ShareExport {
  id: string;
  project_id: string;
  share_slug: string;
  share_type: 'whatsapp' | 'instagram_story' | 'public_link';
  views_count: number;
}
