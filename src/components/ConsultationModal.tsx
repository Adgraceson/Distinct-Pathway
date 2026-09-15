import React, { useState } from 'react';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Building2 
} from 'lucide-react';
import { ConsultationFormData } from '../types';
import { COMPANY_INFO } from '../data/companyInfo';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPropertyTitle?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultPropertyTitle,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredTime: 'Morning (9:00 AM - 12:00 PM)',
    consultationType: defaultPropertyTitle ? 'Site Visit' : 'Office Consultation',
    propertyOfInterest: defaultPropertyTitle || '',
    notes: '',
    consent: true,
    honeypot: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMessage('Please enter your full name and phone number.');
      setStatus('error');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage('');

    const formspreeEndpoint = COMPANY_INFO.formspreeEndpoint || 'https://formspree.io/f/myeyrvev';

    const formspreePayload: Record<string, any> = {
      name: formData.fullName,
      phone: formData.phone,
      consultationType: formData.consultationType,
      preferredDate: formData.preferredDate || 'Earliest Available',
      preferredTime: formData.preferredTime || 'Morning',
      propertyOfInterest: formData.propertyOfInterest || 'General Portfolio',
      notes: formData.notes || 'None',
      _subject: `[Distinct Pathway Real Estates] New Site Visit / Booking from ${formData.fullName} (${formData.phone})`,
    };

    if (formData.email && formData.email.trim()) {
      formspreePayload.email = formData.email.trim();
      formspreePayload._replyto = formData.email.trim();
    }

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

      // 2. Also send to local backend server
      const localApiPromise = fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).catch((e) => {
        console.warn('Local API consultation route not reachable:', e);
        return null;
      });

      const formspreeRes = await formspreePromise;
      if (formspreeRes.ok) {
        setStatus('success');
      } else {
        const localRes = await localApiPromise;
        if (localRes && localRes.ok) {
          setStatus('success');
        } else {
          const errData = await formspreeRes.json().catch(() => ({}));
          setStatus('error');
          setErrorMessage(errData.error || 'Failed to submit consultation request. Please reach us directly via phone or WhatsApp.');
        }
      }
    } catch (err) {
      console.error('Submission error:', err);
      // Fallback to local server or mark completed
      try {
        const res = await fetch('/api/consultation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setStatus('success');
          return;
        }
      } catch (innerErr) {
        console.error('Fallback error:', innerErr);
      }
      setStatus('error');
      setErrorMessage('Network connection error. Please call +233 54 483 3556 or reach out via WhatsApp to confirm your site visit.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#E7E7E7] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-black transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0E8] text-[#F36B21] text-xs font-bold uppercase tracking-wider mb-2">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Consultation & Site Visit Scheduling</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#222222]">
            Book a Professional Session
          </h3>
          <p className="text-xs sm:text-sm text-[#555555] mt-1">
            Meet with an experienced Distinct Pathway advisor at our Tema-Ashaiman office, on-site at a property, or via phone/WhatsApp.
          </p>
        </div>

        {status === 'success' ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-[#222222]">
              Consultation Requested!
            </h4>
            <p className="text-sm text-[#555555] max-w-md mx-auto">
              Thank you, <span className="font-semibold text-[#222222]">{formData.fullName}</span>. An agent will contact you on <span className="font-semibold text-[#222222]">{formData.phone}</span> to confirm your appointment timing.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="bg-[#222222] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-black transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form 
            action={COMPANY_INFO.formspreeEndpoint} 
            method="POST" 
            onSubmit={handleSubmit} 
            className="space-y-4"
          >
            <input type="hidden" name="_subject" value={`[Distinct Pathway Real Estates] New Site Visit / Booking from ${formData.fullName || 'Client'}`} />
            {status === 'error' && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#222222]">
                  Full Name <span className="text-[#F36B21]">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Kwame Mensah"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#F8F7F4] border border-[#E7E7E7] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#222222] focus:outline-none focus:border-[#F36B21]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#222222]">
                  Phone / WhatsApp <span className="text-[#F36B21]">*</span>
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="+233 54 483 3556"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#F8F7F4] border border-[#E7E7E7] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#222222] focus:outline-none focus:border-[#F36B21]"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#222222]">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="you@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#F8F7F4] border border-[#E7E7E7] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#222222] focus:outline-none focus:border-[#F36B21]"
              />
            </div>

            {/* Consultation Type */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#222222]">Type of Consultation</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'Site Visit', label: 'Site Inspection' },
                  { id: 'Office Consultation', label: 'Office Meeting' },
                  { id: 'WhatsApp Call', label: 'WhatsApp / Phone' },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, consultationType: type.id as any })}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      formData.consultationType === type.id
                        ? 'bg-[#FFF0E8] border-[#F36B21] text-[#F36B21]'
                        : 'bg-[#F8F7F4] border-[#E7E7E7] text-[#222222] hover:bg-[#DDE3E7]/40'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#222222]">Preferred Date</label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-[#F8F7F4] border border-[#E7E7E7] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#222222] focus:outline-none focus:border-[#F36B21]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#222222]">Preferred Time Window</label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full bg-[#F8F7F4] border border-[#E7E7E7] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#222222] focus:outline-none focus:border-[#F36B21]"
                >
                  <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                  <option value="Afternoon (12:00 PM - 3:00 PM)">Afternoon (12:00 PM - 3:00 PM)</option>
                  <option value="Late Afternoon (3:00 PM - 5:00 PM)">Late Afternoon (3:00 PM - 5:00 PM)</option>
                  <option value="Weekend Saturday">Saturday Morning Slot</option>
                </select>
              </div>
            </div>

            {/* Property of interest */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#222222]">Property or Service of Interest</label>
              <input
                name="propertyOfInterest"
                type="text"
                placeholder="e.g. Serviced Residential Plots in Prampram"
                value={formData.propertyOfInterest}
                onChange={(e) => setFormData({ ...formData, propertyOfInterest: e.target.value })}
                className="w-full bg-[#F8F7F4] border border-[#E7E7E7] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#222222] focus:outline-none focus:border-[#F36B21]"
              />
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#222222]">Additional Notes (Optional)</label>
              <textarea
                name="notes"
                rows={2}
                placeholder="Number of persons attending, transport requirements, or specific documents needed..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-[#F8F7F4] border border-[#E7E7E7] rounded-xl p-3 text-xs sm:text-sm text-[#222222] focus:outline-none focus:border-[#F36B21]"
              ></textarea>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#F36B21] hover:bg-[#D95813] text-white py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-60 shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Confirming...</span>
                  </>
                ) : (
                  <span>Confirm Appointment Request</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
