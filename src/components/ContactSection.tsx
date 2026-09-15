import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  ShieldCheck,
  Building,
  Loader2
} from 'lucide-react';
import { COMPANY_INFO, getWhatsAppLink } from '../data/companyInfo';
import { ContactFormData } from '../types';

interface ContactSectionProps {
  preselectedService?: string;
  preselectedProperty?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  preselectedService,
  preselectedProperty,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    phone: '',
    email: '',
    propertyInterest: preselectedProperty || preselectedService || 'General Inquiry',
    preferredLocation: '',
    budgetRange: 'Under GH₵ 100,000',
    subject: preselectedProperty ? `Inquiry regarding ${preselectedProperty}` : '',
    message: '',
    preferredContactMethod: 'WhatsApp',
    consent: true,
    honeypot: '', // spam trap field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Form input validation
  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required.';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Telephone or WhatsApp number is required.';
    } else {
      // Validate Ghanaian and international phone numbers
      // Ghanaian formats: 024..., 054..., 020..., +233...
      const phoneClean = formData.phone.replace(/[\s\-()]/g, '');
      const phoneRegex = /^(\+?\d{9,15})$/;
      if (!phoneRegex.test(phoneClean)) {
        errors.phone = 'Please enter a valid phone number (e.g. +233 54 483 3556 or 054 483 3556).';
      }
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = 'Please provide a valid email address.';
      }
    }

    if (!formData.message.trim()) {
      errors.message = 'Please provide details about your property requirements.';
    }

    if (!formData.consent) {
      errors.consent = 'You must agree to be contacted by our team.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check for spam bots
    if (formData.honeypot && formData.honeypot.trim().length > 0) {
      console.warn('Honeypot triggered');
      setSubmitStatus('success');
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Prepare Formspree submission payload
    const formspreePayload = {
      name: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      propertyInterest: formData.propertyInterest,
      preferredLocation: formData.preferredLocation || 'Flexible / Not Specified',
      budgetRange: formData.budgetRange,
      subject: formData.subject || `Property Inquiry from ${formData.fullName}`,
      message: formData.message,
      preferredContactMethod: formData.preferredContactMethod,
      _replyto: formData.email,
      _subject: `[Distinct Pathway Real Estates] New Inquiry from ${formData.fullName} (${formData.phone})`,
    };

    const formspreeEndpoint = COMPANY_INFO.formspreeEndpoint || 'https://formspree.io/f/myeyrvev';

    try {
      // 1. Submit directly to Formspree backend
      const formspreePromise = fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formspreePayload),
      });

      // 2. Also send to local backend server if available
      const localApiPromise = fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).catch((e) => {
        console.warn('Local API contact route not reachable or error:', e);
        return null;
      });

      // Await Formspree response
      const formspreeRes = await formspreePromise;

      if (formspreeRes.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          propertyInterest: 'General Inquiry',
          preferredLocation: '',
          budgetRange: 'Under GH₵ 100,000',
          subject: '',
          message: '',
          preferredContactMethod: 'WhatsApp',
          consent: true,
          honeypot: '',
        });
      } else {
        // Parse Formspree error if any
        const errData = await formspreeRes.json().catch(() => ({}));
        console.warn('Formspree response not ok:', errData);
        // If local API also succeeded, we can treat it as submitted
        const localRes = await localApiPromise;
        if (localRes && localRes.ok) {
          setSubmitStatus('success');
        } else {
          setSubmitStatus('error');
          setErrorMessage(errData.error || 'Failed to submit form to backend. Please reach us directly via WhatsApp or phone.');
        }
      }
    } catch (err) {
      console.error('Submission error:', err);
      // Try local API fallback
      try {
        const localRes = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (localRes.ok) {
          setSubmitStatus('success');
          return;
        }
      } catch (innerErr) {
        console.error('Local fallback error:', innerErr);
      }
      // If offline or blocked by browser extensions, display guidance with WhatsApp
      setSubmitStatus('error');
      setErrorMessage('Network connection error. Please tap WhatsApp or call +233 54 483 3556 to submit your message directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const propertyOptions = [
    'General Inquiry',
    'Land for Sale',
    'House for Sale',
    'Apartment for Rent',
    'Commercial Property',
    'Investment Property',
    'Newly Built Home',
    'Custom Property Sourcing',
    'Documentation & Land Search',
    'Schedule Site Inspection',
  ];

  const budgetOptions = [
    'Under GH₵ 100,000',
    'GH₵ 100,000 - GH₵ 500,000',
    'GH₵ 500,000 - GH₵ 1,500,000',
    'GH₵ 1,500,000 - GH₵ 3,000,000',
    'Above GH₵ 3,000,000',
    'Flexible / Seeking Rental',
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white border-b border-[#E7E7E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0E8] border border-[#F36B21]/20 text-[#F36B21] text-xs font-semibold uppercase tracking-wider mb-3">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight font-sans">
            Connect with Distinct Pathway Real Estates
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#555555]">
            Have a question about a parcel of land, looking to buy a modern home, or need commercial space in Ghana? Send us a message or contact our office directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#F8F7F4] rounded-3xl p-6 sm:p-9 border border-[#E7E7E7] shadow-sm">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-[#222222]">
                Send Us a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] mt-1">
                Fields marked with <span className="text-[#F36B21] font-bold">*</span> are required. Submissions are routed directly to our management team.
              </p>
            </div>

            {/* Success Banner */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3.5 animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold">Message Delivered Successfully!</h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Thank you for reaching out to Distinct Pathway Real Estates. A dedicated property consultant will review your specifications and contact you via your preferred channel promptly.
                  </p>
                  <p className="text-[11px] text-emerald-700 mt-2 font-medium">
                    Need instant response? Feel free to tap our WhatsApp link below.
                  </p>
                </div>
              </div>
            )}

            {/* Error Banner */}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold">Unable to Send Message</h4>
                  <p className="text-xs text-red-700 mt-0.5">{errorMessage}</p>
                </div>
              </div>
            )}

            <form 
              action={COMPANY_INFO.formspreeEndpoint} 
              method="POST" 
              onSubmit={handleSubmit} 
              noValidate 
              className="space-y-4"
            >
              <input 
                type="hidden" 
                name="_subject" 
                value={`[Distinct Pathway Real Estates] New Inquiry from ${formData.fullName || 'Client'} (${formData.phone || 'N/A'})`} 
              />
              <input 
                type="hidden" 
                name="_replyto" 
                value={formData.email} 
              />
              {/* Spam Honeypot Trap - Hidden from normal users */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website_trap">Leave this blank</label>
                <input
                  type="text"
                  id="website_trap"
                  name="website_trap"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Row 1: Full Name & Telephone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="form-fullName" className="text-xs font-bold text-[#222222] flex items-center gap-1">
                    Full Name <span className="text-[#F36B21]">*</span>
                  </label>
                  <input
                    id="form-fullName"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Kwame Mensah"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full bg-white border ${
                      validationErrors.fullName ? 'border-red-500' : 'border-[#E7E7E7]'
                    } rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#222222] focus:outline-none focus:border-[#F36B21]`}
                  />
                  {validationErrors.fullName && (
                    <span className="text-[11px] text-red-500 font-medium block">
                      {validationErrors.fullName}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="form-phone" className="text-xs font-bold text-[#222222] flex items-center gap-1">
                    Telephone or WhatsApp <span className="text-[#F36B21]">*</span>
                  </label>
                  <input
                    id="form-phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="e.g. +233 54 483 3556 or 054 483 3556"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full bg-white border ${
                      validationErrors.phone ? 'border-red-500' : 'border-[#E7E7E7]'
                    } rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#222222] focus:outline-none focus:border-[#F36B21]`}
                  />
                  {validationErrors.phone && (
                    <span className="text-[11px] text-red-500 font-medium block">
                      {validationErrors.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* Row 2: Email & Property Interest */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="form-email" className="text-xs font-bold text-[#222222] flex items-center gap-1">
                    Email Address <span className="text-[#F36B21]">*</span>
                  </label>
                  <input
                    id="form-email"
                    name="email"
                    type="email"
                    required
                    placeholder="e.g. yourname@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full bg-white border ${
                      validationErrors.email ? 'border-red-500' : 'border-[#E7E7E7]'
                    } rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#222222] focus:outline-none focus:border-[#F36B21]`}
                  />
                  {validationErrors.email && (
                    <span className="text-[11px] text-red-500 font-medium block">
                      {validationErrors.email}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="form-propertyInterest" className="text-xs font-bold text-[#222222] block">
                    Property Interest
                  </label>
                  <select
                    id="form-propertyInterest"
                    name="propertyInterest"
                    value={formData.propertyInterest}
                    onChange={(e) => setFormData({ ...formData, propertyInterest: e.target.value })}
                    className="w-full bg-white border border-[#E7E7E7] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#222222] focus:outline-none focus:border-[#F36B21]"
                  >
                    {propertyOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Preferred Location & Budget Range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="form-location" className="text-xs font-bold text-[#222222] block">
                    Preferred Location
                  </label>
                  <input
                    id="form-location"
                    name="preferredLocation"
                    type="text"
                    placeholder="e.g. Tema, Ashaiman, Prampram, Cantonments"
                    value={formData.preferredLocation}
                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                    className="w-full bg-white border border-[#E7E7E7] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#222222] focus:outline-none focus:border-[#F36B21]"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="form-budgetRange" className="text-xs font-bold text-[#222222] block">
                    Budget Range
                  </label>
                  <select
                    id="form-budgetRange"
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full bg-white border border-[#E7E7E7] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#222222] focus:outline-none focus:border-[#F36B21]"
                  >
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Subject */}
              <div className="space-y-1">
                <label htmlFor="form-subject" className="text-xs font-bold text-[#222222] block">
                  Subject
                </label>
                <input
                  id="form-subject"
                  name="subject"
                  type="text"
                  placeholder="e.g. Inquiring about Prampram residential plots"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-white border border-[#E7E7E7] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#222222] focus:outline-none focus:border-[#F36B21]"
                />
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label htmlFor="form-message" className="text-xs font-bold text-[#222222] flex items-center gap-1">
                  Message Details <span className="text-[#F36B21]">*</span>
                </label>
                <textarea
                  id="form-message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Please describe what you are looking for, your planned timeline, and any specific questions you have..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full bg-white border ${
                    validationErrors.message ? 'border-red-500' : 'border-[#E7E7E7]'
                  } rounded-xl p-3 text-xs sm:text-sm text-[#222222] focus:outline-none focus:border-[#F36B21]`}
                ></textarea>
                {validationErrors.message && (
                  <span className="text-[11px] text-red-500 font-medium block">
                    {validationErrors.message}
                  </span>
                )}
              </div>

              {/* Preferred Contact Method */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-bold text-[#222222] block">
                  Preferred Contact Method
                </label>
                <div className="flex items-center gap-4">
                  {(['WhatsApp', 'Phone', 'Email'] as const).map((method) => (
                    <label key={method} className="flex items-center gap-2 text-xs text-[#222222] cursor-pointer">
                      <input
                        type="radio"
                        name="preferredContactMethod"
                        value={method}
                        checked={formData.preferredContactMethod === method}
                        onChange={() => setFormData({ ...formData, preferredContactMethod: method })}
                        className="text-[#F36B21] focus:ring-[#F36B21] accent-[#F36B21]"
                      />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 rounded text-[#F36B21] focus:ring-[#F36B21] accent-[#F36B21]"
                  />
                  <span className="text-xs text-[#555555] leading-normal">
                    I agree to be contacted by Distinct Pathway Real Estates regarding this property inquiry and understand my information is treated confidentially.
                  </span>
                </label>
                {validationErrors.consent && (
                  <span className="text-[11px] text-red-500 font-medium block mt-1">
                    {validationErrors.consent}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  id="contact-submit-btn"
                  disabled={isSubmitting}
                  className="w-full bg-[#F36B21] hover:bg-[#D95813] text-white py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#F36B21]/20 hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed active:scale-98"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Contact Details & Map */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact Info Card */}
            <div className="bg-[#222222] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#DDE3E7] font-semibold">
                    Direct Contact
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1">
                    Our Information
                  </h3>
                  <p className="text-xs sm:text-sm text-[#DDE3E7] mt-1">
                    Reach us during business hours or message us anytime on WhatsApp.
                  </p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  {/* Phone */}
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="flex items-start gap-3.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#F36B21] text-white flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 block font-medium">Telephone Call</span>
                      <span className="font-bold text-white group-hover:text-[#F36B21] transition-colors">
                        {COMPANY_INFO.phoneDisplay}
                      </span>
                    </div>
                  </a>

                  {/* WhatsApp Direct */}
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 block font-medium">WhatsApp Chat</span>
                      <span className="font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {COMPANY_INFO.whatsappDisplay}
                      </span>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="flex items-start gap-3.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#F36B21] text-white flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 block font-medium">Official Email</span>
                      <span className="font-bold text-white group-hover:text-[#F36B21] transition-colors break-all">
                        {COMPANY_INFO.email}
                      </span>
                    </div>
                  </a>

                  {/* Office Location */}
                  <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/5">
                    <div className="w-9 h-9 rounded-lg bg-[#F36B21] text-white flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 block font-medium">Office Location</span>
                      <span className="font-bold text-white">
                        {COMPANY_INFO.officeLocation}
                      </span>
                      <span className="text-xs text-gray-400 block mt-0.5">
                        {COMPANY_INFO.fullAddress}
                      </span>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/5">
                    <div className="w-9 h-9 rounded-lg bg-[#F36B21] text-white flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 block font-medium">Business Hours</span>
                      <span className="font-bold text-white">
                        {COMPANY_INFO.businessHours}
                      </span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Quick Button CTA */}
                <div className="pt-2">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat With Distinct Pathway on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="bg-[#F8F7F4] rounded-3xl p-4 border border-[#E7E7E7] shadow-sm">
              <div className="flex items-center justify-between px-2 pb-3">
                <span className="text-xs font-bold text-[#222222] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#F36B21]" />
                  Office Vicinity ({COMPANY_INFO.officeLocation})
                </span>
                <a
                  href="https://maps.google.com/?q=Ashaiman+Tema+Ghana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#F36B21] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-[#E7E7E7] bg-gray-200">
                <iframe
                  title="Distinct Pathway Real Estates Office Location"
                  src={COMPANY_INFO.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
