import React, { useState } from 'react';
import { 
  Building, 
  CheckCircle, 
  Users, 
  MapPin, 
  ArrowRight, 
  Award, 
  FileCheck2, 
  X 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';

interface AboutSectionProps {
  onOpenConsultation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenConsultation }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-b border-[#E7E7E7]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Imagery with CEO Humble Graceson */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E7E7E7] group bg-[#222222]">
              <img
                src={COMPANY_INFO.ceo.image}
                onError={(e) => {
                  e.currentTarget.src = COMPANY_INFO.ceo.localImage;
                }}
                alt={`${COMPANY_INFO.ceo.name} - ${COMPANY_INFO.ceo.title} of Distinct Pathway Real Estates`}
                referrerPolicy="no-referrer"
                className="w-full h-[420px] sm:h-[500px] object-cover object-top group-hover:scale-102 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
              
              {/* Overlay C.E.O Leadership card */}
              <div className="absolute bottom-5 left-5 right-5 p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-xl">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#FFF0E8] border border-[#F36B21]/30 flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6 text-[#F36B21]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-extrabold text-[#222222] tracking-tight">{COMPANY_INFO.ceo.name}</h4>
                      <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-[#F36B21] text-white uppercase tracking-wider shadow-xs">
                        C.E.O & Founder
                      </span>
                    </div>
                    <p className="text-xs text-[#555555] mt-1 font-medium leading-snug">
                      "Dedicated to safeguarding your capital through authentic land documentation and transparent property guidance in Ghana."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="hidden sm:flex absolute -top-5 -right-5 bg-[#222222] text-white p-4 rounded-2xl shadow-xl border-2 border-white items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F36B21] flex items-center justify-center text-white font-black text-base">
                DP
              </div>
              <div>
                <p className="text-xs font-semibold text-[#DDE3E7]">Executive Leadership</p>
                <p className="text-sm font-bold text-white">{COMPANY_INFO.officeLocation}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Heading, Body & Core Mission */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0E8] border border-[#F36B21]/20 text-[#F36B21] text-xs font-semibold uppercase tracking-wider">
              About Our Agency
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight font-sans leading-tight">
              Building Distinct Pathways to Property Ownership
            </h2>

            <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
              Distinct Pathway Real Estates provides reliable property solutions for homebuyers, land buyers, renters and investors. We simplify the property journey by helping clients identify suitable opportunities, understand their options and make confident real-estate decisions.
            </p>

            {/* Key Value Checklist */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#FFF0E8] flex items-center justify-center mt-0.5 shrink-0">
                  <CheckCircle className="w-3.5 h-3.5 text-[#F36B21]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#222222]">Accurate On-the-Ground Property Scouting</h4>
                  <p className="text-xs text-[#555555]">We actively evaluate sites, road connections, and utility access before recommending them.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#FFF0E8] flex items-center justify-center mt-0.5 shrink-0">
                  <CheckCircle className="w-3.5 h-3.5 text-[#F36B21]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#222222]">Guided Site Inspections</h4>
                  <p className="text-xs text-[#555555]">We accompany you on direct site visits so you examine beacons, topography, and amenities firsthand.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#FFF0E8] flex items-center justify-center mt-0.5 shrink-0">
                  <CheckCircle className="w-3.5 h-3.5 text-[#F36B21]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#222222]">Support for Residents & Diaspora Clients</h4>
                  <p className="text-xs text-[#555555]">Transparent updates, video briefings, and coordinated walkthroughs for families in Ghana and abroad.</p>
                </div>
              </div>
            </div>

            {/* Executive Leadership Spotlight */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F7F4] border border-[#E7E7E7] flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img
                src={COMPANY_INFO.ceo.image}
                onError={(e) => {
                  e.currentTarget.src = COMPANY_INFO.ceo.localImage;
                }}
                alt={COMPANY_INFO.ceo.name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-full object-cover object-top border-2 border-[#F36B21] shadow-xs shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-extrabold text-[#222222] tracking-wide">
                    {COMPANY_INFO.ceo.name}
                  </h4>
                  <span className="px-2 py-0.5 rounded-md bg-[#FFF0E8] text-[#F36B21] text-[10px] font-bold uppercase tracking-wider">
                    {COMPANY_INFO.ceo.title}
                  </span>
                </div>
                <p className="text-xs text-[#555555] mt-1 leading-relaxed italic">
                  "{COMPANY_INFO.ceo.bio}"
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                id="about-learn-more-btn"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 bg-[#222222] hover:bg-[#333333] text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4 text-[#F36B21]" />
              </button>

              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 bg-[#FFF0E8] hover:bg-[#F36B21] text-[#F36B21] hover:text-white border border-[#F36B21]/30 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
              >
                <span>Book Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Learn More Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-[#E7E7E7] relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0E8] text-[#F36B21] text-xs font-semibold uppercase mb-4">
              Our Agency Story
            </div>

            <h3 className="text-2xl font-bold text-[#222222] mb-4">
              Distinct Pathway Real Estates
            </h3>

            <div className="space-y-4 text-sm text-[#555555] leading-relaxed">
              <p>
                Founded on the values of transparency, diligence, and personalized attention, Distinct Pathway Real Estates operates from the vibrant industrial and residential gateway of <strong>Tema - Ashaiman</strong>, serving clients across Greater Accra and expanding regions.
              </p>
              <p>
                The Ghanaian real estate landscape offers tremendous growth and capital appreciation opportunities. However, navigating land demarcation, property titles, zoning permits, and tenancy contracts can often be intricate. Our mission is to demystify this process.
              </p>
              
              {/* Executive Leadership Spotlight in Modal */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F7F4] border border-[#E7E7E7] my-4 flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative shrink-0">
                  <img
                    src={COMPANY_INFO.ceo.image}
                    onError={(e) => {
                      e.currentTarget.src = COMPANY_INFO.ceo.localImage;
                    }}
                    alt={COMPANY_INFO.ceo.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl object-cover object-top border-2 border-[#F36B21] shadow-md"
                  />
                  <span className="absolute -bottom-2 -right-2 bg-[#F36B21] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-white shadow-xs">
                    C.E.O
                  </span>
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F36B21]">
                    Leadership & Vision
                  </span>
                  <h4 className="text-base font-extrabold text-[#222222]">
                    {COMPANY_INFO.ceo.name}
                  </h4>
                  <p className="text-xs font-semibold text-[#555555]">
                    {COMPANY_INFO.ceo.title} • Distinct Pathway Real Estates
                  </p>
                  <p className="text-xs text-[#555555] leading-relaxed pt-1 italic">
                    "Navigating real estate in Ghana should be empowering, safe, and transparent. We verify every beacon, cadastral plan, and title document before recommending any property to our clients."
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#E7E7E7] my-4">
                <h4 className="font-bold text-[#222222] mb-2 text-sm flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-[#F36B21]" />
                  Our Core Operational Philosophy
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-[#555555]">
                  <li>Careful preliminary review of cadastral site plans and land deeds</li>
                  <li>In-person verification of property boundaries and beacons</li>
                  <li>Fair market valuations reflecting true local market comparables</li>
                  <li>Clear, honest advice without inflated or speculative promises</li>
                </ul>
              </div>

              <p>
                Whether you are a first-time buyer saving for a starter home, a Ghanaian resident in the diaspora seeking a secure retreat, or a commercial enterprise seeking logistics space near the Tema Port strip, we build a distinct pathway to match your goals.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-[#E7E7E7] flex flex-wrap justify-between items-center gap-4">
              <div className="text-xs text-[#555555]">
                Office: <span className="font-semibold text-[#222222]">{COMPANY_INFO.officeLocation}</span>
              </div>
              <button
                onClick={() => {
                  setModalOpen(false);
                  onOpenConsultation();
                }}
                className="bg-[#F36B21] hover:bg-[#D95813] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                Schedule Meeting with an Agent
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
