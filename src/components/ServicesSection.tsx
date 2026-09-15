import React, { useState } from 'react';
import { 
  Landmark, 
  Home, 
  Building2, 
  TrendingUp, 
  Megaphone, 
  SearchCheck, 
  Compass, 
  FileCheck, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare,
  X
} from 'lucide-react';
import { SERVICES_DATA } from '../data/services';
import { ServiceItem } from '../types';
import { getWhatsAppLink } from '../data/companyInfo';

interface ServicesSectionProps {
  onSelectServiceForContact: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForContact }) => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  // Icon mapping
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Landmark':
        return <Landmark className="w-6 h-6 text-[#F36B21]" />;
      case 'Home':
        return <Home className="w-6 h-6 text-[#F36B21]" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-[#F36B21]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-[#F36B21]" />;
      case 'Megaphone':
        return <Megaphone className="w-6 h-6 text-[#F36B21]" />;
      case 'SearchCheck':
        return <SearchCheck className="w-6 h-6 text-[#F36B21]" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#F36B21]" />;
      case 'FileCheck':
        return <FileCheck className="w-6 h-6 text-[#F36B21]" />;
      default:
        return <Building2 className="w-6 h-6 text-[#F36B21]" />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-white border-b border-[#E7E7E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0E8] border border-[#F36B21]/20 text-[#F36B21] text-xs font-semibold uppercase tracking-wider mb-3">
            What We Do
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight font-sans">
            Comprehensive Real Estate Services in Ghana
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#555555]">
            From land acquisition and title verification to commercial leases and portfolio advisory, Distinct Pathway supports you at every milestone.
          </p>
        </div>

        {/* Services 8-card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="group bg-[#F8F7F4] hover:bg-white rounded-2xl p-6 border border-[#E7E7E7] hover:border-[#F36B21]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Icon wrapper */}
                <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-[#FFF0E8] border border-[#E7E7E7] group-hover:border-[#F36B21]/30 flex items-center justify-center mb-5 transition-colors duration-200 shadow-xs">
                  {renderIcon(service.iconName)}
                </div>

                <h3 className="text-lg font-bold text-[#222222] group-hover:text-[#F36B21] transition-colors duration-150 mb-2">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-4">
                  {service.shortDesc}
                </p>

                {/* Key Benefits List */}
                <div className="space-y-1.5 pt-2 border-t border-[#E7E7E7]/60">
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] font-medium text-[#222222]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F36B21] shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Details Trigger */}
              <div className="pt-5 mt-4 border-t border-[#E7E7E7]/60 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalService(service)}
                  className="text-xs font-bold text-[#222222] hover:text-[#F36B21] flex items-center gap-1 group-hover:gap-1.5 transition-all"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F36B21]" />
                </button>

                <button
                  onClick={() => onSelectServiceForContact(service.title)}
                  className="text-[11px] font-semibold text-[#F36B21] hover:underline"
                >
                  Inquire
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner callout */}
        <div className="mt-12 bg-gradient-to-r from-[#222222] to-[#333333] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold">Have a Specific Real Estate Requirement?</h3>
            <p className="text-xs sm:text-sm text-[#DDE3E7]">
              Our bespoke property sourcing specialists can locate verified parcels and buildings not listed publicly.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={getWhatsAppLink("Hello Distinct Pathway Real Estates, I have a custom property request I would like to discuss.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F36B21] hover:bg-[#D95813] text-white px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-colors shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discuss Custom Requirement</span>
            </a>
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E7E7E7] relative">
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-[#FFF0E8] flex items-center justify-center mb-4">
              {renderIcon(activeModalService.iconName)}
            </div>

            <h3 className="text-xl font-bold text-[#222222] mb-2">
              {activeModalService.title}
            </h3>

            <p className="text-sm text-[#555555] leading-relaxed mb-6">
              {activeModalService.fullDesc}
            </p>

            <div className="bg-[#F8F7F4] p-4 rounded-xl border border-[#E7E7E7] mb-6">
              <h4 className="text-xs font-bold text-[#222222] uppercase tracking-wider mb-2">
                What this service includes:
              </h4>
              <ul className="space-y-1.5">
                {activeModalService.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs font-medium text-[#222222]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#F36B21]" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  const sTitle = activeModalService.title;
                  setActiveModalService(null);
                  onSelectServiceForContact(sTitle);
                }}
                className="flex-1 bg-[#F36B21] hover:bg-[#D95813] text-white py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-colors"
              >
                Inquire About This Service
              </button>
              <button
                onClick={() => setActiveModalService(null)}
                className="py-2.5 px-4 rounded-xl border border-[#E7E7E7] text-xs sm:text-sm font-semibold text-[#222222] hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
