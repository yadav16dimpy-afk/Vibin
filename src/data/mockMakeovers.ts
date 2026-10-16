export interface BeforeAfterExample {
  id: string;
  title: string;
  location: string;
  roomType: string;
  vibe: string;
  vibeId: string;
  budgetInr: number;
  budgetString: string;
  beforeImage: string;
  afterImage: string;
  highlights: string[];
  tagline: string;
  renterFriendlyHighlights: string[];
  shoppingItemsCount: number;
  styleScore: number;
  budgetScore: number;
  renterScore: number;
}

export const MOCK_MAKEOVERS: BeforeAfterExample[] = [
  {
    id: 'pg-room-bengaluru',
    title: 'Koramangala PG Room',
    location: 'Bengaluru, Karnataka',
    roomType: 'Hostel / PG Room',
    vibe: 'Cozy Warmth',
    vibeId: 'cozy',
    budgetInr: 4290,
    budgetString: '₹4,290',
    beforeImage: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80', // Hostel room / plain bedroom
    afterImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80', // Cozy styled bedroom with warm lighting
    tagline: 'From sterile hostel room to warm evening sanctuary',
    highlights: [
      '2700K warm string lights replace harsh white tube light',
      'Terracotta washed cotton bedsheet set',
      'No-drill magnetic bedside shelf & cable clip',
      'Textured floor rug hides standard tile scratches',
    ],
    renterFriendlyHighlights: [
      'Zero drilling needed (Command hooks only)',
      '100% portable for moving to next PG',
      'Total makeover time: 45 minutes',
    ],
    shoppingItemsCount: 5,
    styleScore: 98,
    budgetScore: 96,
    renterScore: 100,
  },
  {
    id: 'living-room-pune',
    title: 'Kothrud 1BHK Rented Living Room',
    location: 'Pune, Maharashtra',
    roomType: 'Living Room',
    vibe: 'Modern Indian',
    vibeId: 'modern_indian',
    budgetInr: 8650,
    budgetString: '₹8,650',
    beforeImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80', // Empty / basic living room
    afterImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80', // Modern Indian aesthetic with brass & warmth
    tagline: 'Modern Indian elegance without changing rented tiles or walls',
    highlights: [
      'Brass accent floor lamp for warm layered illumination',
      'Jaipuri hand-block printed cushion covers (set of 5)',
      'Natural handwoven jute area rug (4x6 ft)',
      'Ceramic planter with hardy snake plant',
    ],
    renterFriendlyHighlights: [
      'Preserved original landlord sofa frame',
      'Freestanding lighting and removable textiles only',
      'No wall paint or electrical modifications',
    ],
    shoppingItemsCount: 7,
    styleScore: 96,
    budgetScore: 94,
    renterScore: 97,
  },
  {
    id: 'study-bedroom-delhi',
    title: 'North Campus Student Study Setup',
    location: 'Delhi NCR',
    roomType: 'Study Bedroom',
    vibe: 'Pinterest Aesthetic',
    vibeId: 'pinterest_aesthetic',
    budgetInr: 4920,
    budgetString: '₹4,920',
    beforeImage: 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1200&q=80', // Cluttered basic desk room
    afterImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80', // Aesthetic study desk setup with ambient light
    tagline: 'Focus-boosting study nook under ₹5,000',
    highlights: [
      'Sunset glow ambient lamp for late night studying',
      'Black wire grid moodboard with wooden photo pegs',
      'Felt desk mat with hidden cable canal',
      'Sage green linen organizers for textbooks and stationery',
    ],
    renterFriendlyHighlights: [
      'Non-damaging adhesive strips for grid board',
      'Portable desk clamped task light',
      'Takes 30 minutes to pack into two college bags',
    ],
    shoppingItemsCount: 6,
    styleScore: 99,
    budgetScore: 98,
    renterScore: 99,
  },
];
