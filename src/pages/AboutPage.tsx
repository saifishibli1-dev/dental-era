import React from 'react';
import { Page } from '../types';
import { CLINIC_INFO } from '../data/clinicData';
import { SafeImage } from '../components/SafeImage';

interface AboutPageProps {
  onNavigate: (page: Page) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-20 md:space-y-28 pb-16">
      {/* 1. Header Banner */}
      <section className="pt-8 sm:pt-12">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#006B68]">
            About Lumina Dental Studio
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#202423] mt-2 tracking-tight">
            Where Precision Medicine Meets Conscious Dentistry.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#59615F] leading-relaxed max-w-2xl mx-auto">
            Founded in South Delhi to dismantle dental anxiety forever. We set a new benchmark for painless, micro-invasive, and biologically respectful dental health.
          </p>
        </div>
      </section>

      {/* 2. Visual Storytelling (Studio Image + Philosophy) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#006B68]">
              Our Founding Story
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#202423] tracking-tight">
              A Clinic Designed to Feel Nothing Like a Dental Clinic.
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#59615F] leading-relaxed">
              <p>
                In 2018, Dr. Rohan Malhotra recognized a recurring truth among discerning patients in New Delhi: people weren’t avoiding the dentist because they didn’t care about their teeth—they were avoiding the sterile intimidation, the sensory overload of dental drills, and the fear of painful procedures.
              </p>
              <p>
                Lumina Dental Studio was founded in the tranquil green environs of Vasant Vihar with a single conviction: <em>what if visiting the dentist felt like stepping into an architectural wellness retreat?</em>
              </p>
              <p>
                We replaced industrial waitrooms with an artisanal coffee and tea lounge. We replaced guesswork with Carl Zeiss German surgical microscopes. And we replaced uncomfortable dental impressions with instant 3D digital intraoral scanning.
              </p>
            </div>

            <div className="pt-4 flex items-center gap-6 text-xs text-[#59615F] border-t border-[#D8D5CC]">
              <div>
                <span className="font-serif text-xl font-bold text-[#202423] block">E-14</span>
                <span>Poorvi Marg, Vasant Vihar</span>
              </div>
              <span aria-hidden="true" className="text-[#D8D5CC]">|</span>
              <div>
                <span className="font-serif text-xl font-bold text-[#202423] block">4</span>
                <span>Private Operatories</span>
              </div>
              <span aria-hidden="true" className="text-[#D8D5CC]">|</span>
              <div>
                <span className="font-serif text-xl font-bold text-[#202423] block">100%</span>
                <span>Digital Workflows</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-xl overflow-hidden shadow-2xs border border-[#D8D5CC] aspect-4/3 relative">
              <SafeImage
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80"
                alt="Lumina Dental Studio peaceful lounge and reception in Vasant Vihar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Clinical Pillars (Alternate section: #EAE7DE with #FFFFFF cards) */}
      <section className="bg-[#EAE7DE] py-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-y border-[#D8D5CC]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#006B68]">
              The Guiding Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#202423] mt-1 tracking-tight">
              Three Inviolable Principles of Care
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FFFFFF] p-8 rounded-xl border border-[#D8D5CC] shadow-2xs">
              <div className="font-serif text-2xl font-bold text-[#006B68] mb-2">01</div>
              <h3 className="font-serif text-xl font-bold text-[#202423] mb-2">
                Biomimetic Tooth Preservation
              </h3>
              <p className="text-sm text-[#59615F] leading-relaxed">
                We believe that nothing humanity invents can fully match the perfection of natural biological tooth enamel. We do not aggressively grind down healthy tooth structure for crowns when minimally-invasive ceramic inlays or bonded veneers can save 90% of your native tooth.
              </p>
            </div>

            <div className="bg-[#FFFFFF] p-8 rounded-xl border border-[#D8D5CC] shadow-2xs">
              <div className="font-serif text-2xl font-bold text-[#006B68] mb-2">02</div>
              <h3 className="font-serif text-xl font-bold text-[#202423] mb-2">
                Computer-Guided Surgical Precision
              </h3>
              <p className="text-sm text-[#59615F] leading-relaxed">
                Freehand dental implant placement belongs to the past. At Lumina, every implant and aesthetic restoration is planned through volumetric 3D CBCT imaging and custom keyhole surgical stents, eliminating human error and cutting healing times in half.
              </p>
            </div>

            <div className="bg-[#FFFFFF] p-8 rounded-xl border border-[#D8D5CC] shadow-2xs">
              <div className="font-serif text-2xl font-bold text-[#006B68] mb-2">03</div>
              <h3 className="font-serif text-xl font-bold text-[#202423] mb-2">
                Zero Over-Treatment Guarantee
              </h3>
              <p className="text-sm text-[#59615F] leading-relaxed">
                You will never be pressured into an unnecessary dental procedure. Every consultation includes high-resolution photography and live 3D screen scans where we walk you through your mouth together, providing honest second opinions and itemized options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Hygiene & Infection Control Suite */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-xl overflow-hidden shadow-2xs border border-[#D8D5CC] aspect-4/3 relative">
              <SafeImage
                src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80"
                alt="Hospital Grade Class-B Autoclave Sterilization Suite at Lumina Dental"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#006B68]">
              Sterilization & Patient Safety
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#202423] tracking-tight">
              Hospital-Grade 6-Stage Sterilization Protocol.
            </h2>
            <p className="text-sm sm:text-base text-[#59615F] leading-relaxed">
              Your safety is our solemn responsibility. Lumina features a dedicated sterilization cleanroom operating strictly under European EN 13060 Class-B standards.
            </p>

            <ul className="space-y-3 text-sm text-[#59615F]">
              <li className="flex items-start gap-3">
                <span className="text-[#006B68] font-bold">✓</span>
                <span><strong className="text-[#202423]">Ultrasonic Enzymatic Bath:</strong> Deep molecular breakdown of bio-burden prior to autoclaving.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#006B68] font-bold">✓</span>
                <span><strong className="text-[#202423]">Class-B Fractional Vacuum Autoclave:</strong> 134°C pressurized steam penetration into hollow handpieces and micro-instruments.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#006B68] font-bold">✓</span>
                <span><strong className="text-[#202423]">Individually Hermetically Sealed Pouches:</strong> Opened directly in front of you at the beginning of each appointment.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#006B68] font-bold">✓</span>
                <span><strong className="text-[#202423]">Continuous Air & Water Disinfection:</strong> Medical-grade HEPA 14 air purifiers and reverse-osmosis autoclaved dental waterline flushing.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Booking Hook (#FFFFFF Card against Warm Ivory) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-[#FFFFFF] p-8 sm:p-12 rounded-xl border border-[#D8D5CC] shadow-2xs space-y-4">
          <h2 className="font-serif text-3xl text-[#202423]">
            Meet Our Doctors in Person
          </h2>
          <p className="text-[#59615F] text-sm max-w-lg mx-auto">
            Book a diagnostic consultation at our Vasant Vihar clinic and let us help you formulate a personalized smile roadmap.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => onNavigate('book')}
              className="px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#202423] hover:bg-[#006B68] rounded-md cursor-pointer transition-colors shadow-xs"
            >
              Book Consultation
            </button>
            <button
              onClick={() => onNavigate('doctors')}
              className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#202423] bg-[#F3EFE7] hover:bg-[#FAF9F5] rounded-md cursor-pointer transition-colors border border-[#202423]"
            >
              View Specialists
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

