/**
 * Destination: Malaysia / Kuala Lumpur
 * Code: KL-26-01 (Kuala Lumpur, Year 2026, Sequence 01)
 * Final compiled/rendered destination module
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { Place } from '@/src/types';
import { KL_26_01_DESTINATION, KL_26_01_DAYS, KL_26_01_META } from './data';
import { DayGoogleMap } from '@/src/components/DayGoogleMap';
import { TimelineItem } from '@/src/components/TimelineItem';
import { MasterMapView } from '@/src/components/MasterMapView';
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
} from 'lucide-react';

export { KL_26_01_DESTINATION, KL_26_01_DAYS, KL_26_01_META };

interface DestinationViewProps {
  initialViewMode?: 'daily' | 'master';
}

export function KL2601DestinationView({
  initialViewMode = 'daily',
}: DestinationViewProps) {
  const [viewMode, setViewMode] = useState<'daily' | 'master'>(initialViewMode);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const handleSelectPlace = (place: Place | null) => {
    setSelectedPlaceId(place ? place.id : null);
    if (place) {
      toast(`Focused on Stop #${place.number}: ${place.name}`, {
        description: `${place.time} • ${place.area}`,
        duration: 2500,
      });
    }
  };

  const destination = KL_26_01_DESTINATION;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Destination Hero / Identity Card */}
      <header className="text-center py-8 px-4 sm:px-6 bg-linear-to-br from-amber-50/90 via-amber-100/50 to-amber-200/40 rounded-2xl border border-amber-200 shadow-xs">
        {/* Destination Convention Tag & Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-900 text-amber-300 font-mono text-xs font-bold tracking-wider rounded-full shadow-2xs">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{destination.meta.country}/{destination.meta.code}</span>
          </div>

          <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-700 text-white text-xs font-bold tracking-wider uppercase rounded-full shadow-2xs">
            <Sparkles className="w-3 h-3" />
            <span>{destination.meta.badge}</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-950 tracking-tight mb-2">
          {destination.meta.title}
        </h1>

        <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-5">
          {destination.meta.description}
        </p>

        {/* Quick Stats Strip */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-stone-700 mb-5">
          <span className="flex items-center gap-1 px-2.5 py-1 bg-white/70 rounded-md border border-amber-200/80">
            <Calendar className="w-3.5 h-3.5 text-amber-700" />
            <span>{destination.meta.totalDays} Days Structured</span>
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 bg-white/70 rounded-md border border-amber-200/80">
            <MapPin className="w-3.5 h-3.5 text-amber-700" />
            <span>{destination.meta.totalStops} Geographic Stops</span>
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 bg-white/70 rounded-md border border-amber-200/80">
            <Car className="w-3.5 h-3.5 text-amber-700" />
            <span>Save 1.5–2 hrs / day</span>
          </span>
        </div>

        {/* View Mode Switcher with Emil Kowalski spring-animated sliding pill */}
        <div className="relative inline-flex items-center bg-white/95 p-1 rounded-xl border border-amber-300/80 shadow-xs">
          <button
            type="button"
            id="tab-daily-view"
            onClick={() => {
              if (viewMode !== 'daily') {
                setViewMode('daily');
                toast('Switched to Daily Cards & Maps', {
                  description: 'Day-by-day sequential itineraries with embedded Google Maps',
                });
              }
            }}
            className={`relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors duration-150 ${
              viewMode === 'daily'
                ? 'text-white'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {viewMode === 'daily' && (
              <motion.div
                layoutId="active-view-pill"
                className="absolute inset-0 bg-amber-800 rounded-lg shadow-xs"
                transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <ListOrdered className="w-3.5 h-3.5" />
              <span>Daily Cards & Maps</span>
            </span>
          </button>

          <button
            type="button"
            id="tab-master-view"
            onClick={() => {
              if (viewMode !== 'master') {
                setViewMode('master');
                toast('Switched to Master 3-Day Map', {
                  description: 'Comprehensive 16-stop multi-route overlay across KL, PJ & Ampang',
                });
              }
            }}
            className={`relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors duration-150 ${
              viewMode === 'master'
                ? 'text-white'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {viewMode === 'master' && (
              <motion.div
                layoutId="active-view-pill"
                className="absolute inset-0 bg-amber-800 rounded-lg shadow-xs"
                transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Master 3-Day Map</span>
            </span>
          </button>
        </div>
      </header>

      {/* Optimization Highlights Alert */}
      <div className="bg-emerald-50/90 border border-emerald-200 rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-emerald-900 leading-relaxed shadow-xs">
        <div className="font-bold text-emerald-950 text-sm mb-1.5 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>Geographic Route Optimizations:</span>
        </div>
        <ol className="list-decimal pl-5 space-y-1 text-emerald-800">
          <li>
            <strong>Zero Backtracking:</strong> Replaced the 30 km round-trip backtrack to Hideaway Cafe on Day 1 by seamlessly clustering it with Petaling Jaya on Day 2.
          </li>
          <li>
            <strong>Logical Pairing:</strong> Linked Bank Negara Museum directly to Perdana Botanical Gardens (just 5 mins away).
          </li>
          <li>
            <strong>Timing Safe:</strong> Rescheduled Chinatown's Ho Kow Kopitiam to lunch (12:45 PM) so you never risk arriving after their 2:30 PM afternoon closure.
          </li>
        </ol>
      </div>

      {/* Render View Mode */}
      {viewMode === 'master' ? (
        <MasterMapView
          days={destination.days}
          selectedPlaceId={selectedPlaceId}
          onSelectPlace={handleSelectPlace}
        />
      ) : (
        /* Daily Cards View with Embedded Interactive Google Maps */
        <div className="space-y-8">
          {destination.days.map((day) => (
            <section
              key={day.id}
              id={`day-card-${day.dayNumber}`}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
            >
              {/* Day Header */}
              <div className="bg-stone-50/80 px-4 sm:px-6 py-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-2.5">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-stone-900">
                    {day.title}
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {day.places.length} curated stops in geographic sequence
                  </p>
                </div>

                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-md"
                  style={{
                    backgroundColor: `${day.color}15`,
                    color: day.color,
                    border: `1px solid ${day.color}30`,
                  }}
                >
                  {day.badge}
                </span>
              </div>

              {/* Real Interactive Google Map */}
              <div className="p-4 sm:p-5 pb-2">
                <DayGoogleMap
                  day={day}
                  selectedPlaceId={selectedPlaceId}
                  onSelectPlace={handleSelectPlace}
                />
              </div>

              {/* Interactive Timeline */}
              <div className="p-4 sm:p-6 pt-2">
                <div className="space-y-1.5 divide-y divide-gray-100">
                  {day.places.map((place, index) => (
                    <div key={place.id} className="pt-2 first:pt-0">
                      <TimelineItem
                        place={place}
                        color={day.color}
                        isSelected={selectedPlaceId === place.id}
                        onSelect={() =>
                          handleSelectPlace(
                            selectedPlaceId === place.id ? null : place
                          )
                        }
                        isLast={index === day.places.length - 1}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Practical Travel Insights */}
      <div className="bg-stone-50 border border-dashed border-stone-300 rounded-xl p-5 sm:p-6 text-xs sm:text-sm">
        <h3 className="font-bold text-stone-800 text-sm mb-2.5 flex items-center gap-2">
          <Compass className="w-4 h-4 text-amber-700" />
          <span>Why this route works better in real life</span>
        </h3>
        <ul className="space-y-2 text-stone-600 pl-1">
          <li className="flex items-start gap-2">
            <Car className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>
              <strong>Total Transit Saved:</strong> Eliminates roughly 50+ km of redundant zig-zag driving across Kuala Lumpur and Petaling Jaya.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <span>
              <strong>Traffic Alignment:</strong> Avoids driving inbound across major highways (Federal/Sprint) during the 5:00 PM evening peak.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Navigation className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>Operating Hours Safe:</strong> Guarantees you reach traditional eateries before afternoon closing times.
            </span>
          </li>
        </ul>
      </div>

      {/* Destination Metadata Footer */}
      <footer className="text-center text-xs text-stone-500 py-6 border-t border-stone-200/80 space-y-1">
        <div className="flex items-center justify-center gap-2 text-stone-600 font-mono text-[11px]">
          <span>Destination Code:</span>
          <span className="font-bold bg-stone-100 px-1.5 py-0.5 rounded border border-stone-300">
            {destination.meta.country}/{destination.meta.code}
          </span>
        </div>
        <p>
          Optimized Geographic Itinerary • Adapted from Riri Travels: <em>A Different Side of KL</em>
        </p>
        <p className="text-stone-400 text-[11px]">
          Powered by Google Maps Platform (Maps JavaScript API & Advanced Markers)
        </p>
      </footer>
    </div>
  );
}

export default KL2601DestinationView;
