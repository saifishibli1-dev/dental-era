import React, { useState } from 'react';
import { Page, Treatment } from '../types';
import { TREATMENTS } from '../data/treatments';
import { SafeImage } from '../components/SafeImage';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';

interface TreatmentDetailPageProps {
  treatmentId: string;
  onNavigate: (page: Page, treatmentId?: string) => void;
}

export const TreatmentDetailPage: React.FC<TreatmentDetailPageProps> = ({
  treatmentId,
  onNavigate
}) => {
  // Robust ID resolution matching exact ID, partial strings, or common aliases
  const findTreatment = (id: string): Treatment => {
    if (!id) return TREATMENTS[0];
    const exact = TREATMENTS.find((t) => t.id === id);
    if (exact) return exact;

    // Common aliases mapping
    const aliasMap: Record<string, string> = {
      'invisalign': 'invisalign-aligners',
      'aligners': 'invisalign-aligners',
      'root-canal': 'root-canal-treatment',
      'rct': 'root-canal-treatment',
      'microscopic-root-canal': 'root-canal-treatment',
      'veneers': 'cosmetic-dentistry',
      'porcelain-veneers': 'cosmetic-dentistry',
      'cosmetic': 'cosmetic-dentistry',
      'crowns': 'dental-crowns-bridges',
      'bridges': 'dental-crowns-bridges',
      'dental-crowns': 'dental-crowns-bridges',
      'pediatric': 'pediatric-dentistry',
      'pediatric-preventive': 'pediatric-dentistry',
      'implants': 'dental-implants',
      'whitening': 'teeth-whitening',
      'general': 'general-dentistry',
      'cleaning': 'general-dentistry',
      'preventive': 'general-dentistry',
    };

    if (aliasMap[id.toLowerCase()]) {
      const mapped = TREATMENTS.find((t) => t.id === aliasMap[id.toLowerCase()]);
      if (mapped) return mapped;
    }

    const partial = TREATMENTS.find(
      (t) => t.id.includes(id) || id.includes(t.id) || t.name.toLowerCase().includes(id.toLowerCase())
    );
    return partial || TREATMENTS[0];
  };

  const currentTreatment = findTreatment(treatmentId);

  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Breadcrumb & Treatment Selector */}
      <section className="pt-6 sm:pt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#D8D5CC]">
          <nav className="flex items-center gap-2 text-xs text-[#59615F]" aria-label="Breadcrumb">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#202423] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span aria-hidden="true" className="text-[#D8D5CC]">/</span>
            <button
              onClick={() => onNavigate('treatments')}
              className="hover:text-[#202423] transition-colors cursor-pointer"
            >
              Treatments
            </button>
            <span aria-hidden="true" className="text-[#D8D5CC]">/</span>
            <span className="text-[#006B68] font-semibold">{currentTreatment.name}</span>
          </nav>

          {/* Quick treatment dropdown switcher */}
          <div className="flex items-center gap-2 text-xs">
            <label htmlFor="treatment-selector" className="text-[#59615F]">Switch Procedure:</label>
            <select
              id="treatment-selector"
              value={currentTreatment.id}
              onChange={(e) => onNavigate('treatment-detail', e.target.value)}
              className="bg-[#FFFFFF] border border-[#D8D5CC] rounded-md px-3 py-1.5 text-xs text-[#202423] focus:outline-hidden focus:ring-1 focus:ring-[#006B68] shadow-2xs"
            >
              {TREATMENTS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* 2. Marquee Treatment Overview Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-semibold tracking-wider uppercase text-[#006B68]">
              {currentTreatment.category} Dentistry
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#202423] tracking-tight leading-tight">
              {currentTreatment.name}
            </h1>
            <p className="text-base sm:text-lg font-medium text-[#202423] leading-snug">
              {currentTreatment.tagline}
            </p>
            <p className="text-sm sm:text-base text-[#59615F] leading-relaxed">
              {currentTreatment.fullDescription}
            </p>

            {/* Clinical Specifications Box - White Card */}
            <div className="bg-[#FFFFFF] rounded-xl p-5 border border-[#D8D5CC] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs shadow-2xs">
              <div>
                <span className="text-[#59615F] block mb-0.5">Duration:</span>
                <span className="font-semibold text-[#202423] block">{currentTreatment.duration}</span>
              </div>
              <div>
                <span className="text-[#59615F] block mb-0.5">Visits Needed:</span>
                <span className="font-semibold text-[#202423] block">{currentTreatment.sessions}</span>
              </div>
              <div>
                <span className="text-[#59615F] block mb-0.5">Anesthesia:</span>
                <span className="font-semibold text-[#202423] block">{currentTreatment.anesthesia}</span>
              </div>
              <div>
                <span className="text-[#59615F] block mb-0.5">Recovery:</span>
                <span className="font-semibold text-[#202423] block">{currentTreatment.recoveryTime}</span>
              </div>
            </div>

            {/* Direct Book CTA button */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => onNavigate('book', currentTreatment.id)}
                className="px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#202423] hover:bg-[#006B68] rounded-md shadow-xs transition-colors text-center cursor-pointer"
              >
                Book {currentTreatment.name}
              </button>
              <a
                href="https://wa.me/919811054321?text=Hello%20Lumina%20Dental%2C%20I%20have%20questions%20regarding%20the%20treatment%20procedure."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#202423] bg-[#F3EFE7] hover:bg-[#FAF9F5] border border-[#202423] rounded-md transition-colors text-center"
              >
                WhatsApp Inquiry
              </a>
            </div>
          </div>

          {/* Media Header (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden shadow-2xs border border-[#D8D5CC] aspect-4/3 relative">
              <SafeImage
                src={currentTreatment.image}
                alt={currentTreatment.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Technology stack box - White Card */}
            <div className="mt-6 bg-[#FFFFFF] p-5 rounded-xl border border-[#D8D5CC] shadow-2xs">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#202423] mb-3">
                Precision Technology & Hardware Used
              </div>
              <ul className="space-y-2 text-xs text-[#59615F]">
                {currentTreatment.technology.map((tech, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006B68]" />
                    <span className="font-medium text-[#202423]">{tech}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Step-by-Step Clinical Procedure (Alternate Section: #EAE7DE with #FFFFFF cards) */}
      <section className="bg-[#EAE7DE] py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-y border-[#D8D5CC]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#006B68]">
              The Protocol
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#202423] mt-1 tracking-tight">
              What to Expect: Step-by-Step Procedure
            </h2>
            <p className="text-[#59615F] text-sm mt-2">
              Every appointment at Lumina is carefully choreographed to eliminate uncertainty, ensure absolute anesthesia comfort, and preserve healthy biological tooth structure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentTreatment.steps.map((step) => (
              <div
                key={step.number}
                className="bg-[#FFFFFF] p-6 rounded-xl border border-[#D8D5CC] shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="font-serif text-2xl font-bold text-[#006B68] mb-3">
                    {step.number}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#202423] mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#59615F] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Clinical Benefits & Suitability */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Benefits List (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#006B68]">
              Clinical Advantages
            </span>
            <h2 className="font-serif text-3xl text-[#202423] tracking-tight">
              Why Patients Choose Our Protocol
            </h2>
            <div className="space-y-4 pt-2">
              {currentTreatment.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#FFFFFF] border border-[#D8D5CC] text-[#006B68] flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 shadow-2xs">
                    ✓
                  </div>
                  <p className="text-sm text-[#59615F] leading-relaxed">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Before & After if available, or clinical assurance (6 cols) */}
          <div className="lg:col-span-6">
            {currentTreatment.beforeAfterImage ? (
              <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#D8D5CC] shadow-2xs">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#006B68] mb-3">
                  Clinical Case Result
                </div>
                <BeforeAfterSlider
                  beforeImage={currentTreatment.beforeAfterImage.before}
                  afterImage={currentTreatment.beforeAfterImage.after}
                  title={currentTreatment.beforeAfterImage.caseTitle}
                />
              </div>
            ) : (
              <div className="bg-[#FFFFFF] p-8 rounded-2xl border border-[#D8D5CC] space-y-4 shadow-2xs">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#006B68]">
                  Doctor Consultation Assurance
                </div>
                <h3 className="font-serif text-2xl text-[#202423]">
                  Pre-Treatment Smile Visualization
                </h3>
                <p className="text-sm text-[#59615F] leading-relaxed">
                  Before any procedure begins, our specialists simulate your predicted outcomes using the 3D iTero intraoral scanner. You get to review the expected changes, ask questions, and approve the clinical blueprint with zero obligations.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('book', currentTreatment.id)}
                    className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#202423] hover:bg-[#006B68] rounded-md cursor-pointer transition-colors shadow-xs"
                  >
                    Schedule Assessment
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 5. FAQs Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="border-t border-[#D8D5CC] pt-16">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#006B68]">
              Questions & Clarifications
            </span>
            <h2 className="font-serif text-3xl text-[#202423] mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {currentTreatment.faqs.map((faq, idx) => {
              const isExpanded = expandedFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#FFFFFF] rounded-xl border border-[#D8D5CC] overflow-hidden shadow-2xs"
                >
                  <button
                    onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F3EFE7]/60 transition-colors"
                    aria-expanded={isExpanded}
                  >
                    <span className="font-serif text-base sm:text-lg font-bold text-[#202423]">
                      {faq.question}
                    </span>
                    <span className="text-[#006B68] font-mono text-sm shrink-0">
                      {isExpanded ? '−' : '+'}
                    </span>
                  </button>
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 text-sm text-[#59615F] leading-relaxed border-t border-[#D8D5CC]/60">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Final Booking CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#202423] text-white p-8 sm:p-12 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#D8D5CC]/20">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8FA9A1]">
              Personalized Dental Roadmap
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white mt-1">
              Ready for your {currentTreatment.name} evaluation?
            </h2>
            <p className="text-[#D8D5CC]/80 text-sm mt-1 max-w-lg">
              Meet our board-certified specialists in Vasant Vihar. We provide itemized treatment plans with zero pressure.
            </p>
          </div>
          <button
            onClick={() => onNavigate('book', currentTreatment.id)}
            className="px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#202423] bg-[#FAF9F5] hover:bg-[#F3EFE7] rounded-md transition-colors cursor-pointer whitespace-nowrap shadow-xs"
          >
            Book Appointment Now
          </button>
        </div>
      </section>
    </div>
  );
};

