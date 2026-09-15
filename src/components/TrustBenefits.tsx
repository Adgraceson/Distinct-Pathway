import React from 'react';
import { MapPin, ShieldCheck, TrendingUp, ArrowUpRight } from 'lucide-react';

export const TrustBenefits: React.FC = () => {
  const benefits = [
    {
      id: 'prime-locations',
      title: 'Prime Locations',
      description: 'We connect you with properties in desirable and developing locations.',
      icon: MapPin,
      highlight: 'Strategic Growth Corridors'
    },
    {
      id: 'secure-investments',
      title: 'Secure Investments',
      description: 'We prioritise properly documented and carefully verified opportunities.',
      icon: ShieldCheck,
      highlight: 'Verified Documentation'
    },
    {
      id: 'great-returns',
      title: 'Great Returns',
      description: 'Discover properties with strong potential for long-term value and returns.',
      icon: TrendingUp,
      highlight: 'Long-term Capital Growth'
    }
  ];

  return (
    <section className="py-14 sm:py-18 bg-[#F8F7F4] border-b border-[#E7E7E7]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0E8] border border-[#F36B21]/20 text-[#F36B21] text-xs font-semibold uppercase tracking-wider mb-3">
            The Distinct Standard
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#222222] tracking-tight font-sans">
            Guiding Your Ghanaian Real Estate Journey
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#555555]">
            We bridge the gap between discerning property seekers and authentic, well-positioned real estate opportunities across Greater Accra.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.id}
                className="group relative bg-white rounded-2xl p-7 sm:p-8 border border-[#E7E7E7] shadow-sm hover:shadow-xl hover:border-[#F36B21]/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon container */}
                  <div className="w-14 h-14 rounded-2xl bg-[#FFF0E8] border border-[#F36B21]/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#F36B21] transition-all duration-300">
                    <Icon className="w-7 h-7 text-[#F36B21] group-hover:text-white stroke-[2] transition-colors duration-300" />
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#F36B21] mb-1.5 block">
                    {benefit.highlight}
                  </span>

                  <h3 className="text-xl font-bold text-[#222222] mb-3 group-hover:text-[#F36B21] transition-colors duration-200">
                    {benefit.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E7E7E7]/60 flex items-center justify-between text-xs font-semibold text-[#222222]">
                  <span>Explore opportunities</span>
                  <ArrowUpRight className="w-4 h-4 text-[#F36B21] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
