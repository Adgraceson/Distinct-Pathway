import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  Heart, 
  MessageCircle, 
  Calendar, 
  FileCheck2, 
  CheckCircle2, 
  Share2, 
  ExternalLink 
} from 'lucide-react';
import { Property } from '../types';
import { COMPANY_INFO, getWhatsAppLink } from '../data/companyInfo';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onScheduleVisit: (propertyTitle: string) => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  onClose,
  isFavorite,
  onToggleFavorite,
  onScheduleVisit,
}) => {
  if (!property) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `${property.title} - ${property.priceFormatted} in ${property.location}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappInquiryLink = getWhatsAppLink(
    `Hello Distinct Pathway Real Estates, I am enquiring about "${property.title}" (${property.priceFormatted}) in ${property.location}. Please provide more information or arrange a site visit.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full my-6 overflow-hidden shadow-2xl border border-[#E7E7E7] max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E7E7E7] bg-white sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#F36B21] text-white uppercase">
              {property.badge || property.listingType}
            </span>
            <span className="text-xs font-medium text-[#555555]">
              Ref: {property.id.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-2 rounded-xl border border-[#E7E7E7] text-[#555555] hover:text-[#222222] hover:bg-gray-50 transition-colors"
              title="Share listing"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Favorite toggle */}
            <button
              onClick={() => onToggleFavorite(property.id)}
              className={`p-2 rounded-xl border border-[#E7E7E7] transition-colors ${
                isFavorite 
                  ? 'bg-[#FFF0E8] border-[#F36B21] text-[#F36B21]' 
                  : 'text-[#555555] hover:text-[#F36B21]'
              }`}
              title="Save to favorites"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#F36B21]' : ''}`} />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl border border-[#E7E7E7] text-[#555555] hover:text-black hover:bg-gray-100 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Main Photo Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-gray-100 border border-[#E7E7E7]">
              <img
                src={property.images[activeImageIndex] || property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-white text-xs font-medium">
                Photo {activeImageIndex + 1} of {property.images.length}
              </div>
            </div>

            {/* Thumbnails if multiple images exist */}
            {property.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#F36B21] shadow-sm scale-102'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title, Location & Price */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#E7E7E7]">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#F36B21] uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>{property.location}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#222222]">
                {property.title}
              </h2>
              <p className="text-xs text-[#555555]">{property.region}</p>
            </div>

            <div className="bg-[#FFF0E8] border border-[#F36B21]/30 p-3.5 rounded-2xl sm:text-right shrink-0">
              <span className="text-xs font-semibold text-[#555555] block">Price Guide</span>
              <span className="text-2xl font-black text-[#F36B21] tracking-tight">
                {property.priceFormatted}
              </span>
              {property.pricePeriod && (
                <span className="text-xs text-[#555555] block font-medium">{property.pricePeriod}</span>
              )}
            </div>
          </div>

          {/* Specs Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#F8F7F4] p-3 rounded-xl border border-[#E7E7E7]">
              <span className="text-[11px] text-[#555555] block">Category</span>
              <span className="text-sm font-bold text-[#222222]">{property.category}</span>
            </div>

            <div className="bg-[#F8F7F4] p-3 rounded-xl border border-[#E7E7E7]">
              <span className="text-[11px] text-[#555555] block">Property Size</span>
              <span className="text-sm font-bold text-[#222222]">{property.size}</span>
            </div>

            {property.bedrooms !== undefined && (
              <div className="bg-[#F8F7F4] p-3 rounded-xl border border-[#E7E7E7]">
                <span className="text-[11px] text-[#555555] block">Bedrooms</span>
                <span className="text-sm font-bold text-[#222222]">{property.bedrooms} Beds</span>
              </div>
            )}

            {property.bathrooms !== undefined && (
              <div className="bg-[#F8F7F4] p-3 rounded-xl border border-[#E7E7E7]">
                <span className="text-[11px] text-[#555555] block">Bathrooms</span>
                <span className="text-sm font-bold text-[#222222]">{property.bathrooms} Baths</span>
              </div>
            )}
          </div>

          {/* Documentation Guarantee */}
          <div className="bg-[#FFF0E8]/70 border border-[#F36B21]/20 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#F36B21] text-white flex items-center justify-center shrink-0">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#222222] uppercase tracking-wide">
                Verification & Documentation Status
              </h4>
              <p className="text-sm font-semibold text-[#222222] mt-0.5">
                {property.documentStatus}
              </p>
              <p className="text-xs text-[#555555] mt-1">
                Distinct Pathway coordinates official search reviews and on-site beacon cross-checks before closing.
              </p>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-[#222222] uppercase tracking-wider">
              Property Overview
            </h4>
            <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Amenities & Features */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#222222] uppercase tracking-wider">
              Key Features & Infrastructure
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {property.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#222222] bg-[#F8F7F4] p-2.5 rounded-xl border border-[#E7E7E7]/60">
                  <CheckCircle2 className="w-4 h-4 text-[#F36B21] shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-[#E7E7E7] bg-[#F8F7F4] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#555555] hidden sm:block">
            Need urgent assistance? <a href={`tel:${COMPANY_INFO.phone}`} className="font-bold text-[#222222] hover:underline">{COMPANY_INFO.phoneDisplay}</a>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={whatsappInquiryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Agent</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onScheduleVisit(property.title);
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#F36B21] hover:bg-[#D95813] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-md shadow-[#F36B21]/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Site Visit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
