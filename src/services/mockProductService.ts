import { Product } from '../types/product';

const platforms = ['Amazon', 'Flipkart', 'Myntra', 'Nykaa', 'Ajio', 'Meesho'];

const generateMockProducts = (query: string, count: number = 20): Product[] => {
  const products: Product[] = [];

  for (let i = 0; i < count; i++) {
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const basePrice = Math.floor(Math.random() * 10000) + 500;
    const discount = Math.random() > 0.5 ? Math.floor(Math.random() * 40) + 10 : 0;
    const price = discount > 0 ? basePrice * (1 - discount / 100) : basePrice;
    const originalPrice = discount > 0 ? basePrice : undefined;

    products.push({
      id: `${platform.toLowerCase()}-${i}-${Date.now()}`,
      title: `${query} - ${platform} Edition ${i + 1}`,
      description: `High quality ${query.toLowerCase()} available on ${platform}. Premium features with excellent customer ratings.`,
      price: Math.floor(price),
      originalPrice: originalPrice ? Math.floor(originalPrice) : undefined,
      currency: '₹',
      rating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
      reviewCount: Math.floor(Math.random() * 5000) + 100,
      imageUrl: `https://images.pexels.com/photos/${1000000 + i}/pexels-photo-${1000000 + i}.jpeg?auto=compress&cs=tinysrgb&w=400`,
      productUrl: `https://${platform.toLowerCase()}.com/product/${i}`,
      platform: platform,
      availability: Math.random() > 0.1 ? 'In Stock' : 'Out of Stock',
      brand: ['Nike', 'Adidas', 'Puma', 'Generic', 'Premium', 'Luxury'][Math.floor(Math.random() * 6)]
    });
  }

  return products;
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (!query || query.trim().length === 0) {
    return [];
  }

  return generateMockProducts(query);
};

export const filterProducts = (
  products: Product[],
  filters: {
    minPrice?: number;
    maxPrice?: number;
    platforms?: string[];
    minRating?: number;
  }
): Product[] => {
  let filtered = [...products];

  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(p => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(p => p.price <= filters.maxPrice!);
  }

  if (filters.platforms && filters.platforms.length > 0) {
    filtered = filtered.filter(p => filters.platforms!.includes(p.platform));
  }

  if (filters.minRating !== undefined) {
    filtered = filtered.filter(p => p.rating >= filters.minRating!);
  }

  return filtered;
};

export const sortProducts = (
  products: Product[],
  sortBy: 'price-low' | 'price-high' | 'rating' | 'relevance'
): Product[] => {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'relevance':
    default:
      return sorted;
  }
};
