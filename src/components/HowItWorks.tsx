import React from 'react';
import { 
  ClipboardList, 
  Search, 
  MapPinCheck, 
  KeyRound, 
  ArrowRight,
  ArrowDown
} from 'lucide-react';

interface HowItWorksProps {
  onStartJourney: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartJourney }) => {
  const steps = [
    {
      number: "01",
      title: "Tell Us What You Need",
      description: "Share your target location, budget range, intended use (residential, land, or commercial), and preferred timeline with our consultants.",
      icon: ClipboardList,
    },
    {
      number: "02",
      title: "Explore Suitable Options",
      description: "Review tailored property presentations with verified dimensions, pricing in Ghana Cedis (GH₵), topography details, and documented status.",
      icon: Search,
    },
    {
      number: "03",
      title: "Schedule a Site Visit",
      description: "Accompany our field agents to physically inspect the property, examine beacons, assess access roads, and review the surrounding neighborhood.",
      icon: MapPinCheck,
    },
    {
      number: "04",
      title: "Complete the Property Process",
      description: "Proceed through structured legal review, title search verification, indenture preparation, and official handover with complete confidence.",
      icon: KeyRound,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#E7E7E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0E8] border border-[#F36B21]/20 text-[#F36B21] text-xs font-semibold uppercase tracking-wider mb-3">
            Simplified Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight font-sans">
            How It Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#555555]">
            A transparent, four-step pathway designed to take you from initial search to documented property ownership smoothly.
          </p>
        </div>

        {/* Steps: Horizontal on Desktop, Vertical on Mobile */}
        <div className="relative">
          {/* Connecting Line on Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-[#E7E7E7] -translate-y-8 z-0"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="bg-[#F8F7F4] lg:bg-white rounded-2xl p-6 sm:p-7 border border-[#E7E7E7] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group"
                >
                  <div>
                    {/* Top Step Number & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-[#FFF0E8] border border-[#F36B21]/30 flex items-center justify-center text-[#F36B21] group-hover:bg-[#F36B21] group-hover:text-white transition-colors duration-200">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-2xl font-black text-[#DDE3E7] group-hover:text-[#F36B21] transition-colors">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#222222] mb-2 group-hover:text-[#F36B21] transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Desktop connector arrow indicator */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex justify-end pt-4 text-[#F36B21]/40 group-hover:text-[#F36B21] transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}

                  {/* Mobile connector indicator */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center pt-3 text-[#F36B21]/50">
                      <ArrowDown className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA underneath */}
        <div className="mt-12 text-center">
          <button
            onClick={onStartJourney}
            className="inline-flex items-center gap-2 bg-[#F36B21] hover:bg-[#D95813] text-white px-7 py-3.5 rounded-xl font-semibold text-sm shadow-md shadow-[#F36B21]/20 hover:shadow-lg transition-all active:scale-98"
          >
            <span>Start Your Property Journey Today</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
