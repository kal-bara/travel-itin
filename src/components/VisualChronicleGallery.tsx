import React, { useState } from 'react';
import { Place, DayItinerary } from '../types';
import {
  Camera,
  Sparkles,
  MapPin,
  Clock,
  Maximize2,
  ExternalLink,
  Compass,
  Filter,
} from 'lucide-react';
import { toast } from 'sonner';

interface VisualChronicleGalleryProps {
  days: DayItinerary[];
  onSelectPlace: (place: Place) => void;
  onInspectPhoto: (place: Place) => void;
  onJumpToItinerary?: (dayNumber: number, placeId: string) => void;
}

export function VisualChronicleGallery({
  days,
  onSelectPlace,
  onInspectPhoto,
  onJumpToItinerary,
}: VisualChronicleGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDayFilter, setSelectedDayFilter] = useState<number | 'all'>('all');

  const allPlaces = days.flatMap((d) =>
    d.places.map((p) => ({ ...p, dayNumber: d.dayNumber, dayColor: d.color, dayBadge: d.badge }))
  );

  // Categories
  const categories = [
    'all',
    'Architecture',
    'Culinary',
    'Heritage & Cafe',
    'Nature & Skyline',
    'Culture',
    'Atmosphere',
  ];

  const filteredPlaces = allPlaces.filter((place) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (place.photo?.category &&
        place.photo.category.toLowerCase().includes(selectedCategory.toLowerCase()));

    const matchesDay =
      selectedDayFilter === 'all' || place.dayNumber === selectedDayFilter;

    return matchesCategory && matchesDay;
  });

  return (
    <div className="space-y-6">
      {/* Editorial Gallery Header Card */}
      <div className="relative rounded-sm border border-[#e0e5dd] dark:border-[#223027] bg-[#fbfdf9] dark:bg-[#121915] p-5 sm:p-7 overflow-hidden shadow-xs">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#f6833b]/10 via-[#2d7745]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#f6833b]">
            <Camera className="w-4 h-4" />
            <span>Iconic Visual Chronicle // All 16 Landmarks</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#0b0f0c] dark:text-[#f5f6ed] leading-tight">
            Visual Anatomy of Kuala Lumpur
          </h2>

          <p className="text-xs sm:text-sm text-[#526357] dark:text-[#88968d] leading-relaxed">
            Every waypoint captured through architectural symmetry, pre-war colonial textures, and heritage culinary rituals. Click any photograph to inspect high-resolution frames, best photography lighting angles, and GPS coordinate locks.
          </p>

          {/* Quick Stats Pill */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-[#607065] dark:text-[#88968d]">
            <span className="px-2.5 py-1 rounded-xs bg-[#edf2ea] dark:bg-[#19241e] border border-[#d6ded4] dark:border-[#26372d] text-[#18201a] dark:text-[#dfdfc1] font-semibold">
              16 Iconic Stops
            </span>
            <span className="px-2.5 py-1 rounded-xs bg-[#edf2ea] dark:bg-[#19241e] border border-[#d6ded4] dark:border-[#26372d] text-[#18201a] dark:text-[#dfdfc1] font-semibold">
              3 Daily Circuits
            </span>
            <span className="px-2.5 py-1 rounded-xs bg-[#edf2ea] dark:bg-[#19241e] border border-[#d6ded4] dark:border-[#26372d] text-[#18201a] dark:text-[#dfdfc1] font-semibold">
              Zero-Backtracking Flow
            </span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-sm border border-[#e0e5dd] dark:border-[#223027] bg-white dark:bg-[#0e1411]">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          <span className="text-[11px] text-[#607065] dark:text-[#88968d] mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#f6833b]" />
            Theme:
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-xs text-[11px] uppercase tracking-wider transition cursor-pointer border ${
                  isActive
                    ? 'bg-[#f6833b] text-[#0b0d0b] border-[#f6833b] font-bold shadow-2xs'
                    : 'bg-[#edf2ea] dark:bg-[#151e19] text-[#607065] dark:text-[#88968d] hover:text-[#18201a] dark:hover:text-[#dfdfc1] border-[#d6ded4] dark:border-[#223027]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Day Circuit Filter */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <span className="text-[11px] text-[#607065] dark:text-[#88968d]">Circuit:</span>
          {(['all', 1, 2, 3] as const).map((dayVal) => {
            const isActive = selectedDayFilter === dayVal;
            return (
              <button
                key={dayVal}
                type="button"
                onClick={() => setSelectedDayFilter(dayVal)}
                className={`px-2 py-0.5 rounded-xs text-[11px] uppercase transition cursor-pointer border ${
                  isActive
                    ? 'bg-[#18201a] dark:bg-[#f5f6ed] text-white dark:text-[#0b0d0b] font-bold'
                    : 'bg-[#edf2ea] dark:bg-[#151e19] text-[#607065] dark:text-[#88968d] border-[#d6ded4] dark:border-[#223027]'
                }`}
              >
                {dayVal === 'all' ? 'All Days' : `Day ${dayVal}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Iconic Visual Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredPlaces.map((place) => {
          if (!place.photo) return null;

          return (
            <article
              key={place.id}
              onClick={() => onInspectPhoto(place)}
              className="group relative rounded-sm border border-[#e0e5dd] dark:border-[#223027] bg-white dark:bg-[#0e1411] overflow-hidden flex flex-col justify-between hover:border-[#f6833b]/60 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              {/* Image Container with aspect ratio */}
              <div className="relative w-full h-52 sm:h-56 bg-stone-900 overflow-hidden">
                <img
                  src={place.photo.url}
                  alt={place.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-104"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
                  <span
                    className="font-mono text-[10px] uppercase font-bold text-white px-2 py-0.5 rounded-xs shadow-xs"
                    style={{ backgroundColor: place.dayColor }}
                  >
                    Day {place.dayNumber} · Stop {place.number}
                  </span>

                  {place.photo.category && (
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-xs bg-black/70 backdrop-blur-md border border-white/20 text-[#fbbf24] font-semibold">
                      {place.photo.category}
                    </span>
                  )}
                </div>

                {/* Expand icon hover indicator */}
                <div className="absolute bottom-2.5 right-2.5 p-1.5 rounded-xs bg-black/60 group-hover:bg-[#f6833b] text-white group-hover:text-black transition-colors backdrop-blur-xs">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-2.5 left-2.5 right-12 text-white">
                  <p className="text-xs font-serif italic text-white/95 line-clamp-1 drop-shadow-sm">
                    "{place.photo.caption}"
                  </p>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#607065] dark:text-[#88968d]">
                    <span className="flex items-center gap-1 text-[#f6833b] font-semibold">
                      <Clock className="w-3 h-3" />
                      {place.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {place.area}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-medium text-[#0b0f0c] dark:text-[#f5f6ed] group-hover:text-[#f6833b] transition-colors line-clamp-1">
                    {place.name}
                  </h3>

                  <p className="text-xs text-[#526357] dark:text-[#88968d] line-clamp-2 leading-relaxed">
                    {place.description}
                  </p>
                </div>

                {/* Photo Tip Snippet */}
                {place.photo.photoTip && (
                  <div className="p-2 rounded-xs bg-[#f4f7f2] dark:bg-[#141d18] border border-[#dce3da] dark:border-[#1e2a22] text-[10px] font-mono text-[#4a5e50] dark:text-[#889e90] flex items-start gap-1.5">
                    <Camera className="w-3 h-3 text-[#2d7745] dark:text-[#78d197] shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{place.photo.photoTip}</span>
                  </div>
                )}

                {/* Bottom Quick-Action Row */}
                <div className="pt-2 border-t border-[#e0e5dd] dark:border-[#223027] flex items-center justify-between text-xs font-mono">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPlace(place);
                      if (onJumpToItinerary) {
                        onJumpToItinerary(place.dayNumber, place.id);
                      }
                    }}
                    className="text-[#f6833b] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <span>View in Circuit</span>
                    <Compass className="w-3 h-3" />
                  </button>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${place.name}, Kuala Lumpur`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[#607065] dark:text-[#88968d] hover:text-[#2d7745] dark:hover:text-[#78d197] flex items-center gap-0.5"
                    title="Open in Google Maps"
                  >
                    <span>Map</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
