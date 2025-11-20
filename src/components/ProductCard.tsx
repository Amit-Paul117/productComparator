import { Star, ExternalLink, ShoppingCart } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  isComparing: boolean;
  onToggleCompare: (product: Product) => void;
}

export const ProductCard = ({ product, isComparing, onToggleCompare }: ProductCardProps) => {
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div className="relative overflow-hidden bg-gray-100 h-48">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=400';
          }}
        />
        {discountPercent > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            {discountPercent}% OFF
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-xs font-semibold">
          {product.platform}
        </div>
        {product.availability === 'Out of Stock' && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 h-12">
          {product.title}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-sm">
            <span className="font-semibold">{product.rating}</span>
            <Star className="w-3 h-3 fill-current" />
          </div>
          <span className="text-sm text-gray-600">
            ({product.reviewCount.toLocaleString()} reviews)
          </span>
        </div>

        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {product.currency}{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {product.currency}{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-3">
          <span className="font-medium">Brand:</span> {product.brand}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onToggleCompare(product)}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              isComparing
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {isComparing ? 'In Comparison' : 'Add to Compare'}
          </button>
          <a
            href={product.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            title="View on platform"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
