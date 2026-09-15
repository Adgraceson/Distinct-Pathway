import React from 'react';
import { 
  UserCheck, 
  FileCheck, 
  MessagesSquare, 
  MapPinHouse, 
  Route, 
  Scale, 
  ShieldAlert, 
  CheckCircle 
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      id: 'client-focused',
      title: 'Client-Focused Property Solutions',
      description: 'We listen to your personal living, budgeting, or investing goals first, tailoring recommendations specifically to your situation rather than pushing mismatched inventory.',
      icon: UserCheck
    },
    {
      id: 'selected-opportunities',
      title: 'Carefully Selected Opportunities',
      description: 'Every plot, home, and commercial facility in our portfolio undergoes preliminary boundary checks, access road evaluations, and surveyor inspections before presentation.',
      icon: FileCheck
    },
    {
      id: 'clear-communication',
      title: 'Clear & Responsive Communication',
      description: 'We keep you updated at every stage with transparent facts, regular progress calls, WhatsApp photo updates, and straightforward answers without industry jargon.',
      icon: MessagesSquare
    },
    {
      id: 'local-understanding',
      title: 'Local Market Understanding',
      description: 'Headquartered in the Tema - Ashaiman corridor with active operations throughout Greater Accra, we understand micro-market trends, true land values, and developing corridors.',
      icon: MapPinHouse
    },
    {
      id: 'journey-support',
      title: 'Support Throughout the Journey',
      description: 'From your initial inquiry and guided site visits to documentation review, beacon handover, and post-purchase planning, we walk alongside you every step of the way.',
      icon: Route
    },
    {
      id: 'integrity-transparency',
      title: 'Commitment to Integrity & Transparency',
      description: 'We prioritize honest representations, clear disclosure of local infrastructure timelines, and verified ownership records to protect your hard-earned capital.',
      icon: Scale
    }
  ];

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-[#F8F7F4] border-b border-[#E7E7E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0E8] border border-[#F36B21]/20 text-[#F36B21] text-xs font-semibold uppercase tracking-wider mb-3">
            Our Principles
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight font-sans">
            Why Partner with Distinct Pathway Real Estates
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#555555] leading-relaxed">
            Real estate in Ghana requires diligence, clarity, and trusted local guidance. Here is how we create peace of mind for every homebuyer, investor, and business owner.
          </p>
        </div>

        {/* 6 Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.id}
                className="bg-white rounded-2xl p-7 border border-[#E7E7E7] shadow-xs hover:shadow-lg hover:border-[#F36B21]/30 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FFF0E8] border border-[#F36B21]/20 flex items-center justify-center mb-5 group-hover:bg-[#F36B21] transition-colors duration-200">
                    <Icon className="w-6 h-6 text-[#F36B21] group-hover:text-white transition-colors duration-200" />
                  </div>

                  <h3 className="text-lg font-bold text-[#222222] mb-2.5 group-hover:text-[#F36B21] transition-colors">
                    {reason.title}
                  </h3>

                  <p className="text-sm text-[#555555] leading-relaxed">
                    {reason.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-[#E7E7E7]/60 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Distinct Pathway Guarantee of Diligence</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
