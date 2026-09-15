import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  SlidersHorizontal, 
  RotateCcw, 
  Search, 
  AlertCircle, 
  Sparkles,
  Info
} from 'lucide-react';
import { Property, PropertyFilter } from '../types';
import { PropertyCard } from './PropertyCard';

interface FeaturedPropertiesProps {
  properties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  initialFilter?: {
    category: string;
    location: string;
    minPrice: number;
    maxPrice: number;
  };
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  initialFilter,
}) => {
  const [activeFilter, setActiveFilter] = useState<PropertyFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const filterTabs: Array<{ id: PropertyFilter; label: string }> = [
    { id: 'All', label: 'All Properties' },
    { id: 'For Sale', label: 'For Sale' },
    { id: 'For Rent', label: 'For Rent' },
    { id: 'Land', label: 'Land' },
    { id: 'Commercial', label: 'Commercial' },
  ];

  // Filtering & Search Logic
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // 1. Tab filter
      if (activeFilter === 'For Sale' && prop.listingType !== 'For Sale') return false;
      if (activeFilter === 'For Rent' && prop.listingType !== 'For Rent') return false;
      if (activeFilter === 'Land' && !prop.category.toLowerCase().includes('land')) return false;
      if (activeFilter === 'Commercial' && !prop.category.toLowerCase().includes('commercial')) return false;

      // 2. Hero search criteria if applied
      if (initialFilter) {
        if (initialFilter.category !== 'All' && prop.category !== initialFilter.category) {
          return false;
        }
        if (initialFilter.location !== 'All Locations' && !prop.location.toLowerCase().includes(initialFilter.location.toLowerCase())) {
          return false;
        }
        if (prop.price < initialFilter.minPrice) return false;
        if (prop.price > initialFilter.maxPrice) return false;
      }

      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(q);
        const matchesLoc = prop.location.toLowerCase().includes(q);
        const matchesCategory = prop.category.toLowerCase().includes(q);
        const matchesAmenities = prop.amenities.some(a => a.toLowerCase().includes(q));
        if (!matchesTitle && !matchesLoc && !matchesCategory && !matchesAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [properties, activeFilter, searchQuery, sortBy, initialFilter]);

  return (
    <section id="properties" className="py-16 sm:py-24 bg-[#F8F7F4] border-b border-[#E7E7E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0E8] border border-[#F36B21]/20 text-[#F36B21] text-xs font-semibold uppercase tracking-wider mb-3">
              Curated Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight font-sans">
              Featured Properties & Verified Lands
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#555555]">
              Explore sample residential plots, executive family villas, serviced rentals, and commercial spaces across Greater Accra.
            </p>
          </div>

          {/* Quick Notice about editable listings */}
          <div className="inline-flex items-center gap-2 text-xs text-[#555555] bg-white px-3.5 py-2 rounded-xl border border-[#E7E7E7] shadow-xs">
            <Info className="w-4 h-4 text-[#F36B21] shrink-0" />
            <span>Sample listings format ready for continuous property portfolio updates.</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#E7E7E7] shadow-sm mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    activeFilter === tab.id
                      ? 'bg-[#F36B21] text-white shadow-sm shadow-[#F36B21]/25'
                      : 'bg-[#F8F7F4] text-[#222222] hover:bg-[#DDE3E7]/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input & Sort Dropdown */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search location, title, specs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#F8F7F4] border border-[#E7E7E7] rounded-xl text-xs sm:text-sm text-[#222222] placeholder:text-gray-400 focus:outline-none focus:border-[#F36B21]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F8F7F4] border border-[#E7E7E7] rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-[#222222] focus:outline-none focus:border-[#F36B21]"
              >
                <option value="default">Default Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filter Indicators */}
          {(searchQuery || (initialFilter && (initialFilter.category !== 'All' || initialFilter.location !== 'All Locations' || initialFilter.minPrice > 0 || initialFilter.maxPrice < Infinity))) && (
            <div className="pt-2 border-t border-[#E7E7E7] flex items-center justify-between text-xs text-[#555555]">
              <span>
                Showing {filteredProperties.length} results matching current search criteria
              </span>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('All');
                }}
                className="text-[#F36B21] hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Property Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectProperty={onSelectProperty}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="bg-white rounded-2xl border border-[#E7E7E7] p-10 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-[#FFF0E8] flex items-center justify-center mx-auto mb-4 text-[#F36B21]">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-[#222222] mb-1">
              No Properties Found
            </h3>
            <p className="text-sm text-[#555555] mb-6">
              We couldn't find any properties matching your current filter. Try adjusting your budget, selecting another category, or clearing the search text.
            </p>
            <button
              onClick={() => {
                setActiveFilter('All');
                setSearchQuery('');
              }}
              className="bg-[#F36B21] hover:bg-[#D95813] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Show All Properties</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
