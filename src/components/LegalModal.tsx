import React, { useState } from 'react';
import { X, Shield, FileText } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms';
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E7E7E7] max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-black transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Switcher */}
        <div className="flex gap-2 border-b border-[#E7E7E7] pb-4 mb-4">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
              activeTab === 'privacy'
                ? 'bg-[#F36B21] text-white'
                : 'text-[#555555] hover:bg-[#F8F7F4]'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
              activeTab === 'terms'
                ? 'bg-[#F36B21] text-white'
                : 'text-[#555555] hover:bg-[#F8F7F4]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Terms & Conditions</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto space-y-4 text-xs sm:text-sm text-[#555555] leading-relaxed pr-1 flex-1">
          {activeTab === 'privacy' ? (
            <div className="space-y-3">
              <h4 className="text-base font-bold text-[#222222]">
                Privacy Notice for Distinct Pathway Real Estates
              </h4>
              <p>
                Distinct Pathway Real Estates is committed to safeguarding the personal details and privacy of our visitors, property buyers, tenants, and investors in Ghana and abroad.
              </p>
              <h5 className="font-bold text-[#222222]">1. Information Collected</h5>
              <p>
                We collect information you explicitly submit through our contact forms, site visit schedules, or WhatsApp inquiries, including full names, telephone numbers, email addresses, and property requirements.
              </p>
              <h5 className="font-bold text-[#222222]">2. How Your Data is Handled</h5>
              <p>
                Submitted information is utilized solely to facilitate property matches, coordinate scheduled site visits, conduct official documentation reviews, and communicate transparent progress regarding your real estate interest. We do not sell or lease client data to third-party marketers.
              </p>
              <h5 className="font-bold text-[#222222]">3. Confidentiality</h5>
              <p>
                All investor transactions, financial ranges, and private personal communications remain confidential within Distinct Pathway Real Estates.
              </p>
              <p className="text-[11px] text-gray-400 pt-2">
                For questions regarding data processing, email: {COMPANY_INFO.email}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <h4 className="text-base font-bold text-[#222222]">
                Terms & Conditions of Service
              </h4>
              <p>
                By utilizing the Distinct Pathway Real Estates website and engaging our property services, you agree to the following terms:
              </p>
              <h5 className="font-bold text-[#222222]">1. Listing Information & Verification</h5>
              <p>
                Property descriptions, prices (quoted in Ghana Cedis GH₵), dimensions, and imagery represent current sample and verified inventory. Final boundary demarcations, cadastral surveys, and leasehold terms are confirmed directly during official site inspections and Lands Commission searches.
              </p>
              <h5 className="font-bold text-[#222222]">2. Site Inspections</h5>
              <p>
                Clients participating in guided site visits are escorted by authorised Distinct Pathway field agents. We encourage buyers to conduct independent due diligence, boundary beacon verifications, and legal consultations prior to completing property acquisitions.
              </p>
              <h5 className="font-bold text-[#222222]">3. Currency & Pricing</h5>
              <p>
                All standard pricing on this website is quoted in Ghana Cedis (GH₵). Any currency conversions or diaspora financing are calculated based on prevailing interbank settlement rates.
              </p>
              <h5 className="font-bold text-[#222222]">4. Intellectual Property</h5>
              <p>
                All branding, typography, photography arrangements, and layout belong to Distinct Pathway Real Estates.
              </p>
            </div>
          )}
        </div>

        <div className="pt-4 mt-2 border-t border-[#E7E7E7] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#222222] hover:bg-black text-white px-5 py-2 rounded-xl text-xs font-semibold transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
