export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  productUrl: string;
  platform: string;
  availability: string;
  brand: string;
}

export interface SearchFilters {
  minPrice?: number;
  maxPrice?: number;
  platforms?: string[];
  minRating?: number;
  sortBy?: 'price-low' | 'price-high' | 'rating' | 'relevance';
}
