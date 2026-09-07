import { useState, useEffect, useCallback } from 'react';
import {
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
} from '@vis.gl/react-google-maps';
import { DayItinerary, Place } from '../types';
import { MapPolyline } from './MapPolyline';
import { MapMarkerPin } from './MapMarkerPin';
import { ExternalLink, RotateCcw, MapPin, Navigation, Clock, Sparkles } from 'lucide-react';

interface DayGoogleMapProps {
  day: DayItinerary;
  selectedPlaceId: string | null;
  onSelectPlace: (place: Place | null) => void;
  heightClass?: string;
}

function MapController({
  places,
  selectedPlace,
  resetTrigger,
}: {
  places: Place[];
  selectedPlace: Place | null;
  resetTrigger: number;
}) {
  const map = useMap();

  const fitAllPlaces = useCallback(() => {
    if (!map || typeof google === 'undefined' || !google.maps?.LatLngBounds) return;
    if (places.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    places.forEach((p) => bounds.extend(p.coordinates));
    map.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 });
  }, [map, places]);

  // Reset/fit on initial load or reset button trigger
  useEffect(() => {
    fitAllPlaces();
  }, [fitAllPlaces, resetTrigger]);

  // Pan to selected place smoothly when selected
  useEffect(() => {
    if (!map || !selectedPlace) return;
    map.panTo(selectedPlace.coordinates);
    const currentZoom = map.getZoom() || 13;
    if (currentZoom < 14) {
      map.setZoom(15);
    }
  }, [map, selectedPlace]);

  return null;
}

export function DayGoogleMap({
  day,
  selectedPlaceId,
  onSelectPlace,
  heightClass = 'h-[360px] sm:h-[400px]',
}: DayGoogleMapProps) {
  const [resetTrigger, setResetTrigger] = useState<number>(0);
  const selectedPlace = day.places.find((p) => p.id === selectedPlaceId) || null;

  const polylinePath = day.places.map((p) => p.coordinates);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-stone-50">
      {/* Top Map Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-stone-50 border-b border-gray-200 text-xs text-stone-700">
        <div className="flex items-center gap-2 font-medium">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: day.color }}
          />
          <span>Interactive Route Map: {day.places.length} Sequential Stops</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            id={`reset-view-btn-${day.id}`}
            onClick={() => {
              onSelectPlace(null);
              setResetTrigger((prev) => prev + 1);
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-stone-600 bg-white hover:bg-stone-100 border border-stone-200 shadow-2xs font-medium transition cursor-pointer"
            title="Reset zoom to show all stops"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Fit Route</span>
          </button>

          <a
            href={day.googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 font-semibold transition"
            title="Open turn-by-turn route in Google Maps app or browser"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
          </a>
        </div>
      </div>

      {/* Google Map Container with explicit CSS height */}
      <div className={`w-full ${heightClass} relative`}>
        <Map
          id={`map-${day.id}`}
          mapId="DEMO_MAP_ID"
          defaultCenter={day.center}
          defaultZoom={day.zoom}
          gestureHandling="greedy"
          disableDefaultUI={false}
          mapTypeControl={true}
          streetViewControl={false}
          fullscreenControl={true}
          zoomControl={true}
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          className="w-full h-full"
        >
          {/* Connecting Polyline */}
          <MapPolyline
            path={polylinePath}
            strokeColor={day.polylineColor}
            strokeOpacity={0.85}
            strokeWeight={4}
          />

          {/* Markers with high-visibility numbering ON and NEAR the pin */}
          {day.places.map((place) => {
            const isSelected = selectedPlace?.id === place.id;
            return (
              <AdvancedMarker
                key={place.id}
                position={place.coordinates}
                title={`${place.number}. ${place.name}`}
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
          })}

          {/* Info Window */}
          {selectedPlace && (
            <InfoWindow
              position={selectedPlace.coordinates}
              onCloseClick={() => onSelectPlace(null)}
              pixelOffset={[0, -35]}
              maxWidth={310}
            >
              <div className="p-1 font-sans text-stone-800">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-1">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                    style={{ backgroundColor: day.color }}
                  >
                    {selectedPlace.number}
                  </span>
                  <span className="text-sm leading-tight text-stone-900">
                    {selectedPlace.name}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-800 mb-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>{selectedPlace.time}</span>
                  <span className="text-stone-300">•</span>
                  <span className="text-stone-500">{selectedPlace.area}</span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-2">
                  {selectedPlace.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-2.5">
                  {selectedPlace.tags.map((tag, idx) => {
                    let badgeClass = 'bg-stone-100 text-stone-600 border-stone-200';
                    if (tag.type === 'highlight') {
                      badgeClass = 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold';
                    } else if (tag.type === 'cost') {
                      badgeClass = 'bg-blue-50 text-blue-800 border-blue-200 font-semibold';
                    } else if (tag.type === 'opt') {
                      badgeClass = 'bg-rose-50 text-rose-800 border-rose-200 font-semibold';
                    }
                    return (
                      <span
                        key={idx}
                        className={`text-[10px] px-1.5 py-0.5 rounded border ${badgeClass}`}
                      >
                        {tag.text}
                      </span>
                    );
                  })}
                </div>

                <div className="pt-1 border-t border-stone-200 flex items-center justify-between">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${selectedPlace.name}, Kuala Lumpur`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition"
                  >
                    <MapPin className="w-3 h-3" />
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>

                  <span className="text-[10px] text-stone-400">
                    Stop #{selectedPlace.number} of {day.places.length}
                  </span>
                </div>
              </div>
            </InfoWindow>
          )}

          <MapController
            places={day.places}
            selectedPlace={selectedPlace}
            resetTrigger={resetTrigger}
          />
        </Map>
      </div>

      {/* Stop quick chips underneath map */}
      <div className="px-3 py-2 bg-stone-50 border-t border-gray-200 overflow-x-auto scrollbar-none flex items-center gap-1.5 text-xs">
        <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 whitespace-nowrap mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-600" />
          Jump to Stop:
        </span>
        {day.places.map((place) => {
          const isSelected = selectedPlace?.id === place.id;
          return (
            <button
              key={place.id}
              type="button"
              onClick={() => onSelectPlace(isSelected ? null : place)}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] whitespace-nowrap transition cursor-pointer border ${
                isSelected
                  ? 'bg-stone-900 text-white border-stone-900 shadow-2xs font-semibold'
                  : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-200'
              }`}
            >
              <span
                className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold"
                style={{
                  backgroundColor: isSelected ? '#ffffff' : day.color,
                  color: isSelected ? '#1f2937' : '#ffffff',
                }}
              >
                {place.number}
              </span>
              <span className="truncate max-w-[140px] sm:max-w-none">{place.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
