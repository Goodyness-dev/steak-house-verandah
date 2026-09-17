/**
 * Seating Areas and Dining Occasions for The Steak House on The Verandah
 * Historic Devon House, Kingston, Jamaica
 */

export const SEATING_AREAS = [
  {
    id: 'grand-verandah',
    name: 'Historic Devon Verandah',
    description: 'Open-air colonial arches overlooking illuminated estate gardens'
  },
  {
    id: 'tropical-gazebo',
    name: 'Private Tropical Gazebo',
    description: 'Intimate secluded garden gazebo for romantic celebrations'
  },
  {
    id: 'acoustic-verandah',
    name: 'Main Heritage Verandah',
    description: 'Center of verandah chophouse atmosphere near evening acoustic jazz'
  },
  {
    id: 'cellar-room',
    name: 'Mahogany Cellar Room',
    description: 'Air-conditioned indoor dining surrounded by vintage reserve wines'
  },
  {
    id: 'tasting-lounge',
    name: 'Sommelier Tasting Lounge',
    description: 'Chic cocktail bar seating for rum flights and pre-dinner drinks'
  },
  {
    id: 'chef-terrace',
    name: "Chef's Garden Terrace",
    description: 'Al-fresco terrace table with direct view of lush tropical flora'
  }
];

export const DINING_OCCASIONS = [
  'Romantic Dinner / Date Night',
  'Anniversary Celebration',
  'Birthday Celebration',
  'Executive / Corporate Dinner',
  'Family Gathering',
  'Devon House Heritage Tour Dinner',
  'Casual Fine Dining'
];

// Alias for backwards compatibility
export const VEHICLE_MAKES = SEATING_AREAS.map(a => a.name);
