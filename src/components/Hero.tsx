import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Home, 
  Banknote, 
  ArrowRight, 
  PhoneCall, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import { PROPERTY_CATEGORIES, PROPERTY_LOCATIONS } from '../data/properties';
import { COMPANY_INFO, getWhatsAppLink } from '../data/companyInfo';

interface HeroProps {
  onSearch: (filters: {
    category: string;
    location: string;
    minPrice: number;
    maxPrice: number;
  }) => void;
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onOpenConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [minBudget, setMinBudget] = useState<string>('');
  const [maxBudget, setMaxBudget] = useState<string>('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      category: selectedCategory,
      location: selectedLocation,
      minPrice: minBudget ? parseFloat(minBudget) : 0,
      maxPrice: maxBudget ? parseFloat(maxBudget) : Infinity,
    });

    const target = document.getElementById('properties');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreClick = () => {
    const target = document.getElementById('properties');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-6 pb-16 lg:pt-12 lg:pb-24 overflow-hidden">
      {/* Background Image Container with Cinematic Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
          alt="Modern luxury residential estate in Ghana"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-fade-in"
          loading="eager"
        />
        {/* Subtle Dark Overlay for high contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#171717]/90 via-[#222222]/80 to-[#222222]/65"></div>
        {/* Subtle warm orange ambient light flare */}
        <div className="absolute -top-32 right-0 w-96 h-96 bg-[#F36B21]/15 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl pt-8 pb-10 sm:pt-12 sm:pb-14 text-left">
          {/* Trust Badge / Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-[#F36B21]"></span>
            <span>Verified Properties & Strategic Land in Ghana</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6 font-sans">
            Find a Property That <span className="text-[#F36B21]">Feels Like Home</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-[#DDE3E7] font-normal leading-relaxed mb-8 max-w-2xl">
            Discover secure lands, beautiful homes and rewarding real-estate investment opportunities with Distinct Pathway Real Estates.
          </p>

          {/* Primary & Secondary Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 mb-8 sm:mb-12">
            <button
              id="hero-explore-btn"
              onClick={handleExploreClick}
              className="inline-flex items-center justify-center gap-2 bg-[#F36B21] hover:bg-[#D95813] text-white px-7 py-3.5 rounded-xl font-semibold text-base shadow-lg shadow-[#F36B21]/25 hover:shadow-xl hover:shadow-[#F36B21]/40 transition-all duration-200 group active:scale-98"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              id="hero-agent-btn"
              href={getWhatsAppLink("Hello Distinct Pathway Real Estates, I would like to speak to an agent about property options in Ghana.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 px-6 py-3.5 rounded-xl font-semibold text-base transition-all duration-200"
            >
              <PhoneCall className="w-4 h-4 text-[#F36B21]" />
              <span>Speak to an Agent</span>
            </a>
          </div>

          {/* Key Value Micro Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-white/15 text-xs sm:text-sm text-[#F8F7F4]/90">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F36B21] shrink-0" />
              <span>Documented Lands</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F36B21] shrink-0" />
              <span>Guided Site Visits</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <CheckCircle2 className="w-4 h-4 text-[#F36B21] shrink-0" />
              <span>Accra & Tema Focus</span>
            </div>
          </div>
        </div>

        {/* Modern Property Search Panel */}
        <div className="mt-4 sm:mt-6 bg-white rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-7 border border-[#E7E7E7] max-w-6xl mx-auto backdrop-blur-lg">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E7E7E7]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#F36B21]"></div>
              <h2 className="text-sm sm:text-base font-bold text-[#222222] tracking-wide uppercase">
                Find Your Ideal Property in Ghana
              </h2>
            </div>
            <span className="text-xs text-[#555555] hidden sm:inline">
              Prices displayed in Ghana Cedis (GH₵)
            </span>
          </div>

          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* 1. Property Type */}
            <div className="space-y-1.5">
              <label htmlFor="search-property-type" className="text-xs font-semibold text-[#555555] flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-[#F36B21]" />
                Property Type
              </label>
              <div className="relative">
                <select
                  id="search-property-type"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-[#F8F7F4] border border-[#E7E7E7] rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#222222] focus:outline-none focus:border-[#F36B21] focus:ring-1 focus:ring-[#F36B21] appearance-none cursor-pointer"
                >
                  {PROPERTY_CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 2. Preferred Location */}
            <div className="space-y-1.5">
              <label htmlFor="search-location" className="text-xs font-semibold text-[#555555] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#F36B21]" />
                Preferred Location
              </label>
              <div className="relative">
                <select
                  id="search-location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-[#F8F7F4] border border-[#E7E7E7] rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#222222] focus:outline-none focus:border-[#F36B21] focus:ring-1 focus:ring-[#F36B21] appearance-none cursor-pointer"
                >
                  {PROPERTY_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3. Minimum Budget */}
            <div className="space-y-1.5">
              <label htmlFor="search-min-budget" className="text-xs font-semibold text-[#555555] flex items-center gap-1.5">
                <Banknote className="w-3.5 h-3.5 text-[#F36B21]" />
                Min Budget (GH₵)
              </label>
              <input
                id="search-min-budget"
                type="number"
                placeholder="e.g. 40000"
                value={minBudget}
                onChange={(e) => setMinBudget(e.target.value)}
                min="0"
                step="5000"
                className="w-full bg-[#F8F7F4] border border-[#E7E7E7] rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#222222] placeholder:text-gray-400 focus:outline-none focus:border-[#F36B21] focus:ring-1 focus:ring-[#F36B21]"
              />
            </div>

            {/* 4. Maximum Budget */}
            <div className="space-y-1.5">
              <label htmlFor="search-max-budget" className="text-xs font-semibold text-[#555555] flex items-center gap-1.5">
                <Banknote className="w-3.5 h-3.5 text-[#F36B21]" />
                Max Budget (GH₵)
              </label>
              <input
                id="search-max-budget"
                type="number"
                placeholder="e.g. 2000000"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
                min="0"
                step="50000"
                className="w-full bg-[#F8F7F4] border border-[#E7E7E7] rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#222222] placeholder:text-gray-400 focus:outline-none focus:border-[#F36B21] focus:ring-1 focus:ring-[#F36B21]"
              />
            </div>

            {/* 5. Search Button */}
            <div className="sm:col-span-2 lg:col-span-1 flex items-end">
              <button
                type="submit"
                id="search-submit-btn"
                className="w-full h-[42px] bg-[#F36B21] hover:bg-[#D95813] text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md shadow-[#F36B21]/20 hover:shadow-lg transition-all duration-200 active:scale-98"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
