import { VibeStyleId } from '@/lib/supabase/types';

export interface VibeItem {
  id: VibeStyleId;
  name: string;
  tagline: string;
  description: string;
  badge?: string;
  colorHex: string;
  accentBg: string;
  sampleImageUrl: string;
  keywords: string[];
}

export const VIBES: VibeItem[] = [
  {
    id: 'modern_indian',
    name: 'Modern Indian',
    tagline: 'Desi soul with modern lines',
    description: 'Brass accents, subtle block-print textiles, warm teak finishes, and lush indoor areca palms.',
    badge: 'Popular in Bengaluru & Pune',
    colorHex: '#C86843',
    accentBg: 'bg-[#F9ECE7]',
    sampleImageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    keywords: ['Brass', 'Block Print', 'Warm Wood', 'Indoor Palms'],
  },
  {
    id: 'cozy',
    name: 'Cozy Warmth',
    tagline: 'Warm light, plush cushions, hygge feels',
    description: 'Golden 2700K fairy lights, soft waffle-knit throws, floor rugs, and the perfect tea-and-study nook.',
    badge: 'Hostel & PG Favourite',
    colorHex: '#D99B26',
    accentBg: 'bg-[#FAF3E3]',
    sampleImageUrl: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
    keywords: ['Fairy Lights', 'Floor Rug', 'Waffle Throw', 'Tea Nook'],
  },
  {
    id: 'minimal',
    name: 'Clean Minimal',
    tagline: 'Zero clutter, maximum breathing room',
    description: 'Sleek concealed storage, clean light tones, wire cable management, and focus-first aesthetics.',
    badge: 'Great for Small Rooms',
    colorHex: '#526E58',
    accentBg: 'bg-[#EBF1EC]',
    sampleImageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    keywords: ['Concealed Storage', 'Neutral Whites', 'Cable Organizers'],
  },
  {
    id: 'boho',
    name: 'Boho Earthy',
    tagline: 'Jute, macramé, and relaxed natural textures',
    description: 'Braided jute rugs, macramé wall hangings, earthy terracotta planters, and woven cane accents.',
    badge: 'Budget Friendly',
    colorHex: '#BC7844',
    accentBg: 'bg-[#F9EFE6]',
    sampleImageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    keywords: ['Jute Rug', 'Terracotta Pots', 'Cane Baskets', 'Macramé'],
  },
  {
    id: 'pinterest_aesthetic',
    name: 'Pinterest Aesthetic',
    tagline: 'Sunset lamps, photo grids & mood lighting',
    description: 'Sunset projector lights, photo card collages, pastel checkered rugs, and cute desk organizers.',
    badge: 'Trending on Reels',
    colorHex: '#CE7C78',
    accentBg: 'bg-[#F9EDED]',
    sampleImageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    keywords: ['Sunset Lamp', 'Photo Collage', 'Pastel Checkered', 'Ambient Light'],
  },
  {
    id: 'scandinavian',
    name: 'Scandinavian',
    tagline: 'Light pine wood & functional Nordic charm',
    description: 'Bright daylight-maximizing light curtains, pale birch wood, geometric art, and functional shelves.',
    colorHex: '#607B8B',
    accentBg: 'bg-[#EDF2F5]',
    sampleImageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    keywords: ['Birch Wood', 'Sheer Curtains', 'Geometric Prints', 'Functional Design'],
  },
  {
    id: 'japandi',
    name: 'Japandi Simplicity',
    tagline: 'Japanese minimalism meets Nordic comfort',
    description: 'Low-profile seating, ribbed wood textures, muted ceramics, and tranquil wabi-sabi simplicity.',
    colorHex: '#7B6F63',
    accentBg: 'bg-[#F2EFEA]',
    sampleImageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    keywords: ['Low Seating', 'Ribbed Wood', 'Ceramic Vases', 'Quiet Luxury'],
  },
  {
    id: 'traditional_indian',
    name: 'Heritage Indian',
    tagline: 'Handloom fabrics, brass diyas & royal arches',
    description: 'Kalamkari or Ikat cushions, carved wooden mirrors, antique brass floor lamps, and marigold tones.',
    colorHex: '#A63D2B',
    accentBg: 'bg-[#FBECE9]',
    sampleImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    keywords: ['Kalamkari', 'Carved Mirror', 'Brass Lamp', 'Ethnic Warmth'],
  },
  {
    id: 'warm_earthy',
    name: 'Warm Earthy',
    tagline: 'Clay, ochre, mustard, and grounding linens',
    description: 'Sun-baked terracotta walls (or removable peel-stick panels), washed cotton bedding, and olive leaves.',
    colorHex: '#9E6138',
    accentBg: 'bg-[#F7EFE8]',
    sampleImageUrl: 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=800&q=80',
    keywords: ['Ochre Cotton', 'Clay Decor', 'Olive Foliage', 'Raw Linen'],
  },
  {
    id: 'luxury_hotel',
    name: 'Boutique Hotel',
    tagline: 'Crisp 400TC white sheets, symmetry & brass',
    description: 'Triple-sheeted hotel-style bed, symmetrical reading sconces, plush velvet runner, and subtle diffusers.',
    badge: 'Aspirational',
    colorHex: '#3E4E59',
    accentBg: 'bg-[#EEF1F3]',
    sampleImageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    keywords: ['White 400TC Sheets', 'Bed Runner', 'Bedside Sconces', 'Diffuser'],
  },
];
