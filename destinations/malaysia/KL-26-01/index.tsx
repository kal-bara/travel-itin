/**
 * Destination: Malaysia / Kuala Lumpur
 * Code: KL-26-01 (Kuala Lumpur, Year 2026, Sequence 01)
 * Amp Chronicle styled destination module
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { Place } from '@/src/types';
import { KL_26_01_DESTINATION, KL_26_01_DAYS, KL_26_01_META } from './data';
import { DayGoogleMap } from '@/src/components/DayGoogleMap';
import { TimelineItem } from '@/src/components/TimelineItem';
import { MasterMapView } from '@/src/components/MasterMapView';
import { FeaturedChronicleBanner } from '@/src/components/FeaturedChronicleBanner';
import {
  ListOrdered,
  Sparkles,
  Compass,
  Car,
  Clock,
  Navigation,
  MapPin,
  Calendar,
  Layers,
  CheckCircle2,
  AlertCircle,
  Search,
} from 'lucide-react';

export { KL_26_01_DESTINATION, KL_26_01_DAYS, KL_26_01_META };

export interface DestinationViewProps {
  currentTab?: 'chronicle' | 'day-1' | 'day-2' | 'day-3' | 'master' | 'notes';
  onSelectTab?: (tab: 'chronicle' | 'day-1' | 'day-2' | 'day-3' | 'master' | 'notes') => void;
  searchQuery?: string;
  selectedPlaceId?: string | null;
  onSelectPlace?: (place: Place | null) => void;
}

export function KL2601DestinationView({
  currentTab = 'chronicle',
  onSelectTab,
  searchQuery = '',
  selectedPlaceId: controlledSelectedPlaceId,
  onSelectPlace: controlledOnSelectPlace,
}: DestinationViewProps) {
  const [internalSelectedPlaceId, setInternalSelectedPlaceId] = useState<string | null>(null);
  const selectedPlaceId =
    controlledSelectedPlaceId !== undefined
      ? controlledSelectedPlaceId
      : internalSelectedPlaceId;

  const handleSelectPlace = (place: Place | null) => {
    if (controlledOnSelectPlace) {
      controlledOnSelectPlace(place);
    } else {
      setInternalSelectedPlaceId(place ? place.id : null);
    }
    if (place) {
      toast(`Focused on Stop #${place.number}: ${place.name}`, {
        description: `${place.time} • ${place.area}`,
        duration: 2500,
      });
    }
  };

  const destination = KL_26_01_DESTINATION;

  // Filter days based on tab
  let daysToRender = destination.days;
  if (currentTab === 'day-1') {
    daysToRender = destination.days.filter((d) => d.dayNumber === 1);
  } else if (currentTab === 'day-2') {
    daysToRender = destination.days.filter((d) => d.dayNumber === 2);
  } else if (currentTab === 'day-3') {
    daysToRender = destination.days.filter((d) => d.dayNumber === 3);
  }

  // Filter places based on search query
  const searchTrimmed = searchQuery.trim().toLowerCase();
  const isSearching = searchTrimmed.length > 0;

  return (
    <div className="w-full space-y-6">
      {/* Featured Banner when on Chronicle Feed */}
      {currentTab === 'chronicle' && !isSearching && (
        <FeaturedChronicleBanner
          totalDays={destination.meta.totalDays}
          totalStops={destination.meta.totalStops}
          onExploreDay={() => {
            const el = document.getElementById('day-card-1');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenMasterMap={() => onSelectTab && onSelectTab('master')}
        />
      )}

      {/* When on Master Map tab, show MasterMapView directly */}
      {currentTab === 'master' ? (
        <MasterMapView
          days={destination.days}
          selectedPlaceId={selectedPlaceId}
          onSelectPlace={handleSelectPlace}
        />
      ) : (
        /* Daily Itinerary Cards in Amp Chronicle styling */
        <div className="space-y-6">
          {/* Status line / Section indicator */}
          <div className="flex items-center justify-between px-1 text-xs font-mono text-[#607065] dark:text-[#88968d] uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span className="text-[#18201a] dark:text-[#dfdfc1] font-bold">
                {isSearching
                  ? `Search Results for "${searchQuery}"`
                  : currentTab === 'chronicle'
                  ? 'All 3 Daily Circuits // Sequential Stream'
                  : `Circuit: Day ${daysToRender[0]?.dayNumber} // ${daysToRender[0]?.badge}`}
              </span>
            </div>

            <span className="text-[11px] text-[#607065] dark:text-[#88968d]">
              {daysToRender.reduce((acc, d) => acc + d.places.length, 0)} Stops Total
            </span>
          </div>

          {/* Render Days */}
          {daysToRender.map((day) => {
            // If searching, filter places
            const matchingPlaces = isSearching
              ? day.places.filter(
                  (p) =>
                    p.name.toLowerCase().includes(searchTrimmed) ||
                    p.description.toLowerCase().includes(searchTrimmed) ||
                    p.area.toLowerCase().includes(searchTrimmed) ||
                    p.tags.some((t) => t.text.toLowerCase().includes(searchTrimmed))
                )
              : day.places;

            if (isSearching && matchingPlaces.length === 0) {
              return null;
            }

            return (
              <section
                key={day.id}
                id={`day-card-${day.dayNumber}`}
                className="bg-white dark:bg-[#0e1411] rounded-sm border border-[#e0e5dd] dark:border-[#223027] overflow-hidden shadow-xs transition-colors"
              >
                {/* Day Header */}
                <div className="bg-[#edf2ea] dark:bg-[#121815] px-4 sm:px-6 py-3.5 border-b border-[#e0e5dd] dark:border-[#223027] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono text-xs font-bold text-[#f6833b] uppercase tracking-wider">
                      Day {String(day.dayNumber).padStart(2, '0')} //
                    </span>
                    <h2 className="font-serif text-base sm:text-lg font-medium text-[#0b0f0c] dark:text-[#f5f6ed]">
                      {day.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    {day.date && (
                      <span className="text-[11px] font-mono text-[#607065] dark:text-[#88968d] hidden sm:inline">
                        {day.date} ·
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-xs font-semibold border ${
                        day.dayNumber === 1
                          ? 'bg-[#fef3c7] dark:bg-[#241c14] text-[#92400e] dark:text-[#fbbf24] border-[#fde68a] dark:border-[#78350f]/60'
                          : day.dayNumber === 2
                          ? 'bg-[#ccfbf1] dark:bg-[#102421] text-[#0f766e] dark:text-[#5eead4] border-[#99f6e4] dark:border-[#0f766e]/60'
                          : 'bg-[#e0e7ff] dark:bg-[#1e1e36] text-[#4338ca] dark:text-[#a5b4fc] border-[#c7d2fe] dark:border-[#4338ca]/60'
                      }`}
                    >
                      {day.badge}
                    </span>

                    <span className="text-[11px] font-mono text-[#607065] dark:text-[#88968d]">
                      {matchingPlaces.length} Stops
                    </span>
                  </div>
                </div>

                {/* Real Interactive Google Map */}
                <div className="p-3 sm:p-5 pb-2">
                  <DayGoogleMap
                    day={day}
                    selectedPlaceId={selectedPlaceId}
                    onSelectPlace={handleSelectPlace}
                  />
                </div>

                {/* Sequential Timeline Items */}
                <div className="p-3 sm:p-5 pt-2">
                  <div className="space-y-2">
                    {matchingPlaces.map((place, index) => (
                      <TimelineItem
                        key={place.id}
                        place={place}
                        color={day.color}
                        isSelected={selectedPlaceId === place.id}
                        onSelect={() =>
                          handleSelectPlace(
                            selectedPlaceId === place.id ? null : place
                          )
                        }
                        isLast={index === matchingPlaces.length - 1}
                      />
                    ))}
                  </div>
                </div>
              </section>
            );
          })}

          {/* Route Optimization Highlights Box (Amp Chronicle callout) */}
          <div className="rounded-sm border border-[#e0e5dd] dark:border-[#223027] bg-[#f6f9f4] dark:bg-[#121815] p-4 sm:p-5 space-y-2.5 transition-colors">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#2d7745] dark:text-[#78d197]">
              <Sparkles className="w-4 h-4 text-[#2d7745] dark:text-[#78d197]" />
              <span>Zero-Backtracking Route Architecture</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xs bg-white dark:bg-[#0b0d0b] border border-[#e0e5dd] dark:border-[#223027] space-y-1 shadow-2xs">
                <span className="font-mono text-[#f6833b] font-bold block text-[11px] uppercase">
                  01. Geographic Clustering
                </span>
                <p className="text-[#607065] dark:text-[#88968d] text-[11px] leading-relaxed">
                  Eliminated the 30 km Federal Highway detour by clustering Petaling Jaya into Day 2.
                </p>
              </div>

              <div className="p-3 rounded-xs bg-white dark:bg-[#0b0d0b] border border-[#e0e5dd] dark:border-[#223027] space-y-1 shadow-2xs">
                <span className="font-mono text-[#2d7745] dark:text-[#78d197] font-bold block text-[11px] uppercase">
                  02. 5-Min Distance Pairs
                </span>
                <p className="text-[#607065] dark:text-[#88968d] text-[11px] leading-relaxed">
                  Sasana Kijang Art Gallery sits directly uphill from Perdana Botanical Gardens.
                </p>
              </div>

              <div className="p-3 rounded-xs bg-white dark:bg-[#0b0d0b] border border-[#e0e5dd] dark:border-[#223027] space-y-1 shadow-2xs">
                <span className="font-mono text-[#2b6cb0] dark:text-[#78b3e8] font-bold block text-[11px] uppercase">
                  03. Time Lock Protected
                </span>
                <p className="text-[#607065] dark:text-[#88968d] text-[11px] leading-relaxed">
                  Ho Kow Kopitiam locked to 12:45 PM to ensure arrival before strict 2:30 PM closure.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Destination Metadata Footer */}
      <footer className="text-center font-mono text-xs text-[#607065] dark:text-[#88968d] py-8 border-t border-[#e0e5dd] dark:border-[#223027] space-y-2 transition-colors">
        <div className="flex items-center justify-center gap-2 text-[#18201a] dark:text-[#dfdfc1]">
          <span className="text-[#607065] dark:text-[#88968d]">DESTINATION IDENTIFIER:</span>
          <span className="font-bold bg-[#edf2ea] dark:bg-[#1c2520] px-2 py-0.5 rounded-xs border border-[#d6ded4] dark:border-[#2e3e34]">
            {destination.meta.country}/{destination.meta.code}
          </span>
        </div>
        <p className="text-[11px] text-[#607065] dark:text-[#88968d]">
          Amp Chronicle Edition • Zero-Backtracking Kuala Lumpur Circuit • 16 Curated Waypoints
        </p>
      </footer>
    </div>
  );
}

export default KL2601DestinationView;
