import { X, ExternalLink, Star, Check } from 'lucide-react';
import { Product } from '../types/product';

interface ComparisonViewProps {
  products: Product[];
  onRemoveProduct: (productId: string) => void;
  onClose: () => void;
}

export const ComparisonView = ({ products, onRemoveProduct, onClose }: ComparisonViewProps) => {
  if (products.length === 0) return null;

  const getLowestPrice = () => Math.min(...products.map(p => p.price));
  const getHighestRating = () => Math.max(...products.map(p => p.rating));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Product Comparison</h2>
          <button
            onClick={onClose}
            className="hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-max">
            <div className="grid grid-cols-[200px_repeat(auto-fit,minmax(300px,1fr))] gap-4 p-6">
              <div className="space-y-4">
                <div className="h-48"></div>
                <div className="font-semibold text-gray-700 py-3">Product Name</div>
                <div className="font-semibold text-gray-700 py-3">Platform</div>
                <div className="font-semibold text-gray-700 py-3">Price</div>
                <div className="font-semibold text-gray-700 py-3">Rating</div>
                <div className="font-semibold text-gray-700 py-3">Reviews</div>
                <div className="font-semibold text-gray-700 py-3">Brand</div>
                <div className="font-semibold text-gray-700 py-3">Availability</div>
                <div className="font-semibold text-gray-700 py-3">Discount</div>
                <div className="font-semibold text-gray-700 py-3">Actions</div>
              </div>

              {products.map((product) => {
                const isLowestPrice = product.price === getLowestPrice();
                const isHighestRating = product.rating === getHighestRating();
                const discountPercent = product.originalPrice
                  ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                  : 0;

                return (
                  <div key={product.id} className="space-y-4 border-l-2 border-gray-200 pl-4">
                    <div className="relative">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-48 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=400';
                        }}
                      />
                      <button
                        onClick={() => onRemoveProduct(product.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="py-3 text-sm font-medium">{product.title}</div>

                    <div className="py-3">
                      <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                        {product.platform}
                      </span>
                    </div>

                    <div className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">
                          {product.currency}{product.price.toLocaleString()}
                        </span>
                        {isLowestPrice && (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <Check className="w-3 h-3" /> Best Price
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-sm">
                          <span className="font-semibold">{product.rating}</span>
                          <Star className="w-3 h-3 fill-current" />
                        </div>
                        {isHighestRating && (
                          <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <Check className="w-3 h-3" /> Top Rated
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="py-3 text-sm text-gray-600">
                      {product.reviewCount.toLocaleString()} reviews
                    </div>

                    <div className="py-3 text-sm">{product.brand}</div>

                    <div className="py-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        product.availability === 'In Stock'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.availability}
                      </span>
                    </div>

                    <div className="py-3">
                      {discountPercent > 0 ? (
                        <span className="text-green-600 font-semibold">{discountPercent}% OFF</span>
                      ) : (
                        <span className="text-gray-500">No discount</span>
                      )}
                    </div>

                    <div className="py-3">
                      <a
                        href={product.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        View Product <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 border-t border-gray-200 text-center text-sm text-gray-600">
          Comparing {products.length} product{products.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};
