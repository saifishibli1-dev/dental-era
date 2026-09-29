import React, { useState, useRef, useCallback, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  title: string;
  patientProfile?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  title,
  patientProfile,
  className = ''
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure container width accurately on mount and resize
  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });

    resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', updateWidth);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const updatePositionFromClientX = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 2), 98);
    setSliderPosition(percentage);
  }, []);

  // Global mouse / touch release listener when dragging
  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
      if (typeof clientX === 'number') {
        updatePositionFromClientX(clientX);
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);
    window.addEventListener('touchcancel', handlePointerUp);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      window.removeEventListener('touchcancel', handlePointerUp);
    };
  }, [isDragging, updatePositionFromClientX]);

  const handlePointerDown = (clientX: number) => {
    setIsDragging(true);
    updatePositionFromClientX(clientX);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(prev - 5, 2));
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(prev + 5, 98));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(2);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(98);
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div
        ref={containerRef}
        className="relative w-full aspect-4/3 md:aspect-16/10 rounded-xl overflow-hidden select-none cursor-ew-resize bg-[#202423] border border-[#D8D5CC] shadow-2xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#006B68]"
        onMouseDown={(e) => handlePointerDown(e.clientX)}
        onTouchStart={(e) => {
          if (e.touches[0]) handlePointerDown(e.touches[0].clientX);
        }}
        onKeyDown={handleKeyDown}
        role="slider"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Before and after comparison for ${title}`}
        tabIndex={0}
        style={{ touchAction: 'pan-y' }}
      >
        {/* AFTER IMAGE (Base layer) */}
        <img
          src={afterImage}
          alt={`After result: ${title}`}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute top-4 right-4 z-10 px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase bg-[#006B68] text-white rounded-sm pointer-events-none shadow-xs">
          Result
        </div>

        {/* BEFORE IMAGE (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={`Before: ${title}`}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
            style={{ width: containerWidth > 0 ? `${containerWidth}px` : '100%' }}
          />
          <div className="absolute top-4 left-4 z-10 px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase bg-[#202423] text-white rounded-sm pointer-events-none shadow-xs">
            Initial
          </div>
        </div>

        {/* SLIDER DIVIDER LINE */}
        <div
          className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-md pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Centered circular handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FFFFFF] text-[#006B68] shadow-md flex items-center justify-center border border-[#D8D5CC] pointer-events-none">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l-3 3m0 0l3 3m-3-3h12m-3-3l3 3m0 0l-3 3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Caption & Metadata */}
      <div className="mt-3 flex items-baseline justify-between text-xs text-[#59615F]">
        <div>
          <span className="font-semibold text-[#202423]">{title}</span>
          {patientProfile && (
            <span className="ml-2 text-[#59615F]">· {patientProfile}</span>
          )}
        </div>
        <span className="text-[11px] tracking-wide text-[#006B68] font-medium hidden sm:inline">
          Drag slider or use arrow keys
        </span>
      </div>
    </div>
  );
};
