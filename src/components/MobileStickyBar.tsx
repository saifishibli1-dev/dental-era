import React from 'react';
import { Page } from '../types';

interface MobileStickyBarProps {
  onNavigate: (page: Page) => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onNavigate }) => {
  return (
    <aside
      aria-label="Quick appointment and contact actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#202423] text-white border-t border-[#D8D5CC]/20 px-3 py-2 shadow-2xl"
    >
      <div className="grid grid-cols-3 gap-2 items-center max-w-md mx-auto">
        <a
          href="tel:+911149876500"
          className="flex flex-col items-center justify-center py-1.5 px-2 text-[#D8D5CC] hover:text-white active:bg-black/20 rounded transition-colors text-center"
        >
          <svg className="w-4 h-4 mb-0.5 text-[#8FA9A1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-[11px] font-medium tracking-wide uppercase">Call Clinic</span>
        </a>

        <a
          href="https://wa.me/919811054321?text=Hello%20Lumina%20Dental%20Studio%2C%20I%20would%20like%20to%20inquire%20about%20an%20appointment."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 text-[#D8D5CC] hover:text-white active:bg-black/20 rounded transition-colors text-center"
        >
          <svg className="w-4 h-4 mb-0.5 text-[#8FA9A1]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.541 1.947.881 3.096.881 3.181 0 5.768-2.587 5.768-5.766.001-3.181-2.585-5.768-5.768-5.768zm3.398 8.163c-.144.405-.837.774-1.17.823-.312.045-.694.06-2.029-.496-1.527-.636-2.507-2.18-2.584-2.282-.077-.102-.622-.828-.622-1.58 0-.751.393-1.121.533-1.266.14-.145.305-.181.407-.181.102 0 .204.002.293.007.094.005.219-.036.342.261.127.306.435 1.059.473 1.136.038.077.064.167.013.269-.051.102-.077.166-.153.255-.077.089-.161.199-.23.268-.077.077-.157.161-.068.314.089.153.396.653.849 1.057.583.52 1.074.681 1.227.758.153.077.243.064.332-.038.089-.102.382-.446.484-.599.102-.153.204-.128.344-.077.14.051.888.419 1.04.496.153.076.255.115.293.178.038.064.038.37-.106.775z"/>
          </svg>
          <span className="text-[11px] font-medium tracking-wide uppercase">WhatsApp</span>
        </a>

        <button
          onClick={() => {
            onNavigate('book');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center justify-center py-1.5 px-3 bg-[#006B68] hover:bg-[#005754] active:bg-[#004745] text-white rounded font-medium shadow-xs transition-colors cursor-pointer text-center"
        >
          <svg className="w-4 h-4 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-[11px] font-semibold tracking-wider uppercase">Book Now</span>
        </button>
      </div>
    </aside>
  );
};
