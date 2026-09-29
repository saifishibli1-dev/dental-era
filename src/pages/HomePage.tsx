import React, { useState } from 'react';
import { Page } from '../types';
import { TREATMENTS } from '../data/treatments';
import { TESTIMONIALS, BEFORE_AFTER_CASES, CLINIC_INFO } from '../data/clinicData';
import { SafeImage } from '../components/SafeImage';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';

interface HomePageProps {
  onNavigate: (page: Page, treatmentId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const featuredCase = BEFORE_AFTER_CASES[activeCaseIndex];

  // Lead treatment + secondary treatments for asymmetric editorial layout
  const leadTreatment = TREATMENTS[0]; // Dental Implants
  const secondaryTreatments = TREATMENTS.slice(1, 5); // Invisalign, Whitening, RCT, Cosmetic

  return (
    <div className="space-y-24 md:space-y-32 pb-20">
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="pt-8 sm:pt-14 lg:pt-16 border-b border-[#D8D5CC] pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Focused Editorial Copy (7 cols) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              
              <div className="text-xs font-semibold tracking-widest uppercase text-[#006B68]">
                Multidisciplinary Dental Practice · Vasant Vihar, New Delhi
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#202423] leading-[1.08] tracking-tight">
                A Healthier Smile Starts Here.
              </h1>

              <p className="text-base sm:text-lg text-[#59615F] max-w-xl leading-relaxed">
                Lumina Dental Studio provides restorative, aesthetic, and surgical dentistry in a quiet, private setting. We focus on conservative biological tooth preservation, Swedish guided implantology, and gentle microscopic care.
              </p>

              {/* Restrained CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('book')}
                  className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#202423] hover:bg-[#006B68] rounded-md transition-colors text-center cursor-pointer shadow-xs"
                >
                  Book an Appointment
                </button>
                <button
                  onClick={() => onNavigate('treatments')}
                  className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#202423] bg-[#F3EFE7] hover:bg-[#FAF9F5] rounded-md transition-colors text-center cursor-pointer border border-[#202423]"
                >
                  Explore Treatments
                </button>
              </div>

              {/* Real Clinic Details */}
              <div className="pt-8 border-t border-[#D8D5CC] grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-xl text-xs text-[#59615F]">
                <div>
                  <span className="font-semibold text-[#202423] block mb-0.5">Consultation</span>
                  <span className="text-[#59615F]">Mon – Sat by appointment</span>
                </div>
                <div>
                  <span className="font-semibold text-[#202423] block mb-0.5">Diagnostics</span>
                  <span className="text-[#59615F]">In-house 3D CBCT & iTero scan</span>
                </div>
                <div>
                  <span className="font-semibold text-[#202423] block mb-0.5">Location</span>
                  <span className="text-[#59615F]">Poorvi Marg, Vasant Vihar</span>
                </div>
              </div>

            </div>

            {/* Right Column: Grounded Architectural Operatory Photo (5 cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden shadow-2xs border border-[#D8D5CC] aspect-4/3 sm:aspect-5/4">
                <SafeImage
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80"
                  alt="Lumina Dental Studio operatory suite in Vasant Vihar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-[#59615F] px-1">
                <span>Private Operatory Suite</span>
                <span className="text-[#006B68]">German KaVo ergonomics</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE CLINICAL STANDARD (Asymmetrical Editorial Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Editorial Narrative & Photography (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#006B68]">
              The Lumina Standard
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#202423] tracking-tight leading-tight">
              Dentistry Designed Around Your Comfort.
            </h2>
            <p className="text-sm sm:text-base text-[#59615F] leading-relaxed">
              We structured Lumina to eliminate common frustrations with dental care: hurried appointments, unexpected fees, and unnecessary tooth reduction. Every step is explained with clear diagnostics before treatment begins.
            </p>

            <div className="rounded-xl overflow-hidden border border-[#D8D5CC] shadow-2xs aspect-16/10 mt-6">
              <SafeImage
                src="https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80"
                alt="Microscopic endodontic examination suite"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-[#59615F] italic">
              High-magnification optical diagnostics allow micro-invasive treatment.
            </p>
          </div>

          {/* Right: Editorial Principles with Hairline Dividers (7 cols) */}
          <div className="lg:col-span-7 divide-y divide-[#D8D5CC]">
            
            <div className="py-6 first:pt-0">
              <span className="text-xs font-semibold text-[#006B68] uppercase tracking-wider block mb-1">
                01. Preservation Over Extraction
              </span>
              <h3 className="font-serif text-xl font-bold text-[#202423]">
                Protecting Healthy Tooth Structure
              </h3>
              <p className="mt-2 text-sm text-[#59615F] leading-relaxed">
                Nothing artificial surpasses natural enamel. We utilize German surgical microscopes and bonded ceramic inlays to treat decay while preserving up to 90% more of your natural biological tooth.
              </p>
            </div>

            <div className="py-6">
              <span className="text-xs font-semibold text-[#006B68] uppercase tracking-wider block mb-1">
                02. Computer-Buffered Anesthesia
              </span>
              <h3 className="font-serif text-xl font-bold text-[#202423]">
                Painless Administration Protocols
              </h3>
              <p className="mt-2 text-sm text-[#59615F] leading-relaxed">
                Discomfort during dental visits is largely caused by rapid anesthetic pressure. Our computer-controlled delivery gently numbs local nerves at a sensor-regulated rate, removing injection sting.
              </p>
            </div>

            <div className="py-6">
              <span className="text-xs font-semibold text-[#006B68] uppercase tracking-wider block mb-1">
                03. Digital 3D Diagnostics First
              </span>
              <h3 className="font-serif text-xl font-bold text-[#202423]">
                Visualizing Outcomes Before You Commit
              </h3>
              <p className="mt-2 text-sm text-[#59615F] leading-relaxed">
                Using our iTero Element 5D scanner and Planmeca 3D CBCT, you review your teeth and bone structures directly on screen. We simulate results and answer every question before any procedure begins.
              </p>
            </div>

            <div className="py-6">
              <span className="text-xs font-semibold text-[#006B68] uppercase tracking-wider block mb-1">
                04. Clear Itemized Estimates
              </span>
              <h3 className="font-serif text-xl font-bold text-[#202423]">
                Transparent Pricing Without Pressure
              </h3>
              <p className="mt-2 text-sm text-[#59615F] leading-relaxed">
                You receive a detailed written estimate outlining material options, timelines, and fees. There are no hidden chairside charges, and you retain complete control over your care plan.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. FEATURED TREATMENTS (Asymmetrical Editorial Catalog) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-[#D8D5CC] pt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-[#006B68]">
                Clinical Disciplines
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#202423] mt-1 tracking-tight">
                Featured Treatments
              </h2>
            </div>
            <button
              onClick={() => onNavigate('treatments')}
              className="text-xs font-semibold uppercase tracking-wider text-[#006B68] hover:text-[#202423] flex items-center gap-1.5 cursor-pointer pb-1 transition-colors"
            >
              <span>View All 8 Treatments</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Prominent Lead Feature (6 cols) - White Card against Warm Ivory */}
            <div className="lg:col-span-6 bg-[#FFFFFF] rounded-xl border border-[#D8D5CC] overflow-hidden flex flex-col justify-between shadow-2xs">
              <div className="aspect-16/10 overflow-hidden bg-[#EAE7DE]">
                <SafeImage
                  src={leadTreatment.image}
                  alt={leadTreatment.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-8 space-y-4">
                <div className="text-xs font-medium uppercase tracking-wider text-[#006B68]">
                  {leadTreatment.category} Protocol
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#202423] leading-snug">
                  {leadTreatment.name}
                </h3>
                <p className="text-[#59615F] text-sm leading-relaxed">
                  {leadTreatment.fullDescription}
                </p>
                <div className="pt-2 flex items-center gap-6 text-xs text-[#59615F] border-t border-[#D8D5CC]/80">
                  <div>
                    <span className="text-[#59615F]/70 block">Duration:</span>
                    <span className="font-medium text-[#202423]">{leadTreatment.duration}</span>
                  </div>
                  <div>
                    <span className="text-[#59615F]/70 block">Technology:</span>
                    <span className="font-medium text-[#202423]">Swedish Straumann®</span>
                  </div>
                </div>
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => onNavigate('treatment-detail', leadTreatment.id)}
                    className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#202423] hover:bg-[#006B68] rounded-md transition-colors cursor-pointer shadow-xs"
                  >
                    View Procedure Details
                  </button>
                  <button
                    onClick={() => onNavigate('book', leadTreatment.id)}
                    className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#202423] bg-[#F3EFE7] hover:bg-[#FAF9F5] border border-[#202423] rounded-md transition-colors cursor-pointer"
                  >
                    Book Consultation
                  </button>
                </div>
              </div>
            </div>

            {/* Editorial List of Secondary Procedures (6 cols) - White Cards against Warm Ivory */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
              {secondaryTreatments.map((treatment) => (
                <div
                  key={treatment.id}
                  className="bg-[#FFFFFF] p-5 sm:p-6 rounded-xl border border-[#D8D5CC] hover:border-[#8FA9A1] transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs"
                >
                  <div className="space-y-1">
                    <div className="text-[11px] font-medium uppercase tracking-wider text-[#006B68]">
                      {treatment.category}
                    </div>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-[#202423]">
                      {treatment.name}
                    </h4>
                    <p className="text-xs text-[#59615F] line-clamp-2 max-w-md">
                      {treatment.shortDescription}
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate('treatment-detail', treatment.id)}
                    className="shrink-0 px-4 py-2 text-xs font-semibold tracking-wider text-[#202423] bg-[#F3EFE7] hover:bg-[#FAF9F5] border border-[#202423] rounded-md transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Explore →
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 4. BEFORE & AFTER SMILE SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-[#D8D5CC] pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Case Selection & Notes (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#006B68]">
                Clinical Outcomes
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#202423] tracking-tight">
                Documented Patient Cases
              </h2>
              <p className="text-[#59615F] text-sm leading-relaxed">
                Photographic comparisons of completed treatments at our Vasant Vihar clinic. Slide to observe biological restoration and alignment.
              </p>

              {/* Case selector tabs */}
              <div className="space-y-2 pt-1">
                {BEFORE_AFTER_CASES.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveCaseIndex(idx)}
                    className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer ${
                      activeCaseIndex === idx
                        ? 'bg-[#202423] border-[#202423] text-white'
                        : 'bg-[#FFFFFF] border-[#D8D5CC] text-[#202423] hover:border-[#8FA9A1]'
                    }`}
                  >
                    <div className="text-[11px] font-semibold tracking-wider uppercase text-[#8FA9A1]">
                      {item.treatmentName}
                    </div>
                    <div className="text-sm font-medium mt-0.5">
                      {item.title}
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('gallery')}
                  className="text-xs font-semibold uppercase tracking-wider text-[#006B68] hover:text-[#202423] flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>View All Case Studies in Gallery</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Comparison Slider (7 cols) - White Card Container */}
            <div className="lg:col-span-7">
              <div className="bg-[#FFFFFF] p-4 sm:p-6 rounded-xl border border-[#D8D5CC] shadow-2xs">
                <BeforeAfterSlider
                  beforeImage={featuredCase.beforeImage}
                  afterImage={featuredCase.afterImage}
                  title={featuredCase.title}
                  patientProfile={featuredCase.patientProfile}
                />
                <p className="mt-4 text-xs text-[#59615F] leading-relaxed border-t border-[#D8D5CC]/80 pt-3">
                  <span className="font-semibold text-[#202423]">Clinical Protocol:</span> {featuredCase.clinicalNotes}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. PATIENT PERSPECTIVES (Alternate Section: #EAE7DE with #FFFFFF cards) */}
      <section className="bg-[#EAE7DE] py-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-y border-[#D8D5CC]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#006B68]">
              Patient Experiences
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#202423] mt-1 tracking-tight">
              Consultations & Outcomes in Vasant Vihar
            </h2>
            <p className="text-[#59615F] text-sm mt-2">
              Reflections from individuals who visited our studio for complex reconstructions, clear aligners, and routine care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.slice(0, 2).map((t) => (
              <div
                key={t.id}
                className="bg-[#FFFFFF] p-6 sm:p-8 rounded-xl border border-[#D8D5CC] shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-[#006B68] mb-4">
                    {t.treatment}
                  </div>
                  <blockquote className="font-serif text-base sm:text-lg text-[#202423] leading-relaxed italic">
                    "{t.quote}"
                  </blockquote>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D8D5CC]/80 flex items-center justify-between text-xs text-[#59615F]">
                  <span className="font-semibold text-[#202423]">{t.patientName}</span>
                  <span>{t.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. GROUNDED CONSULTATION INVITATION (#202423 with warm white & sage accents) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-[#202423] text-white p-8 sm:p-12 lg:p-14 border border-[#D8D5CC]/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8FA9A1]">
                Personalized Consultation
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Schedule an In-Person Diagnostic Visit.
              </h2>
              <p className="text-[#D8D5CC]/85 text-sm sm:text-base leading-relaxed max-w-xl">
                We invite you to experience our quiet Vasant Vihar studio. Your diagnostic evaluation includes high-definition optical scans and a thorough discussion of all treatment alternatives.
              </p>
              <div className="pt-2 flex flex-wrap gap-6 text-xs text-[#D8D5CC]/70">
                <span>Address: {CLINIC_INFO.address.line1}, {CLINIC_INFO.address.area}</span>
                <span>Telephone: {CLINIC_INFO.phone}</span>
                <span>Valet parking available</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={() => onNavigate('book')}
                className="w-full py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-[#202423] bg-[#FAF9F5] hover:bg-[#F3EFE7] rounded-md transition-colors text-center cursor-pointer shadow-xs"
              >
                Book Appointment Online
              </button>
              <a
                href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
                className="w-full py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-[#202423] hover:bg-black/30 border border-[#D8D5CC]/30 rounded-md transition-colors text-center"
              >
                Call Concierge: {CLINIC_INFO.phone}
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
