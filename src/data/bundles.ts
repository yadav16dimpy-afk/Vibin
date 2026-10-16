export interface BundleSection {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  isComingSoon?: boolean;
  budgetCapInr?: number;
  productIds: string[];
}

export const SHOP_BUNDLES: BundleSection[] = [
  {
    id: 'under_5000',
    title: 'Makeovers Under ₹5,000',
    subtitle: 'Big vibe upgrade without breaking student budgets',
    badge: 'Most Popular',
    budgetCapInr: 5000,
    productIds: ['prod-lights-1', 'prod-bedsheet-dupe', 'prod-plant-1', 'prod-desk-organizer-1', 'prod-cushions-dupe'],
  },
  {
    id: 'hostel_essentials',
    title: 'Hostel Room Essentials',
    subtitle: 'Survive & thrive in 100 sq ft of shared space',
    badge: 'Student Pick',
    productIds: ['prod-lights-1', 'prod-bedsheet-1', 'prod-storage-1', 'prod-desk-organizer-1'],
  },
  {
    id: 'rental_friendly',
    title: 'Rental-Friendly Decor',
    subtitle: 'Zero drilling, no wall damage, landlord approved',
    badge: '100% Removable',
    productIds: ['prod-art-1', 'prod-rug-1', 'prod-mirror-dupe', 'prod-curtains-1'],
  },
  {
    id: 'cozy_bedroom',
    title: 'Cozy Bedroom Upgrade',
    subtitle: 'Warm 2700K layers, textured throws, calm sanctuary',
    badge: 'Hygge Vibe',
    productIds: ['prod-lamp-1', 'prod-bedsheet-1', 'prod-cushions-1', 'prod-lights-1'],
  },
  {
    id: 'wfh_setup',
    title: 'Work From Home & Study Setup',
    subtitle: 'Focus ergonomics, organized cables, and video call backdrops',
    badge: 'Productivity',
    productIds: ['prod-desk-organizer-1', 'prod-lamp-dupe', 'prod-plant-1', 'prod-table-1'],
  },
  {
    id: 'small_room_storage',
    title: 'Small Room Storage',
    subtitle: 'Clever vertical organizers and foldable solutions',
    badge: 'Space Saver',
    productIds: ['prod-storage-1', 'prod-table-1', 'prod-mirror-dupe'],
  },
  {
    id: 'diwali_decor',
    title: 'Festive Diwali Decor',
    subtitle: 'Brass urlis, fairy lights, marigold garlands & ambient lanterns',
    badge: 'Coming Soon',
    isComingSoon: true,
    productIds: [],
  },
  {
    id: 'new_apartment',
    title: 'New Apartment Full-Home Setup',
    subtitle: 'Curated 1BHK & 2BHK room packages with bulk styling discounts',
    badge: 'Coming Soon',
    isComingSoon: true,
    productIds: [],
  },
];
