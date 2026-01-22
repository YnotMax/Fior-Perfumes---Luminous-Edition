
export type ScentFamily = 'Floral' | 'Woody' | 'Fresh' | 'Amber' | 'All';

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  family: ScentFamily;
  notes: string[];
  description: string;
  imageUrl: string;
  price: string;
}

export type View = 'home' | 'catalog' | 'discovery' | 'concierge';
