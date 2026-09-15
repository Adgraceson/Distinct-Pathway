import React, { useState, useEffect } from 'react';
import { SAMPLE_PROPERTIES } from './data/properties';
import { Property } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBenefits } from './components/TrustBenefits';
import { AboutSection } from './components/AboutSection';
import { FeaturedProperties } from './components/FeaturedProperties';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowItWorks } from './components/HowItWorks';
import { MortgageCalculator } from './components/MortgageCalculator';
import { Testimonials } from './components/Testimonials';
import { CtaSection } from './components/CtaSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PropertyModal } from './components/PropertyModal';
import { ConsultationModal } from './components/ConsultationModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { LegalModal } from './components/LegalModal';
import { FloatingWidgets } from './components/FloatingWidgets';

export default function App() {
  // Properties state
  const [properties] = useState<Property[]>(SAMPLE_PROPERTIES);
  
  // Favorites persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('distinct_pathway_favs');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Modal states
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [consultationPropertyTitle, setConsultationPropertyTitle] = useState<string | undefined>(undefined);
  const [favoritesDrawerOpen, setFavoritesDrawerOpen] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms'>('privacy');

  // Search & Filter state passed from Hero to FeaturedProperties
  const [searchFilter, setSearchFilter] = useState<{
    category: string;
    location: string;
    minPrice: number;
    maxPrice: number;
  }>({
    category: 'All',
    location: 'All Locations',
    minPrice: 0,
    maxPrice: Infinity,
  });

  // Service preselected for contact form
  const [contactServiceSelection, setContactServiceSelection] = useState<string | undefined>(undefined);

  // Sync favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('distinct_pathway_favs', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Unable to persist favorites to localStorage', e);
    }
  }, [favorites]);

  const handleToggleFavorite = (propertyId: string) => {
    setFavorites((prev) =>
      prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]
    );
  };

  const handleOpenConsultation = (propertyTitle?: string) => {
    setConsultationPropertyTitle(propertyTitle);
    setConsultationOpen(true);
  };

  const handleSelectServiceForContact = (serviceTitle: string) => {
    setContactServiceSelection(serviceTitle);
    const target = document.getElementById('contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLegal = (tab: 'privacy' | 'terms') => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#222222] font-sans flex flex-col selection:bg-[#F36B21] selection:text-white">
      {/* Sticky Header & Navigation */}
      <Navbar
        onOpenConsultation={handleOpenConsultation}
        onOpenFavorites={() => setFavoritesDrawerOpen(true)}
        favoritesCount={favorites.length}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onSearch={(filters) => setSearchFilter(filters)}
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* 2. Trust Benefits */}
        <TrustBenefits />

        {/* 3. About Section */}
        <AboutSection onOpenConsultation={() => handleOpenConsultation()} />

        {/* 4. Featured Properties */}
        <FeaturedProperties
          properties={properties}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectProperty={(prop) => setSelectedProperty(prop)}
          initialFilter={searchFilter}
        />

        {/* 5. Services Section */}
        <ServicesSection onSelectServiceForContact={handleSelectServiceForContact} />

        {/* 6. Why Choose Us */}
        <WhyChooseUs />

        {/* 7. How It Works */}
        <HowItWorks onStartJourney={() => handleOpenConsultation()} />

        {/* 8. Ghana Cedis Mortgage & Installment Calculator */}
        <MortgageCalculator />

        {/* 9. Testimonials Showcase */}
        <Testimonials />

        {/* 10. Call to Action */}
        <CtaSection
          onRequestSiteVisit={() => handleOpenConsultation('Site Visit Request')}
          onContactClick={() => {
            const target = document.getElementById('contact');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 11 & 12. Contact Form & Office Information */}
        <ContactSection
          preselectedService={contactServiceSelection}
          preselectedProperty={selectedProperty?.title}
        />
      </main>

      {/* 13. Footer */}
      <Footer
        onOpenLegal={handleOpenLegal}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Floating WhatsApp and Back-to-Top Controls */}
      <FloatingWidgets />

      {/* Property Details Modal */}
      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        isFavorite={selectedProperty ? favorites.includes(selectedProperty.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onScheduleVisit={(title) => handleOpenConsultation(title)}
      />

      {/* Book Consultation / Request Site Visit Modal */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => {
          setConsultationOpen(false);
          setConsultationPropertyTitle(undefined);
        }}
        defaultPropertyTitle={consultationPropertyTitle}
      />

      {/* Saved Favourites Drawer */}
      <FavoritesDrawer
        isOpen={favoritesDrawerOpen}
        onClose={() => setFavoritesDrawerOpen(false)}
        favorites={favorites}
        allProperties={properties}
        onRemoveFavorite={handleToggleFavorite}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
      />

      {/* Privacy Policy & Terms Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialTab={legalTab}
      />
    </div>
  );
}
