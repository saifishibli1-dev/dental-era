import React, { useState } from 'react';
import { Page } from '../types';
import { GALLERY_ITEMS, BEFORE_AFTER_CASES } from '../data/clinicData';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { SafeImage } from '../components/SafeImage';

interface GalleryPageProps {
  onNavigate: (page: Page) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'transformations' | 'clinic' | 'technology'>('transformations');

  const clinicPhotos = GALLERY_ITEMS.filter((item) =>
    activeTab === 'clinic'
      ? item.category === 'Clinic Interiors' || item.category === 'Safety & Hygiene'
      : activeTab === 'technology'
      ? item.category === 'Technology'
      : true
  );

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      {/* 1. Header Banner */}
      <section className="pt-8 sm:pt-12">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#006B68]">
            Visual Proof & Studio Tour
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#202423] mt-2 tracking-tight">
            The Lumina Clinical Gallery.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#59615F] leading-relaxed max-w-2xl mx-auto">
            Witness firsthand the meticulous smile transformations performed in our Vasant Vihar clinic, alongside a visual tour of our private suites, 3D imaging technology, and hospital-grade sterilization cleanroom.
          </p>
        </div>
      </section>

      {/* 2. Gallery Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 p-1.5 bg-[#FFFFFF] border border-[#D8D5CC] rounded-lg max-w-md mx-auto mb-12 shadow-2xs">
          <button
            onClick={() => setActiveTab('transformations')}
            className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer text-center ${
              activeTab === 'transformations'
                ? 'bg-[#202423] text-white shadow-xs font-bold'
                : 'text-[#59615F] hover:text-[#202423]'
            }`}
          >
            Smile Transformations
          </button>
          <button
            onClick={() => setActiveTab('clinic')}
            className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer text-center ${
              activeTab === 'clinic'
                ? 'bg-[#202423] text-white shadow-xs font-bold'
                : 'text-[#59615F] hover:text-[#202423]'
            }`}
          >
            Studio & Suites
          </button>
          <button
            onClick={() => setActiveTab('technology')}
            className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer text-center ${
              activeTab === 'technology'
                ? 'bg-[#202423] text-white shadow-xs font-bold'
                : 'text-[#59615F] hover:text-[#202423]'
            }`}
          >
            3D Tech & Equipment
          </button>
        </div>

        {/* 3. Tab Contents */}
        {activeTab === 'transformations' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {BEFORE_AFTER_CASES.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#D8D5CC] shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#59615F] mb-3">
                      <span className="font-semibold text-[#006B68] uppercase tracking-wider">
                        {item.treatmentName}
                      </span>
                      <span>Treatment Time: {item.duration}</span>
                    </div>

                    <BeforeAfterSlider
                      beforeImage={item.beforeImage}
                      afterImage={item.afterImage}
                      title={item.title}
                      patientProfile={item.patientProfile}
                    />
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#D8D5CC]/60 text-xs text-[#59615F] leading-relaxed">
                    <span className="font-semibold text-[#202423] block mb-0.5">
                      Clinical Notes:
                    </span>
                    {item.clinicalNotes}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(activeTab === 'clinic' || activeTab === 'technology') && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clinicPhotos.map((item) => (
              <article
                key={item.id}
                className="bg-[#FFFFFF] rounded-xl border border-[#D8D5CC] overflow-hidden shadow-2xs group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-4/3 overflow-hidden bg-[#EAE7DE]">
                    <SafeImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#202423]/85 backdrop-blur-xs text-white text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-sm">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-[#202423] leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#59615F] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 4. Booking Invitation */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-[#202423] text-white p-8 sm:p-12 rounded-xl border border-[#D8D5CC]/20 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8FA9A1]">
            Visit Us in South Delhi
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-white">
            Tour the Studio During Your First Consultation
          </h2>
          <p className="text-[#D8D5CC]/80 text-xs sm:text-sm max-w-lg mx-auto">
            Experience our private operatories, meet the doctors, and witness our sterile protocols firsthand in Vasant Vihar.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('book')}
              className="px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#202423] bg-[#FAF9F5] hover:bg-[#F3EFE7] rounded-md cursor-pointer transition-colors shadow-xs"
            >
              Reserve Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

