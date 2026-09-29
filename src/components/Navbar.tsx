import React, { useState, useEffect } from 'react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page, treatmentId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on Escape key or window resize to desktop
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  const navItems: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Treatments', page: 'treatments' },
    { label: 'Our Doctors', page: 'doctors' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF9F5]/98 backdrop-blur-md border-b border-[#D8D5CC] shadow-xs'
          : 'bg-[#FAF9F5] border-b border-[#D8D5CC]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#006B68] rounded-sm"
          aria-label="Lumina Dental Studio Homepage"
        >
          <span className="font-serif text-2xl sm:text-[26px] tracking-tight text-[#202423] group-hover:text-[#006B68] transition-colors whitespace-nowrap block">
            Lumina Dental Studio
          </span>
        </button>

        {/* Zone 2: 4–6 clean text navigation links */}
        <nav
          className="hidden md:flex items-center gap-7 lg:gap-8 text-[14px] font-medium text-[#59615F]"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const isActive =
              currentPage === item.page ||
              (item.page === 'treatments' && currentPage === 'treatment-detail');
            return (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`relative py-1.5 transition-colors cursor-pointer hover:text-[#202423] whitespace-nowrap ${
                  isActive ? 'text-[#006B68] font-semibold' : 'text-[#59615F]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#006B68] rounded-full"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('book')}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#202423] hover:bg-[#006B68] rounded-md shadow-xs transition-colors whitespace-nowrap cursor-pointer"
          >
            Book Appointment
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#202423] hover:text-[#006B68] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#006B68] rounded-md cursor-pointer"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 7h16M4 12h16M4 17h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-[#D8D5CC] bg-[#FAF9F5] px-5 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive =
                currentPage === item.page ||
                (item.page === 'treatments' && currentPage === 'treatment-detail');
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`text-left px-3 py-2.5 text-base font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-[#F3EFE7] text-[#006B68] font-semibold'
                      : 'text-[#59615F] hover:bg-[#F3EFE7] hover:text-[#202423]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-[#D8D5CC] flex flex-col gap-3">
            <button
              onClick={() => handleNavClick('book')}
              className="w-full text-center py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#202423] hover:bg-[#006B68] rounded-md shadow-xs transition-colors cursor-pointer"
            >
              Book an Appointment
            </button>
            <div className="flex items-center justify-between text-xs text-[#59615F] px-1 pt-1">
              <span>Vasant Vihar, New Delhi</span>
              <a
                href="tel:+911149876500"
                className="text-[#006B68] font-medium hover:underline"
              >
                +91 11 4987 6500
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
