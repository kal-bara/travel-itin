import { useState, useCallback, useEffect } from 'react';
import {
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
} from '@vis.gl/react-google-maps';
import { DayItinerary, Place } from '../types';
import { MapPolyline } from './MapPolyline';
import { MapMarkerPin } from './MapMarkerPin';
import { toast } from 'sonner';
import {
  RotateCcw,
  Navigation,
  ExternalLink,
  MapPin,
  Clock,
  Calendar,
  Layers,
  Camera,
} from 'lucide-react';

interface MasterMapViewProps {
  days: DayItinerary[];
  selectedPlaceId: string | null;
  onSelectPlace: (place: Place | null) => void;
  onInspectPhoto?: (place: Place) => void;
}

function MasterMapBoundsController({
  places,
  selectedPlace,
  resetTrigger,
}: {
  places: Place[];
  selectedPlace: Place | null;
  resetTrigger: number;
}) {
  const map = useMap();

  const fitBounds = useCallback(() => {
    if (!map || typeof google === 'undefined' || !google.maps?.LatLngBounds) return;
    if (places.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    places.forEach((p) => bounds.extend(p.coordinates));
    map.fitBounds(bounds, { top: 60, right: 60, bottom: 60, left: 60 });
  }, [map, places]);

  useEffect(() => {
    fitBounds();
  }, [fitBounds, resetTrigger]);

  useEffect(() => {
    if (!map || !selectedPlace) return;
    map.panTo(selectedPlace.coordinates);
    const zoom = map.getZoom() || 12;
    if (zoom < 14) map.setZoom(15);
  }, [map, selectedPlace]);

  return null;
}

export function MasterMapView({
  days,
  selectedPlaceId,
  onSelectPlace,
  onInspectPhoto,
}: MasterMapViewProps) {
  const [activeDayFilter, setActiveDayFilter] = useState<'all' | number>('all');
  const [resetTrigger, setResetTrigger] = useState(0);

  const displayedDays =
    activeDayFilter === 'all'
      ? days
      : days.filter((d) => d.dayNumber === activeDayFilter);

  const allDisplayedPlaces = displayedDays.flatMap((d) => d.places);

  const selectedPlace =
    days
      .flatMap((d) => d.places)
      .find((p) => p.id === selectedPlaceId) || null;

  const selectedPlaceDay = selectedPlace
    ? days.find((d) => d.places.some((p) => p.id === selectedPlace.id))
    : null;

  return (
    <div className="bg-white dark:bg-[#0c100d] rounded-sm border border-[#e0e5dd] dark:border-[#223027] shadow-sm overflow-hidden mb-8 transition-colors">
      {/* Control Header */}
      <div className="p-4 sm:p-5 bg-[#edf2ea] dark:bg-[#121815] border-b border-[#e0e5dd] dark:border-[#223027] flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-xs bg-[#e0e8dd] dark:bg-[#1a241f] text-[#f6833b] border border-[#d2ddd0] dark:border-[#2e3e34]">
              <Layers className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg font-bold font-serif text-[#0b0f0c] dark:text-[#f5f6ed]">
              Master Circuit Overview // 16 Stops
            </h2>
          </div>
          <p className="text-xs text-[#607065] dark:text-[#88968d] mt-1 font-mono">
            3 Daily Geographic Clusters: Bukit Tunku & Chow Kit • Petaling Jaya • Chinatown & Ampang
          </p>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-[#e4eae0] dark:bg-[#0b0d0b] p-0.5 rounded-xs text-xs font-mono border border-[#d2ddd0] dark:border-[#223027]">
            <button
              type="button"
              onClick={() => {
                setActiveDayFilter('all');
                setResetTrigger((p) => p + 1);
                toast('Showing All 3 Days Route', {
                  description: 'All 16 stops visible on the master map',
                });
              }}
              className={`px-2.5 py-1 rounded-xs uppercase tracking-wider transition cursor-pointer ${
                activeDayFilter === 'all'
                  ? 'bg-white dark:bg-[#1c2520] text-[#f6833b] font-bold border border-[#d2ddd0] dark:border-[#2e3e34] shadow-2xs'
                  : 'text-[#607065] dark:text-[#88968d] hover:text-[#18201a] dark:hover:text-[#dfdfc1]'
              }`}
            >
              All 3 Days ({days.reduce((acc, d) => acc + d.places.length, 0)})
            </button>
            {days.map((day) => (
              <button
                key={day.id}
                type="button"
                onClick={() => {
                  setActiveDayFilter(day.dayNumber);
                  setResetTrigger((p) => p + 1);
                  toast(`Filtered to Day ${day.dayNumber} Route`, {
                    description: `${day.title} (${day.places.length} stops)`,
                  });
                }}
                className={`px-2 py-1 rounded-xs uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer ${
                  activeDayFilter === day.dayNumber
                    ? 'bg-white dark:bg-[#1c2520] text-[#f6833b] font-bold border border-[#d2ddd0] dark:border-[#2e3e34] shadow-2xs'
                    : 'text-[#607065] dark:text-[#88968d] hover:text-[#18201a] dark:hover:text-[#dfdfc1]'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-xs"
                  style={{ backgroundColor: day.color }}
                />
                <span>Day {day.dayNumber}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              onSelectPlace(null);
              setResetTrigger((p) => p + 1);
              toast('Map bounds reset to visible markers', { duration: 1500 });
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xs text-xs font-mono bg-[#edf2ea] dark:bg-[#1a241f] hover:bg-[#e0e8dd] dark:hover:bg-[#223027] border border-[#d2ddd0] dark:border-[#2e3e34] text-[#18201a] dark:text-[#dfdfc1] transition cursor-pointer"
            title="Fit map to all markers"
          >
            <RotateCcw className="w-3 h-3 text-[#f6833b]" />
            <span className="hidden sm:inline">Fit Bounds</span>
          </button>
        </div>
      </div>

      {/* Map + Sidebar Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 h-[600px]">
        {/* Interactive Map */}
        <div className="lg:col-span-8 h-[360px] lg:h-full relative bg-stone-100">
          <Map
            id="master-overview-map"
            mapId="DEMO_MAP_ID"
            defaultCenter={{ lat: 3.14, lng: 101.69 }}
            defaultZoom={12}
            gestureHandling="greedy"
            disableDefaultUI={false}
            mapTypeControl={true}
            streetViewControl={false}
            fullscreenControl={true}
            zoomControl={true}
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            className="w-full h-full"
          >
            {/* Draw route lines for visible days */}
            {displayedDays.map((day) => (
              <MapPolyline
                key={`poly-${day.id}`}
                path={day.places.map((p) => p.coordinates)}
                strokeColor={day.polylineColor}
                strokeOpacity={0.85}
                strokeWeight={4}
              />
            ))}

            {/* Render markers with numbering ON and NEAR the pin */}
            {displayedDays.flatMap((day) =>
              day.places.map((place) => {
                const isSelected = selectedPlace?.id === place.id;
                return (
                  <AdvancedMarker
                    key={place.id}
                    position={place.coordinates}
                    title={
                      activeDayFilter === 'all'
                        ? `Stop #${place.globalNumber || place.number} (Day ${day.dayNumber} Stop #${place.number}): ${place.name}`
                        : `Day ${day.dayNumber} Stop #${place.number}: ${place.name}`
                    }
                    onClick={() => onSelectPlace(place)}
                    zIndex={isSelected ? 60 : 10 + place.number}
                  >
                    <MapMarkerPin
                      number={
                        activeDayFilter === 'all'
                          ? place.globalNumber || place.number
                          : place.number
                      }
                      color={day.color}
                      isSelected={isSelected}
                    />
                  </AdvancedMarker>
                );
              })
            )}

            {/* Info Window */}
            {selectedPlace && selectedPlaceDay && (
              <InfoWindow
                position={selectedPlace.coordinates}
                onCloseClick={() => onSelectPlace(null)}
                pixelOffset={[0, -35]}
                maxWidth={320}
              >
                <div className="p-1 font-sans text-stone-800">
                  {/* Photo banner */}
                  {selectedPlace.photo && (
                    <div
                      onClick={() => onInspectPhoto?.(selectedPlace)}
                      className="relative w-full h-32 mb-2 rounded-xs overflow-hidden border border-stone-200 cursor-pointer group shadow-2xs"
                    >
                      <img
                        src={selectedPlace.photo.url}
                        alt={selectedPlace.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                      {selectedPlace.photo.category && (
                        <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-xs bg-black/70 backdrop-blur-xs text-[9px] font-mono text-amber-300 font-bold">
                          {selectedPlace.photo.category}
                        </span>
                      )}
                      <span className="absolute bottom-1.5 right-1.5 text-[9px] font-mono text-white bg-black/60 px-1.5 py-0.5 rounded-xs flex items-center gap-1 group-hover:text-[#f6833b]">
                        <Camera className="w-2.5 h-2.5" />
                        <span>Inspect Photo</span>
                      </span>
                      <span className="absolute bottom-1.5 left-1.5 text-[10px] font-serif italic text-white/90 truncate max-w-[190px]">
                        "{selectedPlace.photo.caption}"
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 mb-1 font-mono">
                    <span
                      className="px-1.5 py-0.5 rounded text-[10px] font-bold text-white"
                      style={{ backgroundColor: selectedPlaceDay.color }}
                    >
                      Day {selectedPlaceDay.dayNumber} • #{selectedPlace.number}
                      {selectedPlace.globalNumber ? ` (${selectedPlace.globalNumber}/16)` : ''}
                    </span>
                    <span className="text-xs font-semibold text-stone-500">
                      {selectedPlace.area}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-stone-900 leading-tight mb-1 font-serif">
                    {selectedPlace.name}
                  </h4>

                  <div className="text-[11px] font-medium text-amber-800 flex items-center gap-1 mb-1.5">
                    <Clock className="w-3 h-3 text-amber-700" />
                    <span>{selectedPlace.time}</span>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-3 mb-2">
                    {selectedPlace.description}
                  </p>

                  <div className="pt-1.5 border-t border-stone-200 flex items-center justify-between">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${selectedPlace.name}, Kuala Lumpur`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800"
                    >
                      <MapPin className="w-3 h-3" />
                      <span>Directions</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>

                    <a
                      href={selectedPlaceDay.googleMapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-stone-500 hover:text-stone-800 underline"
                    >
                      Open Day Route
                    </a>
                  </div>
                </div>
              </InfoWindow>
            )}

            <MasterMapBoundsController
              places={allDisplayedPlaces}
              selectedPlace={selectedPlace}
              resetTrigger={resetTrigger}
            />
          </Map>
        </div>

        {/* Places Scrollable List */}
        <div className="lg:col-span-4 h-[240px] lg:h-full overflow-y-auto border-t lg:border-t-0 lg:border-l border-[#e0e5dd] dark:border-[#223027] bg-[#fbfdf9] dark:bg-[#0c100d] divide-y divide-[#ecf0e9] dark:divide-[#1b251f]">
          <div className="p-3 bg-[#edf2ea] dark:bg-[#121815] sticky top-0 z-10 text-xs font-mono text-[#607065] dark:text-[#88968d] uppercase tracking-wider flex items-center justify-between border-b border-[#e0e5dd] dark:border-[#223027]">
            <span className="text-[#18201a] dark:text-[#dfdfc1] font-bold">Stops ({allDisplayedPlaces.length})</span>
            <span className="text-[10px] lowercase text-[#607065] dark:text-[#88968d]">
              click to focus pin
            </span>
          </div>

          {displayedDays.map((day) => (
            <div key={day.id} className="p-3">
              <div className="flex items-center justify-between mb-2 font-mono">
                <span className="flex items-center gap-1.5 text-xs font-bold text-[#18201a] dark:text-[#dfdfc1]">
                  <span
                    className="w-2 h-2 rounded-xs"
                    style={{ backgroundColor: day.color }}
                  />
                  Day {day.dayNumber}: {day.badge}
                </span>
                <a
                  href={day.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#f6833b] hover:underline flex items-center gap-0.5 font-bold"
                  title="Open full day route in Google Maps"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Route</span>
                </a>
              </div>

              <div className="space-y-1">
                {day.places.map((place) => {
                  const isSelected = selectedPlace?.id === place.id;
                  return (
                    <button
                      key={place.id}
                      type="button"
                      onClick={() => onSelectPlace(place)}
                      className={`w-full text-left p-2 rounded-xs text-xs font-mono transition cursor-pointer flex items-center gap-2.5 border group ${
                        isSelected
                          ? 'bg-[#eaf1e7] dark:bg-[#1c2520] border-[#f6833b] text-[#18201a] dark:text-[#f5f6ed] shadow-xs'
                          : 'bg-white dark:bg-[#121815]/60 hover:bg-[#edf2ea] dark:hover:bg-[#18241e] border-[#e0e5dd] dark:border-[#223027] text-[#607065] dark:text-[#88968d] hover:text-[#18201a] dark:hover:text-[#dfdfc1]'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-xs flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                        style={{ backgroundColor: isSelected ? '#f6833b' : day.color }}
                      >
                        {activeDayFilter === 'all'
                          ? place.globalNumber || place.number
                          : place.number}
                      </span>

                      {/* Micro thumbnail */}
                      {place.photo && (
                        <div
                          onClick={(e) => {
                            if (onInspectPhoto) {
                              e.stopPropagation();
                              onInspectPhoto(place);
                            }
                          }}
                          className="w-9 h-9 rounded-xs overflow-hidden shrink-0 border border-black/10 dark:border-white/10 relative"
                          title="Click to inspect photo"
                        >
                          <img
                            src={place.photo.url}
                            alt={place.name}
                            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="font-medium truncate text-[#18201a] dark:text-[#f5f6ed] text-xs">
                          {activeDayFilter === 'all' && (
                            <span className="opacity-60 text-[10px] mr-1">
                              #{place.number}
                            </span>
                          )}
                          {place.name}
                        </div>
                        <div className="text-[10px] text-[#607065] dark:text-[#88968d] flex items-center gap-1 mt-0.5 font-mono">
                          <span>{place.time}</span>
                          <span>•</span>
                          <span>{place.area}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
