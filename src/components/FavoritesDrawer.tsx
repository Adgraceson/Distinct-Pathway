import React from 'react';
import { X, Trash2, ArrowRight, MessageCircle, Heart } from 'lucide-react';
import { Property } from '../types';
import { getWhatsAppLink } from '../data/companyInfo';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  allProperties: Property[];
  onRemoveFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  allProperties,
  onRemoveFavorite,
  onSelectProperty,
}) => {
  if (!isOpen) return null;

  const savedList = allProperties.filter((p) => favorites.includes(p.id));

  const handleEnquireAll = () => {
    const titles = savedList.map((p) => p.title).join(', ');
    const msg = `Hello Distinct Pathway Real Estates, I have saved the following properties to my wishlist: ${titles}. I would like more information.`;
    window.open(getWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#E7E7E7]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="p-5 border-b border-[#E7E7E7] flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FFF0E8] flex items-center justify-center text-[#F36B21]">
              <Heart className="w-4 h-4 fill-[#F36B21]" />
            </div>
            <div>
              <h3 className="font-bold text-[#222222] text-base">Saved Properties</h3>
              <p className="text-[11px] text-[#555555]">{savedList.length} items saved in your shortlist</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="overflow-y-auto p-5 space-y-4 flex-1">
          {savedList.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#F8F7F4] flex items-center justify-center mx-auto text-gray-400">
                <Heart className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-[#222222]">Your Shortlist is Empty</p>
              <p className="text-xs text-[#555555] max-w-xs mx-auto">
                Click the heart icon on any land, home, or commercial listing to save it here for comparison.
              </p>
            </div>
          ) : (
            savedList.map((prop) => (
              <div
                key={prop.id}
                className="bg-[#F8F7F4] rounded-2xl p-3 border border-[#E7E7E7] flex gap-3 group relative hover:border-[#F36B21]/30 transition-all"
              >
                <div 
                  className="w-20 h-20 rounded-xl overflow-hidden shrink-0 cursor-pointer"
                  onClick={() => {
                    onClose();
                    onSelectProperty(prop);
                  }}
                >
                  <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#F36B21] uppercase block">
                      {prop.category}
                    </span>
                    <h4 
                      onClick={() => {
                        onClose();
                        onSelectProperty(prop);
                      }}
                      className="text-xs font-bold text-[#222222] truncate cursor-pointer hover:text-[#F36B21]"
                    >
                      {prop.title}
                    </h4>
                    <p className="text-[11px] text-[#555555] truncate">{prop.location}</p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-extrabold text-[#222222]">
                      {prop.priceFormatted}
                    </span>

                    <button
                      onClick={() => onRemoveFavorite(prop.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Remove from shortlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {savedList.length > 0 && (
          <div className="p-5 border-t border-[#E7E7E7] bg-white space-y-2">
            <button
              onClick={handleEnquireAll}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enquire About All Saved ({savedList.length}) on WhatsApp</span>
            </button>
            <button
              onClick={onClose}
              className="w-full bg-[#F8F7F4] hover:bg-[#DDE3E7] text-[#222222] py-2.5 rounded-xl font-semibold text-xs transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
