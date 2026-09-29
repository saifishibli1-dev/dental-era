import React from 'react';
import { Page } from '../types';
import { CLINIC_INFO } from '../data/clinicData';

interface FooterProps {
  onNavigate: (page: Page, treatmentId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: Page, treatmentId?: string) => {
    onNavigate(page, treatmentId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#202423] text-[#D8D5CC] pt-16 pb-24 md:pb-16 border-t border-[#D8D5CC]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#D8D5CC]/20">
          
          {/* Brand & Vision (Col span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-serif text-2xl sm:text-3xl text-white tracking-tight block">
              Lumina Dental Studio
            </span>
            <p className="text-sm text-[#D8D5CC]/80 leading-relaxed max-w-sm">
              Delhi’s premier multidisciplinary dental boutique. Blending European clinical precision, Swedish implantology, and warm South Delhi hospitality in Vasant Vihar.
            </p>
            <div className="pt-2 text-xs text-[#D8D5CC]/70 space-y-1">
              <div className="text-white font-medium">Accreditations & Standards:</div>
              <div>• NABH Aligned Infection Control Protocol</div>
              <div>• Class-B Hospital Grade Sterilization Suite</div>
              <div>• Official Straumann® & Invisalign Diamond Provider</div>
            </div>
          </div>

          {/* Quick Links (Col span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-wider uppercase">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-[#D8D5CC]/80">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About the Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('treatments')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Treatments
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('doctors')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Specialist Doctors
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gallery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Smile Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Location & Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Clinical Disciplines (Col span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-wider uppercase">
              Treatments
            </h4>
            <ul className="space-y-2 text-sm text-[#D8D5CC]/80">
              <li>
                <button
                  onClick={() => handleNav('treatment-detail', 'dental-implants')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Swedish Dental Implants
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('treatment-detail', 'invisalign-aligners')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Invisalign Clear Aligners
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('treatment-detail', 'cosmetic-dentistry')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Porcelain Veneers & Makeovers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('treatment-detail', 'root-canal-treatment')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Microscopic Root Canal Therapy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('treatment-detail', 'teeth-whitening')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Philips Zoom! Laser Whitening
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('treatment-detail', 'pediatric-dentistry')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pediatric Gentle Dentistry
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Timings (Col span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-wider uppercase">
              Clinic & OPD Hours
            </h4>
            <div className="text-sm text-[#D8D5CC]/80 space-y-1">
              <p className="text-white font-medium">{CLINIC_INFO.address.line1}</p>
              <p>{CLINIC_INFO.address.area}, {CLINIC_INFO.address.city} – {CLINIC_INFO.address.pincode}</p>
              <p className="text-xs text-[#D8D5CC]/60 pt-1">
                Near Priya Cinema / Basant Lok Market
              </p>
            </div>

            <div className="pt-2 text-xs text-[#D8D5CC]/70 space-y-1">
              <div className="text-white font-medium">Consultation Timings:</div>
              {CLINIC_INFO.hours.map((h, i) => (
                <div key={i} className="flex justify-between gap-2">
                  <span>{h.days}:</span>
                  <span className="text-white tabular-nums">{h.time}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-1 text-xs">
              <a
                href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
                className="text-[#D8D5CC] hover:text-white transition-colors"
              >
                <span className="text-[#8FA9A1] mr-1.5">Direct Line:</span>{CLINIC_INFO.phone}
              </a>
              <a
                href={`mailto:${CLINIC_INFO.email}`}
                className="text-[#D8D5CC] hover:text-white transition-colors"
              >
                <span className="text-[#8FA9A1] mr-1.5">Email:</span>{CLINIC_INFO.email}
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#D8D5CC]/70 gap-4">
          <p>© {new Date().getFullYear()} Lumina Dental Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Vasant Vihar, New Delhi</span>
            <span aria-hidden="true">·</span>
            <span>Registered Dental Healthcare Establishment</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => handleNav('book')}
              className="text-[#8FA9A1] hover:text-white underline cursor-pointer"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
