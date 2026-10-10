/**
 * Destination: Malaysia / Kuala Lumpur
 * Code: KL-26-01 (Kuala Lumpur, Year 2026, Sequence 01)
 * Amp Chronicle styled destination module
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { Place, Destination } from '@/src/types';
import { KL_26_01_DESTINATION, KL_26_01_DAYS, KL_26_01_META } from './data';
import { DayGoogleMap } from '@/src/components/DayGoogleMap';
import { TimelineItem, PhotoLayoutMode } from '@/src/components/TimelineItem';
import { MasterMapView } from '@/src/components/MasterMapView';
import { FeaturedChronicleBanner } from '@/src/components/FeaturedChronicleBanner';
import { PhotoLightboxModal } from '@/src/components/PhotoLightboxModal';
import { PhotoUploadModal } from '@/src/components/PhotoUploadModal';
import { VisualChronicleGallery } from '@/src/components/VisualChronicleGallery';
import { getCustomPhotos, CustomPhotoEntry } from '@/src/utils/photoStorage';
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
  Camera,
  Image as ImageIcon,
  LayoutGrid,
  AlignLeft,
  Eye,
  Upload,
} from 'lucide-react';

export { KL_26_01_DESTINATION, KL_26_01_DAYS, KL_26_01_META };

export interface DestinationViewProps {
  destination?: Destination;
  currentTab?: 'chronicle' | 'master' | 'gallery';
  onSelectTab?: (tab: 'chronicle' | 'master' | 'gallery') => void;
  searchQuery?: string;
  selectedPlaceId?: string | null;
  onSelectPlace?: (place: Place | null) => void;
}

export function KL2601DestinationView({
  destination: controlledDestination,
  currentTab = 'chronicle',
  onSelectTab,
  searchQuery = '',
  selectedPlaceId: controlledSelectedPlaceId,
  onSelectPlace: controlledOnSelectPlace,
}: DestinationViewProps) {
  const [internalSelectedPlaceId, setInternalSelectedPlaceId] = useState<string | null>(null);
  const [photoLayout, setPhotoLayout] = useState<PhotoLayoutMode>('editorial');
  const [lightboxPlace, setLightboxPlace] = useState<Place | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [uploadModalPlace, setUploadModalPlace] = useState<Place | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [customPhotos, setCustomPhotos] = useState<Record<string, CustomPhotoEntry>>(() =>
    getCustomPhotos()
  );

  useEffect(() => {
    const handleUpdate = () => {
      setCustomPhotos(getCustomPhotos());
    };
    window.addEventListener('custom-photos-updated', handleUpdate);
    return () => window.removeEventListener('custom-photos-updated', handleUpdate);
  }, []);

  const selectedPlaceId =
    controlledSelectedPlaceId !== undefined
      ? controlledSelectedPlaceId
      : internalSelectedPlaceId;

  const destination = controlledDestination || KL_26_01_DESTINATION;

  // Merge custom photos from localStorage onto default place photos
  const activeDays = destination.days.map((day) => ({
    ...day,
    places: day.places.map((place) => {
      const custom = customPhotos[place.id];
      if (custom) {
        return {
          ...place,
          photo: {
            ...place.photo,
            url: custom.url,
            caption: custom.caption || place.photo?.caption || '',
            photoTip: custom.photoTip !== undefined ? custom.photoTip : place.photo?.photoTip,
            category: custom.category || place.photo?.category,
            credit: custom.credit || 'Personal Photo',
            isCustom: true,
            uploadedAt: custom.uploadedAt,
          },
        };
      }
      return place;
    }),
  }));

  const allPlaces = activeDays.flatMap((d) => d.places);

  // Keep lightboxPlace synchronized with any custom updates
  useEffect(() => {
    if (lightboxPlace) {
      const fresh = allPlaces.find((p) => p.id === lightboxPlace.id);
      if (fresh) setLightboxPlace(fresh);
    }
  }, [customPhotos]);

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

  const handleOpenLightbox = (place: Place) => {
    setLightboxPlace(place);
    setIsLightboxOpen(true);
  };

  const handleOpenUpload = (place: Place) => {
    setUploadModalPlace(place);
    setIsUploadModalOpen(true);
  };

  // Render all active days sequentially in Chronicle view
  const daysToRender = activeDays;

  // Filter places based on search query
  const searchTrimmed = searchQuery.trim().toLowerCase();
  const isSearching = searchTrimmed.length > 0;

  return (
    <div className="w-full space-y-6">
      {/* Featured Banner when on Chronicle Feed */}
      {currentTab === 'chronicle' && !isSearching && (
        <FeaturedChronicleBanner
          destination={destination}
          totalDays={destination.meta.totalDays}
          totalStops={destination.meta.totalStops}
          onExploreDay={() => {
            const el = document.getElementById('day-card-1');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenMasterMap={() => onSelectTab && onSelectTab('master')}
          onOpenGallery={() => onSelectTab && onSelectTab('gallery')}
        />
      )}

      {/* When on Gallery tab, show the curated Visual Chronicle Gallery */}
      {currentTab === 'gallery' ? (
        <VisualChronicleGallery
          days={activeDays}
          onSelectPlace={handleSelectPlace}
          onInspectPhoto={handleOpenLightbox}
          onOpenUpload={handleOpenUpload}
          onJumpToItinerary={(dayNumber, placeId) => {
            if (onSelectTab) {
              onSelectTab('chronicle');
            }
            handleSelectPlace(allPlaces.find((p) => p.id === placeId) || null);
            const el = document.getElementById(`timeline-item-${placeId}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
        />
      ) : currentTab === 'master' ? (
        /* When on Master Map tab, show MasterMapView directly */
        <MasterMapView
          days={activeDays}
          selectedPlaceId={selectedPlaceId}
          onSelectPlace={handleSelectPlace}
          onInspectPhoto={handleOpenLightbox}
        />
      ) : (
        /* Daily Itinerary Cards in Amp Chronicle styling */
        <div className="space-y-6">
          {/* Status line / Section indicator with Visual Mode Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1 py-1 text-xs font-mono text-[#607065] dark:text-[#88968d]">
            <div className="flex items-center gap-2">
              <span className="text-[#18201a] dark:text-[#dfdfc1] font-bold uppercase tracking-wider">
                {isSearching
                  ? `Search Results for "${searchQuery}"`
                  : `All ${destination.meta.totalDays} Daily Circuits // Sequential Stream`}
              </span>
              <span className="text-[11px] opacity-70">
                ({daysToRender.reduce((acc, d) => acc + d.places.length, 0)} Stops)
              </span>
            </div>

            {/* Visual View Mode Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center rounded-xs border border-[#d6ded4] dark:border-[#223027] bg-[#edf2ea] dark:bg-[#121815] p-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setPhotoLayout('editorial');
                    toast('Switched to Editorial Photos mode', { duration: 1500 });
                  }}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-2xs text-[10px] uppercase font-mono transition cursor-pointer ${
                    photoLayout === 'editorial'
                      ? 'bg-white dark:bg-[#1c2520] text-[#f6833b] font-bold shadow-2xs'
                      : 'text-[#607065] dark:text-[#88968d] hover:text-[#18201a] dark:hover:text-[#dfdfc1]'
                  }`}
                  title="Full editorial photography cards"
                >
                  <Camera className="w-3 h-3" />
                  <span>Iconic Photos</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPhotoLayout('compact');
                    toast('Switched to Compact Cards mode', { duration: 1500 });
                  }}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-2xs text-[10px] uppercase font-mono transition cursor-pointer ${
                    photoLayout === 'compact'
                      ? 'bg-white dark:bg-[#1c2520] text-[#f6833b] font-bold shadow-2xs'
                      : 'text-[#607065] dark:text-[#88968d] hover:text-[#18201a] dark:hover:text-[#dfdfc1]'
                  }`}
                  title="Compact side thumbnail cards"
                >
                  <LayoutGrid className="w-3 h-3" />
                  <span>Compact</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPhotoLayout('none');
                    toast('Switched to Minimal text mode', { duration: 1500 });
                  }}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-2xs text-[10px] uppercase font-mono transition cursor-pointer ${
                    photoLayout === 'none'
                      ? 'bg-white dark:bg-[#1c2520] text-[#f6833b] font-bold shadow-2xs'
                      : 'text-[#607065] dark:text-[#88968d] hover:text-[#18201a] dark:hover:text-[#dfdfc1]'
                  }`}
                  title="Minimalist text layout (no photos)"
                >
                  <AlignLeft className="w-3 h-3" />
                  <span>Text Only</span>
                </button>
              </div>

              {/* Quick jump to photo gallery button */}
              <button
                type="button"
                onClick={() => onSelectTab && onSelectTab('gallery')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xs border border-[#f6833b]/40 bg-[#f6833b]/10 text-[#f6833b] hover:bg-[#f6833b]/20 text-[10px] font-mono font-bold uppercase transition cursor-pointer"
                title="Browse all 16 iconic landmarks in photo gallery"
              >
                <Eye className="w-3 h-3" />
                <span>Visual Gallery</span>
              </button>
            </div>
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
                    onInspectPhoto={handleOpenLightbox}
                  />
                </div>

                {/* Sequential Timeline Items */}
                <div className="p-3 sm:p-5 pt-2">
                  <div className="space-y-3">
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
                        photoLayout={photoLayout}
                        onInspectPhoto={handleOpenLightbox}
                        onOpenUpload={handleOpenUpload}
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

      {/* Photo Lightbox Modal */}
      <PhotoLightboxModal
        isOpen={isLightboxOpen}
        place={lightboxPlace}
        allPlaces={allPlaces}
        onClose={() => setIsLightboxOpen(false)}
        onSelectPlace={(p) => setLightboxPlace(p)}
        onOpenUpload={handleOpenUpload}
      />

      {/* Photo Upload & Personalization Modal */}
      <PhotoUploadModal
        isOpen={isUploadModalOpen}
        place={uploadModalPlace}
        onClose={() => setIsUploadModalOpen(false)}
        onPhotoSaved={(placeId) => {
          // Handled via custom-photos-updated event
        }}
      />

      {/* Destination Metadata Footer */}
      <footer className="text-center font-mono text-xs text-[#607065] dark:text-[#88968d] py-8 border-t border-[#e0e5dd] dark:border-[#223027] space-y-2 transition-colors">
        <div className="flex items-center justify-center gap-2 text-[#18201a] dark:text-[#dfdfc1]">
          <span className="text-[#607065] dark:text-[#88968d]">DESTINATION IDENTIFIER:</span>
          <span className="font-bold bg-[#edf2ea] dark:bg-[#1c2520] px-2 py-0.5 rounded-xs border border-[#d6ded4] dark:border-[#2e3e34]">
            {destination.meta.country}/{destination.meta.code}
          </span>
        </div>
        <p className="text-[11px] text-[#607065] dark:text-[#88968d]">
          Amp Chronicle Edition • Zero-Backtracking Kuala Lumpur Circuit • 16 Iconic Waypoints with Curated Photography
        </p>
      </footer>
    </div>
  );
}

export default KL2601DestinationView;

