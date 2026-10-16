export interface ProductItem {
  id: string;
  category: string;
  name: string;
  imageUrl: string;
  estimatedPriceInr: number;
  merchant: 'Amazon India' | 'IKEA India' | 'Pepperfry' | 'Myntra Home' | 'Meesho' | 'Flipkart';
  merchantUrl: string;
  tier: 'essentials' | 'nice_to_have' | 'budget_dupes';
  isBudgetDupe: boolean;
  dupeOfId?: string;
  dupeSavingsInr?: number;
  description: string;
  styleTag: string;
}

export const MOCK_PRODUCTS: ProductItem[] = [
  // 1. Bedsheet set
  {
    id: 'prod-bedsheet-1',
    category: 'Bedding',
    name: 'Washed Cotton Earthy Terracotta Bedsheet + 2 Pillow Covers',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
    estimatedPriceInr: 1299,
    merchant: 'Myntra Home',
    merchantUrl: 'https://www.myntra.com',
    tier: 'essentials',
    isBudgetDupe: false,
    description: '100% breathable pure cotton with warm matte finish. Fits queen/hostel double bed.',
    styleTag: 'Warm Earthy',
  },
  {
    id: 'prod-bedsheet-dupe',
    category: 'Bedding',
    name: 'Microfibre Peach Soft Bedsheet Set (Terracotta Rust)',
    imageUrl: 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=600&q=80',
    estimatedPriceInr: 499,
    merchant: 'Meesho',
    merchantUrl: 'https://www.meesho.com',
    tier: 'budget_dupes',
    isBudgetDupe: true,
    dupeOfId: 'prod-bedsheet-1',
    dupeSavingsInr: 800,
    description: 'High-density brushed microfibre dupe. Wrinkle-free and budget-friendly.',
    styleTag: 'Budget Alternative',
  },

  // 2. String lights
  {
    id: 'prod-lights-1',
    category: 'Lighting',
    name: 'Warm White 2700K Fairy Copper Wire String Lights (10m USB + Remote)',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    estimatedPriceInr: 349,
    merchant: 'Amazon India',
    merchantUrl: 'https://www.amazon.in',
    tier: 'essentials',
    isBudgetDupe: false,
    description: 'Soft golden glow that instantly transforms cold hostel tube lights into an intimate vibe.',
    styleTag: 'Cozy Glow',
  },

  // 3. Table lamp
  {
    id: 'prod-lamp-1',
    category: 'Lighting',
    name: 'Pleated Fabric Shade Wooden Base Accent Table Lamp',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
    estimatedPriceInr: 1450,
    merchant: 'IKEA India',
    merchantUrl: 'https://www.ikea.com/in',
    tier: 'nice_to_have',
    isBudgetDupe: false,
    description: 'Nordic pleated silhouette with warm diffused glow. Ideal for study desk or bedside.',
    styleTag: 'Japandi & Scandi',
  },
  {
    id: 'prod-lamp-dupe',
    category: 'Lighting',
    name: 'Rattan Style USB Rechargeable Mushroom Desk Lamp',
    imageUrl: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=600&q=80',
    estimatedPriceInr: 599,
    merchant: 'Amazon India',
    merchantUrl: 'https://www.amazon.in',
    tier: 'budget_dupes',
    isBudgetDupe: true,
    dupeOfId: 'prod-lamp-1',
    dupeSavingsInr: 851,
    description: 'Cordless touch dimmer with 3 warm light modes. No plug point constraint.',
    styleTag: 'Budget Alternative',
  },

  // 4. Cushion covers
  {
    id: 'prod-cushions-1',
    category: 'Textiles',
    name: 'Jaipuri Hand Block Print Cotton Cushion Covers (Set of 5, 16x16")',
    imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80',
    estimatedPriceInr: 899,
    merchant: 'Pepperfry',
    merchantUrl: 'https://www.pepperfry.com',
    tier: 'essentials',
    isBudgetDupe: false,
    description: 'Artisanal indigo and mustard botanical motifs crafted with natural vegetable dyes.',
    styleTag: 'Modern Indian',
  },
  {
    id: 'prod-cushions-dupe',
    category: 'Textiles',
    name: 'Boho Tufted Geometric Cushion Covers (Set of 2, 16x16")',
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80',
    estimatedPriceInr: 399,
    merchant: 'Meesho',
    merchantUrl: 'https://www.meesho.com',
    tier: 'budget_dupes',
    isBudgetDupe: true,
    dupeOfId: 'prod-cushions-1',
    dupeSavingsInr: 500,
    description: 'Textured fringe and tufted cotton blend for a laid-back bohemian corner.',
    styleTag: 'Budget Alternative',
  },

  // 5. Rug
  {
    id: 'prod-rug-1',
    category: 'Flooring & Rugs',
    name: 'Hand-braided Natural Jute Circular Accent Floor Mat (90 cm)',
    imageUrl: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80',
    estimatedPriceInr: 1199,
    merchant: 'IKEA India',
    merchantUrl: 'https://www.ikea.com/in',
    tier: 'essentials',
    isBudgetDupe: false,
    description: 'Durable eco-friendly golden jute fibers. Covers chipped tiles and adds grounding texture.',
    styleTag: 'Natural Boho',
  },

  // 6. Curtains
  {
    id: 'prod-curtains-1',
    category: 'Window Decor',
    name: 'Semi-Sheer Linen Textured Grommet Window Curtains (Set of 2, 7ft)',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    estimatedPriceInr: 1049,
    merchant: 'Amazon India',
    merchantUrl: 'https://www.amazon.in',
    tier: 'essentials',
    isBudgetDupe: false,
    description: 'Filters harsh afternoon sun into gentle golden daylight while maintaining privacy.',
    styleTag: 'Scandi Minimal',
  },

  // 7. Full-length mirror
  {
    id: 'prod-mirror-1',
    category: 'Wall & Floor Decor',
    name: 'Arch Metal Frame Full-Length Dressing Mirror (60x18")',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    estimatedPriceInr: 2890,
    merchant: 'Pepperfry',
    merchantUrl: 'https://www.pepperfry.com',
    tier: 'nice_to_have',
    isBudgetDupe: false,
    description: 'Slender gold powder-coated aluminum frame. Bounces light and doubles perceived room space.',
    styleTag: 'Pinterest Aesthetic',
  },
  {
    id: 'prod-mirror-dupe',
    category: 'Wall & Floor Decor',
    name: 'Acrylic Self-Adhesive Full-Length Wave Mirror Tiles (Set of 4)',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
    estimatedPriceInr: 699,
    merchant: 'Flipkart',
    merchantUrl: 'https://www.flipkart.com',
    tier: 'budget_dupes',
    isBudgetDupe: true,
    dupeOfId: 'prod-mirror-1',
    dupeSavingsInr: 2191,
    description: 'Zero drilling or glass hazard. Lightweight acrylic tiles stick cleanly on wardrobe doors.',
    styleTag: 'Budget Alternative',
  },

  // 8. Storage organizer
  {
    id: 'prod-storage-1',
    category: 'Storage',
    name: '3-Tier Metal Utility Rolling Trolley with Lockable Wheels',
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80',
    estimatedPriceInr: 1699,
    merchant: 'IKEA India',
    merchantUrl: 'https://www.ikea.com/in',
    tier: 'nice_to_have',
    isBudgetDupe: false,
    description: 'Rolls between bed and desk. Holds books, skincare, tea kettle, and bedside essentials.',
    styleTag: 'Hostel Friendly',
  },

  // 9. Indoor plant
  {
    id: 'prod-plant-1',
    category: 'Greenery',
    name: 'Sansevieria Snake Plant in Ceramic Self-Watering Planter',
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80',
    estimatedPriceInr: 499,
    merchant: 'Amazon India',
    merchantUrl: 'https://www.amazon.in',
    tier: 'essentials',
    isBudgetDupe: false,
    description: 'Practically indestructible low-light plant. NASA-approved air purifier for hostel rooms.',
    styleTag: 'Fresh Greenery',
  },

  // 10. Wall art
  {
    id: 'prod-art-1',
    category: 'Wall Decor',
    name: 'Minimalist Botanical Line Art Framed Canvas (Set of 3, A3 size)',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    estimatedPriceInr: 899,
    merchant: 'Amazon India',
    merchantUrl: 'https://www.amazon.in',
    tier: 'nice_to_have',
    isBudgetDupe: false,
    description: 'Pre-fitted with non-marking adhesive mounting strips. Leaves zero nail holes for landlords.',
    styleTag: 'Rental Friendly',
  },

  // 11. Study desk organizer
  {
    id: 'prod-desk-organizer-1',
    category: 'Study & WFH',
    name: 'Bamboo Wooden 4-Compartment Desk Tidy & Phone Stand',
    imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=600&q=80',
    estimatedPriceInr: 549,
    merchant: 'Amazon India',
    merchantUrl: 'https://www.amazon.in',
    tier: 'essentials',
    isBudgetDupe: false,
    description: 'Clears stationary clutter, keeps charging cables routed, and angles phone for Zoom calls.',
    styleTag: 'WFH & Study',
  },

  // 12. Folding side table
  {
    id: 'prod-table-1',
    category: 'Movable Furniture',
    name: 'Scandinavian Foldable Tray Bedside Side Table (Matte Olive)',
    imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80',
    estimatedPriceInr: 1299,
    merchant: 'Pepperfry',
    merchantUrl: 'https://www.pepperfry.com',
    tier: 'nice_to_have',
    isBudgetDupe: false,
    description: 'Removable serving tray top. Folds completely flat in 5 seconds to stow under bed.',
    styleTag: 'Space Saver',
  },

  // 13. Reference Image Furniture: Accent Seat
  {
    id: 'prod-ottoman-seat',
    category: 'Accent Seating',
    name: 'Wooden Kids & Reading Accent Velvet Ottoman Stool',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
    estimatedPriceInr: 1890,
    merchant: 'Pepperfry',
    merchantUrl: 'https://www.pepperfry.com',
    tier: 'nice_to_have',
    isBudgetDupe: false,
    description: 'Plush tufted velvet seat with solid natural pine wood legs. Perfect compact reading stool.',
    styleTag: 'Signature Seat',
  },

  // 14. Reference Image Furniture: Office Chair
  {
    id: 'prod-office-chair',
    category: 'Office Chair',
    name: 'Ergonomic Tufted Swivel Task Chair (Blush Rose)',
    imageUrl: 'https://images.unsplash.com/photo-1580481077198-c84a7e2b109e?auto=format&fit=crop&w=600&q=80',
    estimatedPriceInr: 4499,
    merchant: 'Amazon India',
    merchantUrl: 'https://www.amazon.in',
    tier: 'essentials',
    isBudgetDupe: false,
    description: 'Padded lumbar cushion with 360-degree silent castor wheels. Ideal for student study desks.',
    styleTag: 'Study & Work',
  },

  // 15. Reference Image Furniture: Office Table / Bedside
  {
    id: 'prod-office-table',
    category: 'Office Table',
    name: 'Nordic Compact 2-Drawer Study & Bedside Table (Natural Oak)',
    imageUrl: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=600&q=80',
    estimatedPriceInr: 2299,
    merchant: 'IKEA India',
    merchantUrl: 'https://www.ikea.com/in',
    tier: 'essentials',
    isBudgetDupe: false,
    description: 'Smooth sliding storage drawers for books and laptops. Space-efficient footprint for hostels.',
    styleTag: 'Compact Living',
  },

  // 16. Reference Image Furniture: Round Pedestal Table
  {
    id: 'prod-pedestal-table',
    category: 'Lamp & Table',
    name: 'Round Fluted Pedestal Coffee & Accent Table (Alabaster White)',
    imageUrl: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=600&q=80',
    estimatedPriceInr: 3199,
    merchant: 'Pepperfry',
    merchantUrl: 'https://www.pepperfry.com',
    tier: 'nice_to_have',
    isBudgetDupe: false,
    description: 'Sculptural architectural base with waterproof laminate top. Easy to clean and relocate.',
    styleTag: 'Minimalist Studio',
  },

  // 17. Reference Image Furniture: Handcrafted Accent Armchair
  {
    id: 'prod-mustard-armchair',
    category: 'Living Room',
    name: 'Handcrafted Ergonomic Accent Armchair (Warm Mustard Velvet)',
    imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80',
    estimatedPriceInr: 6499,
    merchant: 'IKEA India',
    merchantUrl: 'https://www.ikea.com/in',
    tier: 'nice_to_have',
    isBudgetDupe: false,
    description: 'Deep cushioned lounge chair with tapered gold metal feet. Statement piece for bedroom nooks.',
    styleTag: 'Signature Seat',
  },
];
