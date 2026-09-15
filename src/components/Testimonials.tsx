import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Info } from 'lucide-react';
import { SAMPLE_TESTIMONIALS } from '../data/testimonials';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % SAMPLE_TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + SAMPLE_TESTIMONIALS.length) % SAMPLE_TESTIMONIALS.length);
  };

  const current = SAMPLE_TESTIMONIALS[currentIndex];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#E7E7E7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0E8] border border-[#F36B21]/20 text-[#F36B21] text-xs font-semibold uppercase tracking-wider mb-3">
            Client Experience Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight font-sans">
            Client Perspectives & Journey Stories
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#555555]">
            How Distinct Pathway supports home acquisitions, serviced plot purchases, and commercial leasing across Ghana.
          </p>

          {/* Explicit note indicating sample content */}
          <div className="mt-4 inline-flex items-center gap-2 bg-[#F8F7F4] border border-[#E7E7E7] text-xs text-[#555555] px-4 py-1.5 rounded-full">
            <Info className="w-3.5 h-3.5 text-[#F36B21]" />
            <span>Sample client experience scenarios (Replace with verified client reviews upon go-live)</span>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-[#F8F7F4] rounded-3xl p-8 sm:p-12 border border-[#E7E7E7] shadow-sm relative">
            <Quote className="w-16 h-16 text-[#F36B21]/15 absolute top-6 right-8 pointer-events-none" />

            <div className="space-y-6">
              {/* Rating stars */}
              <div className="flex items-center gap-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-bold text-[#222222] ml-2">
                  5.0 Rating
                </span>
              </div>

              {/* Quote text */}
              <p className="text-lg sm:text-xl text-[#222222] font-medium leading-relaxed italic">
                "{current.content}"
              </p>

              {/* Property involved */}
              <div className="inline-block bg-white px-3 py-1.5 rounded-lg border border-[#E7E7E7] text-xs font-semibold text-[#F36B21]">
                Transaction: {current.propertyAcquired}
              </div>

              {/* Author details */}
              <div className="pt-4 border-t border-[#E7E7E7] flex items-center gap-4">
                <img
                  src={current.avatarUrl}
                  alt={current.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h4 className="text-base font-bold text-[#222222]">
                    {current.author}
                  </h4>
                  <p className="text-xs text-[#555555]">
                    {current.role} • {current.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6 px-2">
            <div className="flex items-center gap-2">
              {SAMPLE_TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === idx ? 'w-8 bg-[#F36B21]' : 'w-2.5 bg-[#DDE3E7]'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-xl bg-white border border-[#E7E7E7] text-[#222222] hover:bg-[#F36B21] hover:text-white transition-colors shadow-xs"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-xl bg-white border border-[#E7E7E7] text-[#222222] hover:bg-[#F36B21] hover:text-white transition-colors shadow-xs"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
