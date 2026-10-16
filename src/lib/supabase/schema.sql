-- ==============================================================================
-- VIBIN: SUPABASE DATABASE SCHEMA & ROW LEVEL SECURITY (RLS) POLICIES
-- App: Vibin — India-first AI Room Makeover Progressive Web App
-- Tagline: "Your room. Your vibe. Your budget."
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
CREATE TYPE room_type_enum AS ENUM (
  'bedroom',
  'living_room',
  'hostel_room',
  'pg_room',
  'study_area',
  'balcony',
  'kitchen'
);

CREATE TYPE room_size_enum AS ENUM ('small', 'medium', 'large');
CREATE TYPE furnishing_status_enum AS ENUM ('empty', 'partly_furnished', 'fully_furnished');
CREATE TYPE project_status_enum AS ENUM ('draft', 'generating', 'generated', 'saved', 'archived');
CREATE TYPE job_status_enum AS ENUM ('pending', 'processing', 'completed', 'failed');
CREATE TYPE payment_status_enum AS ENUM ('created', 'captured', 'failed', 'refunded');

-- 3. PROFILES TABLE
-- Extends Supabase auth.users with app-specific profile settings
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone_number TEXT,
  preferred_language TEXT DEFAULT 'en', -- 'en', 'hinglish', etc.
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 4. USER CREDITS TABLE
-- Manages generation credits (e.g. 2 free makeovers on signup, top-ups)
CREATE TABLE IF NOT EXISTS public.user_credits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  credits_remaining INTEGER NOT NULL DEFAULT 2,
  plan_type TEXT NOT NULL DEFAULT 'free', -- 'free', 'starter', 'pass', 'pro'
  pro_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT unique_user_credits UNIQUE (user_id)
);

ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own credits"
  ON public.user_credits FOR SELECT
  USING (auth.uid() = user_id);

-- Note: user_credits updates should only be performed by trusted backend service role (e.g. webhook/server function)
CREATE POLICY "Users cannot directly manipulate credits"
  ON public.user_credits FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (false);

-- 5. ROOM PROJECTS TABLE
-- Stores individual makeover projects created by the user
CREATE TABLE IF NOT EXISTS public.room_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'My Room Makeover',
  room_type room_type_enum NOT NULL DEFAULT 'bedroom',
  room_size room_size_enum NOT NULL DEFAULT 'medium',
  furnishing_status furnishing_status_enum NOT NULL DEFAULT 'partly_furnished',
  vibe_style TEXT NOT NULL, -- 'modern_indian', 'boho', 'minimal', 'cozy', etc.
  budget_range TEXT NOT NULL, -- 'under_5000', '5000_10000', '10000_25000', etc.
  custom_budget_inr INTEGER,
  custom_notes TEXT,
  -- Rules & toggles
  renter_friendly BOOLEAN DEFAULT true NOT NULL,
  keep_existing_furniture BOOLEAN DEFAULT true NOT NULL,
  no_drilling BOOLEAN DEFAULT true NOT NULL,
  small_space_optimized BOOLEAN DEFAULT true NOT NULL,
  pet_friendly BOOLEAN DEFAULT false NOT NULL,
  status project_status_enum DEFAULT 'draft' NOT NULL,
  -- Scores calculated by AI
  style_match_score INTEGER DEFAULT 95,
  budget_match_score INTEGER DEFAULT 92,
  renter_friendly_score INTEGER DEFAULT 98,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.room_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own room projects"
  ON public.room_projects FOR ALL
  USING (auth.uid() = user_id);

-- 6. ROOM IMAGES TABLE
-- Stores original and generated images. Images are kept in private Supabase Storage bucket 'room-images'
CREATE TABLE IF NOT EXISTS public.room_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.room_projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  image_type TEXT NOT NULL, -- 'original', 'generated_preview', 'generated_hd'
  storage_path TEXT NOT NULL, -- Private storage path e.g. 'private/{user_id}/{project_id}/original.jpg'
  width INTEGER,
  height INTEGER,
  mime_type TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.room_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own room images"
  ON public.room_images FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own room images"
  ON public.room_images FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own room images"
  ON public.room_images FOR DELETE
  USING (auth.uid() = user_id);

-- 7. GENERATION JOBS TABLE
-- Tracks asynchronous server-side AI generation jobs (e.g., Stable Diffusion/ControlNet or Gemini Vision)
CREATE TABLE IF NOT EXISTS public.generation_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.room_projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status job_status_enum DEFAULT 'pending' NOT NULL,
  prompt_parameters JSONB NOT NULL DEFAULT '{}'::jsonb,
  error_message TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.generation_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own generation jobs"
  ON public.generation_jobs FOR SELECT
  USING (auth.uid() = user_id);

-- 8. PRODUCT RECOMMENDATIONS TABLE
-- Curated India-focused product suggestions matching the room makeover
CREATE TABLE IF NOT EXISTS public.product_recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.room_projects(id) ON DELETE CASCADE,
  category TEXT NOT NULL, -- 'Lighting', 'Textiles', 'Decor', 'Storage', 'Furniture'
  title TEXT NOT NULL,
  image_url TEXT,
  estimated_price_inr INTEGER NOT NULL,
  merchant_name TEXT NOT NULL, -- 'Amazon India', 'IKEA India', 'Pepperfry', 'Myntra Home', 'Meesho'
  merchant_url TEXT,
  affiliate_tag TEXT,
  is_essential BOOLEAN DEFAULT true NOT NULL,
  is_budget_dupe BOOLEAN DEFAULT false NOT NULL,
  original_item_comparison TEXT, -- e.g. "Saves ₹1,200 compared to solid teak"
  sort_order INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.product_recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view recommendations for their projects"
  ON public.product_recommendations FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.room_projects p
    WHERE p.id = product_recommendations.project_id AND p.user_id = auth.uid()
  ));

-- 9. SAVED ITEMS TABLE
-- User's personalized shopping checklist items with quantities and checked status
CREATE TABLE IF NOT EXISTS public.saved_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.room_projects(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.product_recommendations(id) ON DELETE SET NULL,
  custom_title TEXT,
  price_inr INTEGER NOT NULL,
  quantity INTEGER DEFAULT 1 NOT NULL,
  is_checked BOOLEAN DEFAULT false NOT NULL,
  category TEXT DEFAULT 'General',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.saved_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own saved checklist items"
  ON public.saved_items FOR ALL
  USING (auth.uid() = user_id);

-- 10. PAYMENTS TABLE
-- Secure record for credit purchases and pro passes (designed for Razorpay)
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  amount_inr INTEGER NOT NULL,
  plan_tier TEXT NOT NULL, -- 'starter_49', 'pass_99', 'pro_299'
  credits_added INTEGER NOT NULL DEFAULT 0,
  status payment_status_enum DEFAULT 'created' NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own payment receipts"
  ON public.payments FOR SELECT
  USING (auth.uid() = user_id);

-- 11. SHARE EXPORTS TABLE
-- Handles generated share cards (WhatsApp link, Instagram story format)
CREATE TABLE IF NOT EXISTS public.share_exports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.room_projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  share_slug TEXT UNIQUE NOT NULL,
  share_type TEXT NOT NULL, -- 'whatsapp', 'instagram_story', 'public_link'
  views_count INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.share_exports ENABLE ROW LEVEL SECURITY;

-- Allow public viewing of shared makeover previews by share_slug
CREATE POLICY "Public can view shared makeover preview"
  ON public.share_exports FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own share records"
  ON public.share_exports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 12. STORAGE BUCKET CONFIGURATION FOR PRIVATE ROOM IMAGES
-- Run via Supabase Dashboard or Migration scripts:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('room-images', 'room-images', false);
--
-- Storage RLS policy:
-- CREATE POLICY "Users access own private room images"
--   ON storage.objects FOR ALL
--   USING (bucket_id = 'room-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- 13. AUTOMATIC PROFILE & CREDITS CREATION ON AUTH SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');

  INSERT INTO public.user_credits (user_id, credits_remaining, plan_type)
  VALUES (new.id, 2, 'free');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
