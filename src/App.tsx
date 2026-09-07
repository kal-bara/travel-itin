/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { ITINERARY_DAYS } from './data/itineraryData';
import { Place } from './types';
import { DayGoogleMap } from './components/DayGoogleMap';
import { TimelineItem } from './components/TimelineItem';
import { MasterMapView } from './components/MasterMapView';
import { ApiKeyBanner } from './components/ApiKeyBanner';
import {
  Map as MapIcon,
  ListOrdered,
  Sparkles,
  Compass,
  Car,
  Clock,
  Navigation,
} from 'lucide-react';

export default function App() {
  const [apiKey, setApiKey] = useState<string>(
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  );
  const [viewMode, setViewMode] = useState<'daily' | 'master'>('daily');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const handleSelectPlace = (place: Place | null) => {
    setSelectedPlaceId(place ? place.id : null);
  };

  return (
    <APIProvider apiKey={apiKey} libraries={['marker']}>
      <div className="min-h-screen bg-[#fcfbfa] text-stone-900 font-sans antialiased py-6 px-3 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Card */}
          <header className="text-center py-8 px-4 sm:px-6 bg-linear-to-br from-amber-50/90 via-amber-100/50 to-amber-200/40 rounded-2xl border border-amber-200 shadow-xs mb-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-700 text-white text-xs font-bold tracking-wider uppercase rounded-full mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smarter Flow • Zero Backtracking</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-950 tracking-tight mb-2.5">
              3 Days in Kuala Lumpur (Optimized)
            </h1>

            <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-5">
              All exact 17 vlog stops preserved, reorganized into tight geographic clusters with interactive Google Maps to save 1.5–2 hours of road traffic daily.
            </p>

            {/* View Mode Switcher */}
            <div className="inline-flex items-center bg-white/90 p-1 rounded-xl border border-amber-300/80 shadow-xs">
              <button
                type="button"
                id="tab-daily-view"
                onClick={() => setViewMode('daily')}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  viewMode === 'daily'
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <ListOrdered className="w-3.5 h-3.5" />
                <span>Daily Cards & Maps</span>
              </button>

              <button
                type="button"
                id="tab-master-view"
                onClick={() => setViewMode('master')}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  viewMode === 'master'
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Master 3-Day Map</span>
              </button>
            </div>
          </header>

          {/* Google Maps API Key Indicator */}
          <ApiKeyBanner apiKey={apiKey} onUpdateKey={setApiKey} />

          {/* Optimization Alert */}
          <div className="bg-emerald-50/90 border border-emerald-200 rounded-xl p-4 sm:p-5 mb-7 text-xs sm:text-sm text-emerald-900 leading-relaxed shadow-xs">
            <div className="font-bold text-emerald-950 text-sm mb-1.5 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>What was improved:</span>
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

          {/* Master View */}
          {viewMode === 'master' ? (
            <MasterMapView
              days={ITINERARY_DAYS}
              selectedPlaceId={selectedPlaceId}
              onSelectPlace={handleSelectPlace}
            />
          ) : (
            /* Daily Cards View with Embedded Interactive Google Maps */
            <div className="space-y-8 mb-8">
              {ITINERARY_DAYS.map((day) => (
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

          {/* Why this route works better box */}
          <div className="bg-stone-50 border border-dashed border-stone-300 rounded-xl p-5 sm:p-6 mb-8 text-xs sm:text-sm">
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

          {/* Footer */}
          <footer className="text-center text-xs text-stone-500 py-6 border-t border-stone-200/80 space-y-1">
            <p>
              Optimized Geographic Itinerary • Adapted from Riri Travels: <em>A Different Side of KL</em>
            </p>
            <p className="text-stone-400 text-[11px]">
              Powered by Google Maps Platform (Maps JavaScript API & Advanced Markers)
            </p>
          </footer>
        </div>
      </div>
    </APIProvider>
  );
}
