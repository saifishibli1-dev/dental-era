import React, { useState, useEffect } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackText?: string;
  aspectRatioClass?: string;
  containerClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackText,
  className = '',
  aspectRatioClass = '',
  containerClassName = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset state whenever the source URL changes
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  if (hasError) {
    return (
      <div
        className={`w-full h-full bg-[#FFFFFF] flex flex-col items-center justify-center p-6 text-center text-[#59615F] border border-[#D8D5CC] ${aspectRatioClass} ${containerClassName}`}
      >
        <svg
          className="w-10 h-10 mb-2 text-[#006B68]/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 21a9 9 0 100-18 9 9 0 000 18z M9 10h.01 M15 10h.01 M9.5 15a3.5 3.5 0 005 0"
          />
        </svg>
        <span className="text-xs font-medium text-[#202423] tracking-wide uppercase">
          Lumina Dental Studio
        </span>
        <span className="text-xs text-[#59615F] mt-1 max-w-[220px]">
          {fallbackText || alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#EAE7DE] ${aspectRatioClass} ${containerClassName}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[#EAE7DE] animate-pulse pointer-events-none" />
      )}
    </div>
  );
};
