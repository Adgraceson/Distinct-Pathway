import React, { useState } from 'react';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  Heart, 
  ArrowRight, 
  MessageCircle, 
  CheckCircle,
  FileCheck
} from 'lucide-react';
import { Property } from '../types';
import { getWhatsAppLink } from '../data/companyInfo';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (propertyId: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const fallbackImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";

  // Badge styling
  const getBadgeStyle = () => {
    switch (property.badge) {
      case 'Featured':
        return 'bg-[#F36B21] text-white';
      case 'For Rent':
        return 'bg-[#222222] text-white';
      case 'Hot Deal':
        return 'bg-amber-600 text-white';
      case 'New':
        return 'bg-emerald-700 text-white';
      default:
        return 'bg-[#222222] text-white';
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = `Hello Distinct Pathway Real Estates, I am interested in "${property.title}" (${property.priceFormatted}) in ${property.location}. Please share more details.`;
    window.open(getWhatsAppLink(msg), '_blank');
  };

  return (
    <div
      id={`property-card-${property.id}`}
      className="group bg-white rounded-2xl overflow-hidden border border-[#E7E7E7] shadow-sm hover:shadow-xl hover:border-[#F36B21]/40 transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#DDE3E7]/40 cursor-pointer" onClick={() => onSelectProperty(property)}>
        <img
          src={imageError ? fallbackImage : property.images[0]}
          alt={property.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-[#DDE3E7]/50 animate-pulse flex items-center justify-center">
            <span className="text-xs text-gray-400">Loading photo...</span>
          </div>
        )}

        {/* Dark subtle gradient for badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none"></div>

        {/* Status Badge */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1 z-10">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide uppercase shadow-sm ${getBadgeStyle()}`}>
            {property.badge || property.listingType}
          </span>
          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-black/60 backdrop-blur-md text-white">
            {property.category}
          </span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          aria-label={isFavorite ? "Remove from favourites" : "Save to favourites"}
          className={`absolute top-3.5 right-3.5 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 shadow-md ${
            isFavorite 
              ? 'bg-[#F36B21] text-white scale-110' 
              : 'bg-white/90 text-[#222222] hover:bg-white hover:text-[#F36B21]'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
        </button>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 left-3 z-10 bg-[#222222]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
          <span className="text-white font-extrabold text-base sm:text-lg tracking-tight">
            {property.priceFormatted}
          </span>
          {property.pricePeriod && (
            <span className="text-xs text-white/80 ml-1 font-normal">{property.pricePeriod}</span>
          )}
        </div>
      </div>

      {/* Property Details Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F36B21] mb-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="line-clamp-1">{property.location}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectProperty(property)}
            className="text-base sm:text-lg font-bold text-[#222222] line-clamp-1 hover:text-[#F36B21] cursor-pointer transition-colors mb-2"
            title={property.title}
          >
            {property.title}
          </h3>

          {/* Key Specs Bar (Beds, Baths, Size) */}
          <div className="flex items-center gap-4 py-2.5 my-2 border-y border-[#E7E7E7]/80 text-xs text-[#555555]">
            {property.bedrooms !== undefined && (
              <div className="flex items-center gap-1" title={`${property.bedrooms} Bedrooms`}>
                <Bed className="w-3.5 h-3.5 text-[#222222]" />
                <span className="font-semibold text-[#222222]">{property.bedrooms}</span> Beds
              </div>
            )}

            {property.bathrooms !== undefined && (
              <div className="flex items-center gap-1" title={`${property.bathrooms} Bathrooms`}>
                <Bath className="w-3.5 h-3.5 text-[#222222]" />
                <span className="font-semibold text-[#222222]">{property.bathrooms}</span> Baths
              </div>
            )}

            <div className="flex items-center gap-1" title={`Dimensions: ${property.size}`}>
              <Maximize className="w-3.5 h-3.5 text-[#222222]" />
              <span className="line-clamp-1">{property.size}</span>
            </div>
          </div>

          {/* Documentation status tag */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#555555] bg-[#F8F7F4] p-2 rounded-lg mb-3">
            <FileCheck className="w-3.5 h-3.5 text-[#F36B21] shrink-0" />
            <span className="line-clamp-1 font-medium">{property.documentStatus}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={() => onSelectProperty(property)}
            className="flex-1 bg-[#222222] hover:bg-[#F36B21] text-white py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors duration-200"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleWhatsAppClick}
            aria-label="Enquire via WhatsApp"
            title="Enquire on WhatsApp"
            className="p-2.5 rounded-xl border border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-600 hover:text-white transition-colors duration-200"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
