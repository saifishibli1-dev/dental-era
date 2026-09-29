import React from 'react';
import { Page, Doctor } from '../types';
import { DOCTORS } from '../data/doctors';
import { SafeImage } from '../components/SafeImage';

interface DoctorsPageProps {
  onNavigate: (page: Page, treatmentId?: string, doctorId?: string) => void;
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Header Banner */}
      <section className="pt-8 sm:pt-12">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#006B68]">
            Medical Faculty & Leadership
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#202423] mt-2 tracking-tight">
            Distinguished Specialists. Gentle Hands.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#59615F] leading-relaxed max-w-2xl mx-auto">
            Our team comprises MDS specialists trained at premier institutions like AIIMS New Delhi, Manipal, and King's College London. Each doctor specializes exclusively within their dental domain.
          </p>
        </div>
      </section>

      {/* 2. Doctor In-Depth Profiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {DOCTORS.map((doctor, index) => {
          const isEven = index % 2 === 1;
          return (
            <article
              key={doctor.id}
              className="bg-[#FFFFFF] rounded-xl border border-[#D8D5CC] shadow-2xs overflow-hidden p-6 sm:p-8 lg:p-10"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center`}>
                
                {/* Doctor Portrait (4 cols) */}
                <div className={`lg:col-span-4 ${isEven ? 'lg:order-2' : ''}`}>
                  <div className="relative rounded-xl overflow-hidden aspect-4/5 shadow-xs bg-[#EAE7DE]">
                    <SafeImage
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 right-3 bg-[#202423]/90 backdrop-blur-xs text-white p-2.5 rounded-lg text-center">
                      <div className="text-[11px] text-[#8FA9A1] uppercase tracking-wider font-semibold">
                        Clinical Experience
                      </div>
                      <div className="text-xs font-medium mt-0.5">
                        {doctor.experienceYears}+ Years of Dedicated Practice
                      </div>
                    </div>
                  </div>
                </div>

                {/* Doctor Bio and Credentials (8 cols) */}
                <div className={`lg:col-span-8 space-y-5 ${isEven ? 'lg:order-1' : ''}`}>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-3">
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202423]">
                        {doctor.name}
                      </h2>
                      <span className="text-xs font-semibold text-[#006B68] tracking-wide">
                        {doctor.role}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#59615F] font-medium mt-1">
                      {doctor.degrees}
                    </p>
                  </div>

                  {/* Philosophy Quote */}
                  <div className="border-l-2 border-[#006B68] pl-4 py-1 italic text-xs sm:text-sm text-[#202423] font-serif">
                    "{doctor.quote}"
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-[#59615F] leading-relaxed">
                    {doctor.bio}
                  </p>

                  {/* Credentials / Education Points */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#202423]">
                      Credentials & Honors:
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#59615F]">
                      {doctor.education.map((edu, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#006B68] font-bold shrink-0">•</span>
                          <span>{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* OPD Availability & Booking */}
                  <div className="pt-4 border-t border-[#D8D5CC]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-xs text-[#59615F]">
                      <span className="text-[#59615F]/70 block">Consultation Days:</span>
                      <span className="font-semibold text-[#202423]">{doctor.opdDays}</span>
                    </div>
                    <button
                      onClick={() => onNavigate('book', undefined, doctor.id)}
                      className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#202423] hover:bg-[#006B68] rounded-md transition-colors shadow-xs text-center cursor-pointer"
                    >
                      Book With {doctor.name.split(' ')[1]}
                    </button>
                  </div>
                </div>

              </div>
            </article>
          );
        })}
      </section>

      {/* 3. Clinical Multidisciplinary Advantage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] p-8 sm:p-12 rounded-xl border border-[#D8D5CC] text-center max-w-3xl mx-auto space-y-4 shadow-2xs">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#006B68]">
            Internal Review Board / Complex Case Study
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#202423]">
            A True Multi-Specialty Dental Team
          </h2>
          <p className="text-xs sm:text-sm text-[#59615F] leading-relaxed">
            At Lumina, complex restorative and cosmetic cases are reviewed jointly between our Prosthodontist, Orthodontist, and Endodontist. You receive the collective wisdom of specialists under one roof, ensuring your bite, aesthetics, and biological longevity are synchronized.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('book')}
              className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#202423] hover:bg-[#006B68] rounded-md transition-colors cursor-pointer shadow-xs"
            >
              Book Specialist Team Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

