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
} from 'lucide-react';

interface MasterMapViewProps {
  days: DayItinerary[];
  selectedPlaceId: string | null;
  onSelectPlace: (place: Place | null) => void;
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
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">
      {/* Control Header */}
      <div className="p-4 sm:p-5 bg-stone-50/80 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-100 text-amber-900">
              <Layers className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-bold text-stone-900">
              Master Geographic Flow Map
            </h2>
          </div>
          <p className="text-xs text-stone-600 mt-1">
            Compare all 3 daily routes across Kuala Lumpur, Petaling Jaya, and Ampang.
          </p>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-stone-200/70 p-0.5 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => {
                setActiveDayFilter('all');
                setResetTrigger((p) => p + 1);
                toast('Showing All 3 Days Route', {
                  description: 'All 16 stops visible on the master map',
                });
              }}
              className={`px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
                activeDayFilter === 'all'
                  ? 'bg-white text-stone-900 shadow-2xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
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
                className={`px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 cursor-pointer ${
                  activeDayFilter === day.dayNumber
                    ? 'bg-white text-stone-900 shadow-2xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
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
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs bg-white hover:bg-stone-100 border border-stone-300 text-stone-700 font-medium transition cursor-pointer"
            title="Fit map to all markers"
          >
            <RotateCcw className="w-3.5 h-3.5" />
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
                    title={`Day ${day.dayNumber} Stop ${place.number}: ${place.name}`}
                    onClick={() => onSelectPlace(place)}
                    zIndex={isSelected ? 60 : 10 + place.number}
                  >
                    <MapMarkerPin
                      number={place.number}
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
                maxWidth={300}
              >
                <div className="p-1 font-sans text-stone-800">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className="px-1.5 py-0.5 rounded text-[10px] font-bold text-white"
                      style={{ backgroundColor: selectedPlaceDay.color }}
                    >
                      Day {selectedPlaceDay.dayNumber} • #{selectedPlace.number}
                    </span>
                    <span className="text-xs font-semibold text-stone-500">
                      {selectedPlace.area}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-stone-900 leading-tight mb-1">
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
        <div className="lg:col-span-4 h-[240px] lg:h-full overflow-y-auto border-t lg:border-t-0 lg:border-l border-gray-200 bg-stone-50/50 divide-y divide-gray-100">
          <div className="p-3 bg-stone-100/70 sticky top-0 z-10 text-xs font-bold text-stone-600 uppercase tracking-wider flex items-center justify-between">
            <span>Stops in Current View ({allDisplayedPlaces.length})</span>
            <span className="text-[11px] font-normal normal-case text-stone-500">
              Click stop to focus map
            </span>
          </div>

          {displayedDays.map((day) => (
            <div key={day.id} className="p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: day.color }}
                  />
                  Day {day.dayNumber}: {day.badge}
                </span>
                <a
                  href={day.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-blue-600 hover:underline flex items-center gap-0.5"
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
                      className={`w-full text-left p-2 rounded-lg text-xs transition cursor-pointer flex items-start gap-2 border ${
                        isSelected
                          ? 'bg-amber-50 border-amber-300 text-stone-900 shadow-2xs'
                          : 'bg-white hover:bg-stone-100/80 border-stone-200/80 text-stone-700'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5"
                        style={{ backgroundColor: day.color }}
                      >
                        {place.number}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold truncate text-stone-900">
                          {place.name}
                        </div>
                        <div className="text-[10px] text-stone-500 flex items-center gap-1 mt-0.5">
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
