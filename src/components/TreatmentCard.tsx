import React from 'react';
import { Treatment, Page } from '../types';
import { SafeImage } from './SafeImage';

interface TreatmentCardProps {
  treatment: Treatment;
  onSelect: (treatmentId: string) => void;
  onBook: (treatmentId: string) => void;
}

export const TreatmentCard: React.FC<TreatmentCardProps> = ({
  treatment,
  onSelect,
  onBook
}) => {
  return (
    <article className="group bg-[#FFFFFF] rounded-xl border border-[#D8D5CC] overflow-hidden flex flex-col justify-between transition-colors duration-200 hover:border-[#8FA9A1] shadow-2xs">
      <div>
        {/* Visual Header */}
        <div className="relative aspect-16/10 overflow-hidden bg-[#EAE7DE] cursor-pointer" onClick={() => onSelect(treatment.id)}>
          <SafeImage
            src={treatment.image}
            alt={treatment.name}
            className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
          />
          {/* Subtle Category Kicker */}
          <div className="absolute top-3 left-3 bg-[#202423] text-white text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-sm">
            {treatment.category}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <h3
            onClick={() => onSelect(treatment.id)}
            className="font-serif text-xl sm:text-2xl text-[#202423] group-hover:text-[#006B68] transition-colors cursor-pointer leading-snug"
          >
            {treatment.name}
          </h3>
          <p className="mt-1.5 text-xs font-medium text-[#006B68] tracking-wide">
            {treatment.tagline}
          </p>
          <p className="mt-3 text-sm text-[#59615F] line-clamp-3 leading-relaxed">
            {treatment.shortDescription}
          </p>

          {/* Unboxed Metadata row */}
          <div className="mt-5 pt-4 border-t border-[#D8D5CC]/80 flex items-center justify-between text-xs text-[#59615F]">
            <div>
              <span className="text-[#59615F]/70">Duration:</span>{' '}
              <span className="font-medium text-[#202423]">{treatment.duration}</span>
            </div>
            <div>
              <span className="text-[#59615F]/70">Visits:</span>{' '}
              <span className="font-medium text-[#202423]">{treatment.sessions}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="px-6 pb-6 pt-2 flex items-center gap-3">
        <button
          onClick={() => onSelect(treatment.id)}
          className="flex-1 py-2.5 text-xs font-semibold tracking-wider text-[#202423] bg-[#F3EFE7] hover:bg-[#FAF9F5] border border-[#202423] rounded-md transition-colors text-center cursor-pointer"
        >
          View Details
        </button>
        <button
          onClick={() => onBook(treatment.id)}
          className="flex-1 py-2.5 text-xs font-semibold tracking-wider text-white bg-[#202423] hover:bg-[#006B68] rounded-md transition-colors text-center cursor-pointer shadow-xs"
        >
          Book Now
        </button>
      </div>
    </article>
  );
};
