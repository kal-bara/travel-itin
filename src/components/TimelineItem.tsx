import React, { type MouseEvent } from 'react';
import { Place } from '../types';
import { MapPin, Clock, ExternalLink, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

export interface TimelineItemProps {
  key?: string;
  place: Place;
  color: string;
  isSelected: boolean;
  onSelect: () => void;
  isLast: boolean;
}

export function TimelineItem({
  place,
  color,
  isSelected,
  onSelect,
  isLast,
}: TimelineItemProps) {
  const copyCoordinates = (e: MouseEvent) => {
    e.stopPropagation();
    const coordStr = `${place.coordinates.lat}, ${place.coordinates.lng}`;
    navigator.clipboard.writeText(coordStr);
    toast.success('Coordinates copied to clipboard', {
      description: `${place.name}: ${coordStr}`,
      duration: 2000,
    });
  };

  const formattedNumber = String(place.number).padStart(2, '0');

  return (
    <div
      id={`timeline-item-${place.id}`}
      onClick={onSelect}
      className={`relative flex flex-col sm:flex-row items-start gap-3 sm:gap-5 p-4 sm:p-5 rounded-sm cursor-pointer border select-none transition-all duration-150 ${
        isSelected
          ? 'bg-[#ebf3e8] dark:bg-[#18241e] border-[#f6833b] ring-1 ring-[#f6833b]/40 shadow-sm'
          : 'bg-white dark:bg-[#121815]/80 hover:bg-[#f6f9f4] dark:hover:bg-[#17211b] border-[#e0e5dd] dark:border-[#223027]'
      }`}
    >
      {/* Stop Number & Timestamp Column */}
      <div className="flex sm:flex-col items-center sm:items-start justify-between w-full sm:w-36 shrink-0 gap-2">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-sm flex items-center justify-center font-mono text-xs font-bold transition-transform duration-150 shadow-2xs"
            style={{
              backgroundColor: isSelected ? '#f6833b' : color,
              color: isSelected ? '#0b0d0b' : '#ffffff',
            }}
          >
            {formattedNumber}
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-mono font-bold text-[#18201a] dark:text-[#dfdfc1] flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#f6833b]" />
              {place.time}
            </span>
            <span className="text-[11px] font-mono text-[#607065] dark:text-[#88968d] flex items-center gap-1">
              <span>{place.area}</span>
              {place.globalNumber && (
                <span className="opacity-60 text-[10px]">· #{place.globalNumber}</span>
              )}
            </span>
          </div>
        </div>

        {/* Focus indicator on mobile */}
        <span
          className={`sm:hidden text-[10px] font-mono uppercase px-2 py-0.5 rounded-xs border ${
            isSelected
              ? 'bg-[#f6833b] text-[#0b0d0b] border-[#f6833b] font-bold'
              : 'text-[#607065] dark:text-[#88968d] border-[#d2ddd0] dark:border-[#223027]'
          }`}
        >
          {isSelected ? 'Focused' : 'Map Pin'}
        </span>
      </div>

      {/* Content Column */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <h3
            className={`text-base sm:text-lg font-serif tracking-tight leading-snug transition-colors duration-150 ${
              isSelected
                ? 'text-[#f6833b] font-medium'
                : 'text-[#0b0f0c] dark:text-[#f5f6ed] hover:text-[#f6833b]'
            }`}
          >
            {place.name}
          </h3>

          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className={`hidden sm:inline-flex text-[11px] font-mono px-2 py-0.5 rounded-xs border items-center gap-1 transition-all duration-150 ${
                isSelected
                  ? 'bg-[#f6833b] text-[#0b0d0b] border-[#f6833b] font-bold'
                  : 'text-[#607065] dark:text-[#88968d] hover:text-[#18201a] dark:hover:text-[#dfdfc1] border-[#d2ddd0] dark:border-[#223027] bg-[#edf2ea] dark:bg-[#101613]'
              }`}
            >
              <MapPin className="w-3 h-3" />
              <span>{isSelected ? 'Focused' : 'Pin'}</span>
            </span>

            <button
              type="button"
              onClick={copyCoordinates}
              className="p-1 text-[#607065] dark:text-[#88968d] hover:text-[#18201a] dark:hover:text-[#dfdfc1] rounded-xs hover:bg-[#e4eae0] dark:hover:bg-[#1c2520] border border-transparent hover:border-[#d2ddd0] dark:hover:border-[#2e3e34] transition cursor-pointer"
              title="Copy GPS coordinates"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${place.name}, Kuala Lumpur`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                toast.success('Opening Google Maps', {
                  description: place.name,
                });
              }}
              className="p-1 text-[#607065] dark:text-[#88968d] hover:text-[#2d7745] dark:hover:text-[#78d197] rounded-xs hover:bg-[#e4eae0] dark:hover:bg-[#1c2520] border border-transparent hover:border-[#d2ddd0] dark:hover:border-[#2e3e34] transition"
              title="Open location in Google Maps"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#526357] dark:text-[#88968d] leading-relaxed mb-3">
          {place.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          {place.tags.map((tag, idx) => {
            let tagStyle =
              'bg-[#edf2ea] dark:bg-[#151e19] text-[#526357] dark:text-[#88968d] border-[#d6ded4] dark:border-[#223027]';
            if (tag.type === 'highlight') {
              tagStyle =
                'bg-[#e3f2e6] dark:bg-[#122218] text-[#2d7745] dark:text-[#78d197] border-[#c0dec7] dark:border-[#1f3c2b] font-semibold';
            } else if (tag.type === 'cost') {
              tagStyle =
                'bg-[#e5eff8] dark:bg-[#16212b] text-[#285d88] dark:text-[#78b3e8] border-[#c4dcfa] dark:border-[#223344] font-semibold';
            } else if (tag.type === 'opt') {
              tagStyle =
                'bg-[#fbf0e4] dark:bg-[#261c16] text-[#b45309] dark:text-[#e5a05b] border-[#f0dac4] dark:border-[#3f291a] font-semibold';
            }
            return (
              <span
                key={idx}
                className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-xs border ${tagStyle}`}
              >
                {tag.text}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
