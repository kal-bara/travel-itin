import React, { useEffect } from 'react';
import { Place } from '../types';
import {
  X,
  Camera,
  MapPin,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  Compass,
  Upload,
  UserCheck,
  RotateCcw,
} from 'lucide-react';
import { toast } from 'sonner';

interface PhotoLightboxModalProps {
  place: Place | null;
  allPlaces: Place[];
  isOpen: boolean;
  onClose: () => void;
  onSelectPlace: (place: Place) => void;
  onOpenUpload?: (place: Place) => void;
}

export function PhotoLightboxModal({
  place,
  allPlaces,
  isOpen,
  onClose,
  onSelectPlace,
  onOpenUpload,
}: PhotoLightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !place) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, place, allPlaces]);

  if (!isOpen || !place || !place.photo) return null;

  const currentIndex = allPlaces.findIndex((p) => p.id === place.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allPlaces.length - 1;

  const handlePrev = () => {
    if (hasPrev) {
      onSelectPlace(allPlaces[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      onSelectPlace(allPlaces[currentIndex + 1]);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#111713] border border-[#2b3a30] text-[#f5f6ed] rounded-sm overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#223027] bg-[#16201a]/90 font-mono text-xs text-[#88968d]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f6833b] inline-block animate-pulse" />
            <span className="uppercase tracking-wider text-[#dfdfc1] font-semibold">
              Iconic Visual Landmark // Stop #{place.number}
            </span>
            <span className="text-[#88968d]">
              ({currentIndex + 1} of {allPlaces.length})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-xs hover:bg-[#25362c] text-[#88968d] hover:text-white transition cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto flex flex-col md:flex-row">
          {/* Main Photo Area */}
          <div className="relative flex-1 bg-black flex items-center justify-center min-h-[280px] sm:min-h-[400px] overflow-hidden group">
            <img
              src={place.photo.url}
              alt={place.name}
              className="w-full h-full object-cover max-h-[520px] transition-transform duration-500 ease-out group-hover:scale-102"
              loading="eager"
            />

            {/* Navigation Arrows */}
            {hasPrev && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition cursor-pointer backdrop-blur-xs"
                title="Previous Stop"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {hasNext && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition cursor-pointer backdrop-blur-xs"
                title="Next Stop"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            {/* Category Pill Over Photo */}
            {place.photo.category && (
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xs bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono uppercase tracking-wider text-[#fbbf24] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#f6833b]" />
                <span>{place.photo.category}</span>
              </div>
            )}

            {/* Custom User Photo Badge over Photo */}
            {place.photo.isCustom && (
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-xs bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-[10px] font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1 font-bold">
                <UserCheck className="w-3 h-3" />
                <span>Your Upload</span>
              </div>
            )}

            {/* Photo attribution / credit */}
            {place.photo.credit && (
              <div className="absolute bottom-2 right-2 text-[10px] font-mono text-white/50 bg-black/50 px-2 py-0.5 rounded-xs backdrop-blur-xs">
                {place.photo.credit}
              </div>
            )}
          </div>

          {/* Place Information & Photography Brief */}
          <div className="w-full md:w-80 lg:w-96 p-5 sm:p-6 bg-[#121915] border-t md:border-t-0 md:border-l border-[#223027] flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#f6833b] bg-[#f6833b]/15 px-2 py-0.5 rounded-xs border border-[#f6833b]/30">
                  STOP {String(place.number).padStart(2, '0')}
                </span>
                <span className="text-xs font-mono text-[#88968d] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#f6833b]" />
                  {place.time}
                </span>
              </div>

              <h2 className="text-xl font-serif text-[#f5f6ed] leading-snug">
                {place.name}
              </h2>

              <div className="flex items-center gap-1.5 text-xs text-[#88968d] font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#f6833b]" />
                <span>{place.area}</span>
                <span>•</span>
                <span>{place.coordinates.lat.toFixed(4)}, {place.coordinates.lng.toFixed(4)}</span>
              </div>

              {/* Editorial Caption */}
              <div className="p-3 rounded-xs bg-[#19231e] border border-[#2b3a30] text-xs text-[#dfdfc1] leading-relaxed">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] uppercase text-[#f6833b] font-semibold">
                    Visual Character
                  </span>
                  {place.photo.isCustom && (
                    <span className="text-[9px] font-mono uppercase text-emerald-400 bg-emerald-950/60 px-1 rounded-2xs border border-emerald-800">
                      Personalized
                    </span>
                  )}
                </div>
                "{place.photo.caption}"
              </div>

              {/* Photography Tip */}
              {place.photo.photoTip && (
                <div className="p-3 rounded-xs bg-[#1d2720] border border-[#2e4033] text-xs text-[#a3b8aa] leading-relaxed space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#78d197] uppercase">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Photo & Perspective Tip</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {place.photo.photoTip}
                  </p>
                </div>
              )}

              {/* User Photo Upload Callout */}
              {onOpenUpload && (
                <div className="p-2.5 rounded-xs bg-[#16201b] border border-[#2e3e34] flex items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-2 text-[#dfdfc1]">
                    <Upload className="w-3.5 h-3.5 text-[#f6833b]" />
                    <span className="text-[11px]">
                      {place.photo.isCustom ? 'Uploaded photo active' : 'Have your own photo?'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenUpload(place)}
                    className="px-2.5 py-1 rounded-2xs bg-[#f6833b] hover:bg-[#fa8e49] text-[#0b0d0b] font-bold text-[11px] transition cursor-pointer"
                  >
                    {place.photo.isCustom ? 'Change Photo' : 'Upload Yours'}
                  </button>
                </div>
              )}

              {/* Place Description */}
              <p className="text-xs text-[#88968d] leading-relaxed">
                {place.description}
              </p>
            </div>

            {/* Footer Actions */}
            <div className="pt-3 border-t border-[#223027] flex items-center gap-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${place.name}, Kuala Lumpur`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  toast.success('Opening in Google Maps', { description: place.name });
                }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xs bg-[#f6833b] hover:bg-[#fa8e49] text-[#0b0d0b] font-mono text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Directions in Maps</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
              </a>

              <button
                type="button"
                onClick={() => {
                  const coordStr = `${place.coordinates.lat}, ${place.coordinates.lng}`;
                  navigator.clipboard.writeText(coordStr);
                  toast.success('Coordinates Copied', { description: coordStr });
                }}
                className="px-3 py-2 rounded-xs bg-[#1c2621] hover:bg-[#25342c] text-[#dfdfc1] border border-[#2e3e34] font-mono text-xs transition cursor-pointer"
                title="Copy coordinates"
              >
                Copy GPS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
