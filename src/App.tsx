import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { ProductCard } from './components/ProductCard';
import { FilterSidebar } from './components/FilterSidebar';
import { ComparisonView } from './components/ComparisonView';
import { Product, SearchFilters } from './types/product';
import { searchProducts, filterProducts, sortProducts } from './services/mockProductService';
import { ShoppingBag, ArrowLeftRight, Filter, Loader2 } from 'lucide-react';

function App() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [comparisonProducts, setComparisonProducts] = useState<Product[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const availablePlatforms = ['Amazon', 'Flipkart', 'Myntra', 'Nykaa', 'Ajio', 'Meesho'];

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setIsLoading(true);
    setComparisonProducts([]);

    try {
      const results = await searchProducts(searchQuery);
      setProducts(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filtered = filterProducts(products, filters);
    if (filters.sortBy) {
      filtered = sortProducts(filtered, filters.sortBy);
    }
    setDisplayedProducts(filtered);
  }, [products, filters]);

  const handleToggleCompare = (product: Product) => {
    setComparisonProducts(prev => {
      const isAlreadyComparing = prev.some(p => p.id === product.id);
      if (isAlreadyComparing) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 4) {
        alert('You can compare up to 4 products at a time');
        return prev;
      }
      return [...prev, product];
    });
  };

  const handleRemoveFromComparison = (productId: string) => {
    setComparisonProducts(prev => prev.filter(p => p.id !== productId));
  };

  const isProductInComparison = (productId: string) => {
    return comparisonProducts.some(p => p.id === productId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <ShoppingBag className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              PriceCompare Pro
            </h1>
          </div>
          <div className="flex justify-center">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
          {query && (
            <div className="mt-4 text-center text-gray-600">
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Searching across platforms...</span>
                </div>
              ) : (
                <span>
                  Found {displayedProducts.length} products for "{query}"
                </span>
              )}
            </div>
          )}
        </div>
      </header>

      {!query && !isLoading && (
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <ShoppingBag className="w-24 h-24 text-blue-600 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Compare Prices Across Multiple Platforms
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Search for any product and get the best deals from Amazon, Flipkart, Myntra, Nykaa, and more
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="font-bold text-lg mb-2">Search Anywhere</h3>
              <p className="text-gray-600 text-sm">
                Find products from fashion, electronics, home decor, and everything in between
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-bold text-lg mb-2">Best Prices</h3>
              <p className="text-gray-600 text-sm">
                Compare prices, ratings, and reviews to find the perfect deal
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-bold text-lg mb-2">Save Time</h3>
              <p className="text-gray-600 text-sm">
                No more switching between tabs. See everything in one place
              </p>
            </div>
          </div>
        </div>
      )}

      {query && !isLoading && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-6">
            <div className="hidden lg:block flex-shrink-0">
              <FilterSidebar
                filters={filters}
                onFiltersChange={setFilters}
                availablePlatforms={availablePlatforms}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <Filter className="w-5 h-5" />
                  <span className="font-medium">Filters</span>
                </button>

                {comparisonProducts.length > 0 && (
                  <button
                    onClick={() => setShowComparison(true)}
                    className="ml-auto flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg font-medium"
                  >
                    <ArrowLeftRight className="w-5 h-5" />
                    <span>Compare ({comparisonProducts.length})</span>
                  </button>
                )}
              </div>

              {displayedProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">
                    No products found matching your filters. Try adjusting your search criteria.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isComparing={isProductInComparison(product.id)}
                      onToggleCompare={handleToggleCompare}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <FilterSidebar
        filters={filters}
        onFiltersChange={setFilters}
        availablePlatforms={availablePlatforms}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {showComparison && (
        <ComparisonView
          products={comparisonProducts}
          onRemoveProduct={handleRemoveFromComparison}
          onClose={() => setShowComparison(false)}
        />
      )}

      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              <span className="font-semibold">PriceCompare Pro</span> - Compare prices across Amazon, Flipkart, Myntra, Nykaa, Ajio, Meesho
            </p>
            <p className="text-sm">Find the best deals on fashion, electronics, home decor, and more</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
