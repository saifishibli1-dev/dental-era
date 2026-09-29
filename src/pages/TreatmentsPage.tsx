import React, { useState } from 'react';
import { Page, Treatment } from '../types';
import { TREATMENTS } from '../data/treatments';
import { TreatmentCard } from '../components/TreatmentCard';

interface TreatmentsPageProps {
  onNavigate: (page: Page, treatmentId?: string) => void;
}

export const TreatmentsPage: React.FC<TreatmentsPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Surgical', 'Orthodontics', 'Cosmetic', 'Restorative', 'Preventive'];

  const filteredTreatments = TREATMENTS.filter((t) => {
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Header Banner */}
      <section className="pt-8 sm:pt-12">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#006B68]">
            Comprehensive Dental Disciplines
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#202423] mt-2 tracking-tight">
            Specialized Care. Zero Compromise.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#59615F] leading-relaxed max-w-2xl mx-auto">
            From single-sitting microscopic endodontics to full-mouth Straumann® implant reconstructions, explore our specialized clinical services designed for long-term health and aesthetics.
          </p>
        </div>
      </section>

      {/* 2. Interactive Filter Bar & Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-8 border-b border-[#D8D5CC]">
          
          {/* Functional Segmented Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FFFFFF] rounded-lg border border-[#D8D5CC] max-w-fit shadow-2xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#202423] text-white shadow-xs font-semibold'
                    : 'text-[#59615F] hover:text-[#202423]'
                }`}
              >
                {cat === 'All' ? 'All Treatments' : cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search treatments or concerns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-[#FFFFFF] border border-[#D8D5CC] rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#006B68] focus:border-[#006B68] text-[#202423] placeholder:text-[#59615F]/60 shadow-2xs"
            />
            <svg
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#59615F] pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#59615F] hover:text-[#202423] p-1 text-xs cursor-pointer rounded"
                aria-label="Clear search input"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 3. Treatments Grid */}
        <div className="pt-8">
          {filteredTreatments.length === 0 ? (
            <div className="text-center py-16 bg-[#FFFFFF] rounded-xl border border-[#D8D5CC] p-8 shadow-2xs">
              <p className="text-[#59615F] text-sm">
                No treatments found matching "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs text-[#006B68] font-semibold underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTreatments.map((treatment) => (
                <TreatmentCard
                  key={treatment.id}
                  treatment={treatment}
                  onSelect={(id) => onNavigate('treatment-detail', id)}
                  onBook={(id) => onNavigate('book', id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Consultation Inquiry Footer (#FFFFFF Card against Warm Ivory) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] p-8 sm:p-12 rounded-xl border border-[#D8D5CC] text-center max-w-3xl mx-auto space-y-4 shadow-2xs">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#202423]">
            Unsure Which Treatment Fits Your Smile?
          </h2>
          <p className="text-xs sm:text-sm text-[#59615F] max-w-xl mx-auto leading-relaxed">
            Our clinical team performs full 3D CBCT bone and soft-tissue mappings during your first visit to recommend conservative, biological options tailored to your lifestyle.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('book')}
              className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#202423] hover:bg-[#006B68] rounded-md cursor-pointer transition-colors shadow-xs"
            >
              Schedule Diagnostic Evaluation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

