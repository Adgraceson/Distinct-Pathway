import React from 'react';
import { PhoneCall, Calendar, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { COMPANY_INFO, getWhatsAppLink } from '../data/companyInfo';

interface CtaSectionProps {
  onRequestSiteVisit: () => void;
  onContactClick: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  onRequestSiteVisit,
  onContactClick,
}) => {
  return (
    <section className="py-16 sm:py-24 bg-[#222222] relative overflow-hidden text-white">
      {/* Background aesthetic shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F36B21]/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#4F713C]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#F36B21] text-xs sm:text-sm font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#F36B21]" />
            <span>Secure Real Estate Solutions in Ghana</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Looking for a Luxurious Haven or a <span className="text-[#F36B21]">Secure Investment?</span>
          </h2>

          {/* Supporting text */}
          <p className="text-base sm:text-xl text-[#DDE3E7] max-w-2xl mx-auto font-normal leading-relaxed">
            Let Distinct Pathway Real Estates help you take the next confident step.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onContactClick}
              className="bg-[#F36B21] hover:bg-[#D95813] text-white px-8 py-4 rounded-xl font-bold text-base shadow-xl shadow-[#F36B21]/30 hover:shadow-2xl transition-all duration-200 active:scale-98 inline-flex items-center gap-2"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onRequestSiteVisit}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-7 py-4 rounded-xl font-bold text-base transition-all duration-200 inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#F36B21]" />
              <span>Request a Site Visit</span>
            </button>
          </div>

          {/* Office Quick Contact Bar */}
          <div className="pt-8 mt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#DDE3E7]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#F36B21]" />
              <span>Office: {COMPANY_INFO.officeLocation}, Greater Accra</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#F36B21]" />
              <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white font-medium underline">
                {COMPANY_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
