import type { MouseEvent } from 'react';
import { Place } from '../types';
import { MapPin, Clock, ExternalLink, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface TimelineItemProps {
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

  return (
    <div
      id={`timeline-item-${place.id}`}
      onClick={onSelect}
      className={`relative flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl cursor-pointer border select-none transition-[transform,background-color,border-color,box-shadow] duration-150 active:scale-[0.99] ${
        isSelected
          ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/25 shadow-xs'
          : 'bg-transparent hover:bg-stone-50/90 border-transparent hover:border-stone-200'
      }`}
    >
      {/* Time & Dot Column */}
      <div className="flex sm:flex-col items-center sm:items-start gap-2.5 sm:gap-1 min-w-[125px]">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-xs transition-transform duration-150"
            style={{
              backgroundColor: color,
              transform: isSelected ? 'scale(1.15)' : 'scale(1)',
            }}
          >
            {place.number}
          </div>
          <span className="text-xs font-bold tracking-tight text-amber-900 flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-700" />
            {place.time}
          </span>
        </div>
        <span className="text-[11px] font-medium text-stone-500 pl-8 sm:pl-0 sm:mt-1">
          {place.area}
        </span>
      </div>

      {/* Content Column */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3
            className={`text-base font-bold transition-colors duration-150 ${
              isSelected ? 'text-amber-950' : 'text-stone-900'
            }`}
          >
            {place.number}. {place.name}
          </h3>

          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 transition-all duration-150 ${
                isSelected
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-500 hover:text-stone-800 bg-stone-100 hover:bg-stone-200'
              }`}
            >
              <MapPin className="w-3 h-3" />
              <span className="hidden sm:inline">
                {isSelected ? 'Viewing' : 'Focus'}
              </span>
            </span>

            <button
              type="button"
              onClick={copyCoordinates}
              className="p-1 text-stone-400 hover:text-stone-700 rounded hover:bg-stone-100 transition cursor-pointer"
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
              className="p-1 text-stone-400 hover:text-blue-600 rounded hover:bg-blue-50 transition"
              title="Open location in Google Maps"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <p className="text-sm text-stone-600 leading-relaxed mb-2.5">
          {place.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          {place.tags.map((tag, i) => {
            let style = 'bg-stone-100 text-stone-600 border-stone-200';
            if (tag.type === 'highlight') {
              style = 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold';
            } else if (tag.type === 'cost') {
              style = 'bg-blue-50 text-blue-800 border-blue-200 font-semibold';
            } else if (tag.type === 'opt') {
              style = 'bg-rose-50 text-rose-800 border-rose-200 font-semibold';
            }
            return (
              <span
                key={i}
                className={`text-[11px] px-2 py-0.5 rounded-md border ${style}`}
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
