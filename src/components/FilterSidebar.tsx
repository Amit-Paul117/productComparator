import { Filter, X } from 'lucide-react';
import { SearchFilters } from '../types/product';

interface FilterSidebarProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  availablePlatforms: string[];
  isOpen: boolean;
  onClose: () => void;
}

export const FilterSidebar = ({
  filters,
  onFiltersChange,
  availablePlatforms,
  isOpen,
  onClose
}: FilterSidebarProps) => {
  const handlePlatformToggle = (platform: string) => {
    const currentPlatforms = filters.platforms || [];
    const newPlatforms = currentPlatforms.includes(platform)
      ? currentPlatforms.filter(p => p !== platform)
      : [...currentPlatforms, platform];

    onFiltersChange({ ...filters, platforms: newPlatforms });
  };

  const handleClearFilters = () => {
    onFiltersChange({});
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed lg:static top-0 left-0 h-full w-80 bg-white shadow-lg z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } overflow-y-auto`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              <h2 className="text-xl font-bold">Filters</h2>
            </div>
            <button onClick={onClose} className="lg:hidden">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-gray-700">Price Range</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Min Price (₹)</label>
                <input
                  type="number"
                  value={filters.minPrice || ''}
                  onChange={(e) => onFiltersChange({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })}
                  placeholder="Min"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Max Price (₹)</label>
                <input
                  type="number"
                  value={filters.maxPrice || ''}
                  onChange={(e) => onFiltersChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })}
                  placeholder="Max"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-gray-700">Platforms</h3>
            <div className="space-y-2">
              {availablePlatforms.map((platform) => (
                <label key={platform} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={(filters.platforms || []).includes(platform)}
                    onChange={() => handlePlatformToggle(platform)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{platform}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-gray-700">Minimum Rating</h3>
            <div className="space-y-2">
              {[4.5, 4, 3.5, 3].map((rating) => (
                <label key={rating} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.minRating === rating}
                    onChange={() => onFiltersChange({ ...filters, minRating: rating })}
                    className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{rating}★ & above</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-gray-700">Sort By</h3>
            <select
              value={filters.sortBy || 'relevance'}
              onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="relevance">Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <button
            onClick={handleClearFilters}
            className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </>
  );
};
