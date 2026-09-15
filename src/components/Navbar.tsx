import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Menu, 
  X, 
  Phone, 
  Calendar, 
  Heart, 
  Compass,
  MessageCircle,
  ExternalLink 
} from 'lucide-react';
import { COMPANY_INFO, getWhatsAppLink } from '../data/companyInfo';

interface NavbarProps {
  onOpenConsultation: (propertyTitle?: string) => void;
  onOpenFavorites: () => void;
  favoritesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConsultation,
  onOpenFavorites,
  favoritesCount
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active link detection
      const sections = ['home', 'about', 'properties', 'services', 'why-us', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About Us', href: '#about', id: 'about' },
    { label: 'Properties', href: '#properties', id: 'properties' },
    { label: 'Our Services', href: '#services', id: 'services' },
    { label: 'Why Choose Us', href: '#why-us', id: 'why-us' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E7E7E7] py-3' 
          : 'bg-[#F8F7F4]/90 backdrop-blur-sm border-b border-[#E7E7E7]/60 py-4'
      }`}
    >
      {/* Top micro-bar for quick contact */}
      <div className="hidden lg:block border-b border-[#E7E7E7]/50 pb-2 mb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs text-[#555555]">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {COMPANY_INFO.officeLocation}, Ghana • {COMPANY_INFO.businessHoursShort}
            </span>
            <a 
              href={`tel:${COMPANY_INFO.phone}`} 
              className="hover:text-[#F36B21] transition-colors flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-[#F36B21]" />
              {COMPANY_INFO.phoneDisplay}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={getWhatsAppLink()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[#F36B21] transition-colors flex items-center gap-1 font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              WhatsApp Support
            </a>
            <span className="text-[#DDE3E7]">|</span>
            <a 
              href={COMPANY_INFO.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F36B21] transition-colors"
            >
              TikTok
            </a>
            <a 
              href={COMPANY_INFO.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F36B21] transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with Orange House/Pin Icon */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="Distinct Pathway Real Estates Home"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F36B21] flex items-center justify-center text-white shadow-md shadow-[#F36B21]/20 group-hover:scale-105 transition-transform duration-200">
              <Building2 className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg tracking-tight text-[#222222] uppercase leading-tight font-sans">
                Distinct Pathway
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#F36B21] uppercase">
                Real Estates • Ghana
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  activeSection === link.id
                    ? 'text-[#F36B21] font-semibold bg-[#FFF0E8]'
                    : 'text-[#222222] hover:text-[#F36B21] hover:bg-black/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons (Right) */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Favorites button */}
            <button
              id="nav-favorites-btn"
              onClick={onOpenFavorites}
              className="relative p-2.5 rounded-xl border border-[#E7E7E7] text-[#222222] hover:border-[#F36B21] hover:text-[#F36B21] transition-colors duration-150"
              title="View Saved Favourites"
              aria-label="View Saved Favourites"
            >
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-[#F36B21] text-[#F36B21]' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#F36B21] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Book Consultation Button */}
            <button
              id="nav-consultation-btn"
              onClick={() => onOpenConsultation()}
              className="flex items-center gap-2 bg-[#F36B21] hover:bg-[#D95813] text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-[#F36B21]/20 hover:shadow-lg hover:shadow-[#F36B21]/30 transition-all duration-200 active:scale-98"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Consultation</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenFavorites}
              className="relative p-2 rounded-lg border border-[#E7E7E7] text-[#222222]"
              aria-label="Favorites"
            >
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-[#F36B21] text-[#F36B21]' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F36B21] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-[#E7E7E7] text-[#222222] hover:bg-black/5 focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E7E7E7] bg-white px-4 pt-4 pb-6 mt-3 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between ${
                  activeSection === link.id
                    ? 'bg-[#FFF0E8] text-[#F36B21] font-semibold'
                    : 'text-[#222222] hover:bg-[#F8F7F4]'
                }`}
              >
                <span>{link.label}</span>
                {activeSection === link.id && <span className="w-2 h-2 rounded-full bg-[#F36B21]"></span>}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E7E7E7] space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#F36B21] hover:bg-[#D95813] text-white px-4 py-3 rounded-xl font-semibold text-sm shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Consultation</span>
            </button>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#F8F7F4] hover:bg-[#DDE3E7] text-[#222222] border border-[#E7E7E7] px-4 py-3 rounded-xl font-semibold text-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="pt-2 text-center text-xs text-[#555555]">
            Call us: <a href={`tel:${COMPANY_INFO.phone}`} className="font-semibold text-[#222222]">{COMPANY_INFO.phoneDisplay}</a>
          </div>
        </div>
      )}
    </header>
  );
};
