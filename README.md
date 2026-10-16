# Vibin ✨ — Your room. Your vibe. Your budget.

> **“See your room’s next vibe before spending money.”**

Vibin is an India-first AI room makeover Progressive Web App (PWA) crafted specifically for:
- College & university students
- Hostel & PG residents (Bengaluru, Pune, Delhi NCR, Hyderabad, Mumbai, etc.)
- Renters & flatmates
- Young professionals & first-time apartment owners

---

## 🎨 Design System & Brand Identity

- **Background:** Warm cream / off-white (`#FAF7F2`, `#FDFAF6`)
- **Primary Accent:** Terracotta orange (`#E05A36`, `#CC4927`)
- **Secondary Accents:**
  - Sage green (`#5F7D64` — 100% Renter & Landlord safe)
  - Muted mustard (`#D99B26` — Warm cozy lighting & highlights)
  - Dusty pink (`#CE7C78` — Soft aesthetics & accents)
- **Text:** Deep charcoal (`#111827`, `#1E293B`)
- **Currency:** Indian Rupee (`₹` INR) formatted realistically across all examples.

---

## 📱 Mobile-First Progressive Web App (PWA)

Vibin is designed mobile-first with native app-like UX:
1. **Fixed Mobile Bottom Navigation:**
   - 🏠 **Home** (`/`)
   - ✨ **Create** (`/create` — Floating elevated terracotta CTA)
   - 📌 **Saved** (`/saved` — User vibe board)
   - 🛍️ **Shop** (`/shop` — Ready-to-style decor bundles)
   - 👤 **Profile** (`/profile` — Credits, pricing & privacy controls)
2. **PWA Install Banner & Web App Manifest:**
   - Installable with standalone display mode
   - Custom terracotta arch squircle icons (`192x192`, `512x512`, `maskable`, and SVG)
   - Camera upload support (`capture="environment"`) for instant photo snapping in hostels and flats.

---

## 🌟 Included Screens & User Flows

1. **Landing Page (`/`):**
   - Hero title: *“Make your room feel like you.”*
   - Interactive before-and-after swipe comparison slider with 3 realistic Indian room examples (Koramangala PG room, Pune 1BHK, Delhi study bedroom).
   - Core value sections: *“Made for Indian homes, rentals and hostels”*, *“Makeovers under ₹5,000”*, *“No renovation needed”*, *“Share your vibe on WhatsApp”*.
   - Trust badges: *“Your room photos stay private”*, *“AI-generated design concepts”*, *“Budget-friendly suggestions”*.

2. **Onboarding Quiz (`/onboarding`):**
   - 4-step interactive preference quiz:
     - Step 1: *What are you redesigning?* (Hostel Room, PG Room, Bedroom, Study Area, Living Room, Balcony, Kitchen)
     - Step 2: *What matters most?* (Low budget, Rental friendly, More storage, Cozy vibe, Better study setup, Better for guests)
     - Step 3: *Choose your budget* (Under ₹5,000, ₹5,000–₹10,000, ₹10,000–₹25,000, ₹25,000–₹50,000, ₹50,000+)
     - Step 4: *Choose your language* (English & Hinglish active; Hindi, Tamil, Telugu, Marathi, Bengali, Kannada, Malayalam marked "Coming soon")

3. **Room Makeover Creator (`/create`):**
   - Step 1: **Upload Room Photo** (Camera upload, Gallery picker, desktop drag & drop, JPG/PNG/HEIC preview, privacy consent note, quick-fill sample Indian rooms).
   - Step 2: **Select Room Details** (Room type, Room size [Small/Medium/Large], Current condition [Empty/Partly furnished/Fully furnished], custom notes).
   - Step 3: **Choose Your Vibe** (10 visual style cards: Modern Indian, Clean Minimal, Cozy Warmth, Boho Earthy, Scandinavian, Japandi Simplicity, Heritage Indian, Warm Earthy, Pinterest Aesthetic, Boutique Hotel).
   - Step 4: **Choose Budget** (Preset tiers + optional custom INR amount).
   - Step 5: **Room Rules** (Toggles for *Renter / Hostel Friendly*, *Keep Existing Furniture*, *No Drilling*, *Small Space Optimized*, *Pet Friendly [Coming soon]*).

4. **AI Generation Loading Screen (`/generating`):**
   - 5 dynamic rotating messages:
     - *“Understanding your room layout...”*
     - *“Finding your best vibe...”*
     - *“Designing within your budget...”*
     - *“Adding renter-friendly details...”*
     - *“Creating your makeover...”*
   - Radar pulse scanner animation and progress indicator.
   - Cancel button and mandatory AI design concept disclaimer.

5. **Makeover Result Screen (`/results/[id]`):**
   - Full-width interactive touch/mouse before-and-after slider.
   - Action buttons: *Save Design*, *Try Another Vibe*, *Download*, *Share on WhatsApp*, *Share as Instagram Story*.
   - **Your Vibin Score Card** (Style match, Budget match, Renter friendly).
   - Mandatory AI concept disclosure.

6. **Shopping Checklist Screen (`/checklist`):**
   - Header: *“Bring this vibe home”* with estimated total (e.g. ₹8,450) and progress bar.
   - Tabs: *Essentials*, *Nice to Have*, *Budget Dupes*.
   - Realistic Indian products: Bedsheet set, Cushion covers, Curtains, Jute rug, Table lamp, 2700K fairy string lights, Full-length mirror, 3-tier trolley, Indoor snake plant, Wall art, Study desk organizer, Folding side table.
   - Quantity stepper (`+` / `-`), *View Similar Products* modal, *Budget Alternative* tags, and affiliate disclosure.

7. **WhatsApp Share Flow (`WhatsAppShareModal`):**
   - Generates formatted preview message:
     ```text
     Here’s my room makeover by Vibin ✨
     Style: [selected style]
     Budget: [selected budget]
     Estimated shopping total: ₹[amount]

     My shopping checklist:
     - [item] — ₹[price]
     - [item] — ₹[price]
     - [item] — ₹[price]

     Made with Vibin.
     ```
   - Direct WhatsApp deep-link button (`https://api.whatsapp.com/send?text=...`) + Copy to clipboard + Native share sheet.

8. **Saved Designs Dashboard (`/saved`):**
   - Grid of saved projects with dual original & makeover preview thumbnails.
   - Vibe filter, search, date created, budget badge, and empty state (*“Your future favourite room starts here.”*).

9. **Shop Inspiration Screen (`/shop`):**
   - Bundles: *Under ₹5,000*, *Hostel Room Essentials*, *Rental-Friendly Decor*, *Cozy Bedroom*, *Work From Home Setup*, *Small Room Storage*, *Diwali Decor (Coming soon)*, *New Apartment Setup (Coming soon)*.

10. **Profile & Wallet Screen (`/profile`):**
    - Makeover credit wallet (*“2 Free Makeovers Remaining”*).
    - Pricing preview cards:
      - Starter: ₹49 for 5 makeovers
      - Makeover Pass: ₹99 for 15 makeovers
      - Vibin Pro: ₹299/month
    - Interactive Razorpay modal placeholder with simulated payment success and failure test flows.
    - Privacy & data controls: Manage uploaded photos, purge cache, and one-click account & room data wipe.

---

## 🗄️ Supabase Data Structure & Row Level Security

The complete database schema with Row Level Security (RLS) is located at:
[`src/lib/supabase/schema.sql`](file:///Users/dimpy/.gemini/antigravity/scratch/vibin/src/lib/supabase/schema.sql)

### Tables Defined:
1. `profiles` — User profile extensions (preferred language, full name, avatar).
2. `user_credits` — Makeover credits and plan tier.
3. `room_projects` — Room makeover projects, dimensions, rules, and AI scores.
4. `room_images` — Original & generated images linked to private Supabase storage bucket `room-images`.
5. `generation_jobs` — Asynchronous server-side AI job queue.
6. `product_recommendations` — Curated product suggestions matching room aesthetics.
7. `saved_items` — User checklist items with quantities and checked status.
8. `payments` — Razorpay payment records and audit receipts.
9. `share_exports` — WhatsApp and public link share records.

### Row Level Security (RLS)
- Every table enforces strict RLS where `auth.uid() = user_id`.
- Users cannot directly update `user_credits` from frontend code.
- Room photos are stored in a private storage bucket (`room-images`) with signed time-limited URLs.

---

## 🔒 Future Backend Integrations Architecture

Secret keys (Gemini API key, Razorpay secret, Affiliate keys) are **never** exposed to client browsers. Secure API endpoints are already architected:

1. **AI Generation:**
   [`src/app/api/generate-makeover/route.ts`](file:///Users/dimpy/.gemini/antigravity/scratch/vibin/src/app/api/generate-makeover/route.ts)
   - Ready for Google GenAI SDK (Gemini 2.0 / Imagen 3 / ControlNet).
   - Applies Indian renter-friendly constraint prompting on the server.

2. **Razorpay Payments:**
   [`src/app/api/checkout/route.ts`](file:///Users/dimpy/.gemini/antigravity/scratch/vibin/src/app/api/checkout/route.ts)
   - Ready for server-side order generation and webhook payment signature verification.

3. **Merchant Affiliate Tracking:**
   [`src/app/api/affiliate/route.ts`](file:///Users/dimpy/.gemini/antigravity/scratch/vibin/src/app/api/affiliate/route.ts)
   - Server-side outbound link redirector with affiliate tag injection.

---

## 🚀 Running the Project Locally

```bash
# 1. Navigate to the project directory:
cd /Users/dimpy/.gemini/antigravity/scratch/vibin

# 2. Run development server:
npm run dev

# 3. Open in browser:
http://localhost:3000
```
