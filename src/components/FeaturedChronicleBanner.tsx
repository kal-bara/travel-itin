import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MapPin, Navigation, Calendar, Compass, ArrowRight, Camera, Eye } from 'lucide-react';
import { DayItinerary, Destination } from '../types';

interface FeaturedChronicleBannerProps {
  destination?: Destination;
  day?: DayItinerary;
  totalDays: number;
  totalStops: number;
  onExploreDay: () => void;
  onOpenMasterMap: () => void;
  onOpenGallery?: () => void;
}

export function FeaturedChronicleBanner({
  destination,
  day,
  totalDays,
  totalStops,
  onExploreDay,
  onOpenMasterMap,
  onOpenGallery,
}: FeaturedChronicleBannerProps) {
  // Extract photo thumbnails dynamically from the destination places
  const dynamicThumbnails = destination?.days
    ?.flatMap((d) => d.places)
    ?.filter((p) => Boolean(p.photo?.url))
    ?.slice(0, 4)
    ?.map((p) => ({ name: p.name, url: p.photo!.url })) || [
    { name: 'Bukit Tunku Dawn', url: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=300&q=80' },
    { name: 'ISTAC Moorish Arches', url: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=300&q=80' },
    { name: 'KLCC Ancient Ficus', url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=300&q=80' },
    { name: 'Kwai Chai Hong Bridge', url: 'https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=300&q=80' },
  ];

  const destinationTitle = destination?.meta.title || '3 Days in Kuala Lumpur';
  const destinationBadge = destination?.meta.badge || 'Smarter Flow • Zero Backtracking';
  const destinationSubtitle = destination?.meta.subtitle || 'North & Central Heritage, West Belt / PJ, Ampang & Chinatown';
  const destinationCode = destination?.meta.code || 'KUL-3D';
  const flagEmoji = destination?.meta.flagEmoji || '📍';

  return (
    <section className="relative w-full rounded-sm border border-[#e0e5dd] dark:border-[#223027] bg-[#fbfdf9] dark:bg-[#0e1411] overflow-hidden transition-colors shadow-xs">
      {/* Editorial Top Bar / Metadata */}
      <div className="px-4 sm:px-6 py-2.5 bg-[#edf2ea] dark:bg-[#121815] border-b border-[#e0e5dd] dark:border-[#223027] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#f6833b] animate-pulse" />
          <span className="font-bold text-[#18201a] dark:text-[#dfdfc1] uppercase tracking-wider flex items-center gap-1.5">
            <span>{flagEmoji}</span>
            <span>{destinationTitle}</span>
          </span>
          <span className="text-[#607065] dark:text-[#88968d] hidden sm:inline">·</span>
          <span className="text-[#f6833b] font-semibold hidden sm:inline">
            Route // {destinationCode}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-xs bg-[#e0e8dd] dark:bg-[#1a241f] text-[#2d7745] dark:text-[#78d197] font-semibold text-[11px] border border-[#d2ddd0] dark:border-[#2e3e34]">
            {totalStops} Iconic Stops Photographed
          </span>
        </div>
      </div>

      {/* Main Content Grid: Balanced 2-column editorial layout */}
      <div className="p-5 sm:p-7 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Left Column: Editorial Story Lead */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {/* Tag / Category line */}
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#607065] dark:text-[#88968d]">
              <span className="text-[#f6833b] font-bold">Curated Route</span>
              <span className="opacity-40">·</span>
              <span>{totalDays} Sequential Days</span>
              <span className="opacity-40">·</span>
              <span>{destinationBadge}</span>
            </div>

            {/* Heading in editorial serif style */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#0b0f0c] dark:text-[#f5f6ed] leading-tight">
              {destinationTitle}: {destinationBadge}
            </h2>

            {/* Subtitle / Narrative Excerpt */}
            <p className="text-sm sm:text-base text-[#526357] dark:text-[#a8b6ad] leading-relaxed max-w-2xl">
              {destinationSubtitle}
            </p>

            {/* Visual photography preview strip */}
            <div className="pt-1 flex items-center gap-2.5">
              <span className="text-[11px] font-mono text-[#607065] dark:text-[#88968d] uppercase tracking-wider flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-[#f6833b]" />
                <span>Highlights:</span>
              </span>
              <div className="flex items-center -space-x-2">
                {dynamicThumbnails.map((item, idx) => (
                  <img
                    key={idx}
                    src={item.url}
                    alt={item.name}
                    title={item.name}
                    className="w-7 h-7 rounded-full object-cover border-2 border-white dark:border-[#121815] shadow-xs"
                    loading="lazy"
                  />
                ))}
              </div>
              {onOpenGallery && (
                <button
                  type="button"
                  onClick={onOpenGallery}
                  className="text-[11px] font-mono text-[#f6833b] hover:underline font-bold ml-1 cursor-pointer"
                >
                  View {totalStops} Photos →
                </button>
              )}
            </div>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="pt-4 border-t border-[#ecf0e9] dark:border-[#1b251f] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs font-mono text-[#607065] dark:text-[#88968d]">
              <span className="flex items-center gap-1.5 text-[#18201a] dark:text-[#dfdfc1] font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#f6833b]" />
                {totalDays} Days
              </span>
              <span className="opacity-40">·</span>
              <span className="flex items-center gap-1.5 text-[#18201a] dark:text-[#dfdfc1] font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#2d7745] dark:text-[#78d197]" />
                {totalStops} Geographic Stops
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              {onOpenGallery && (
                <button
                  type="button"
                  onClick={onOpenGallery}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xs bg-[#ebf0e7] dark:bg-[#1a241f] hover:bg-[#dbe4d7] dark:hover:bg-[#223027] text-xs font-mono text-[#18201a] dark:text-[#dfdfc1] border border-[#d6ded4] dark:border-[#2e3e34] transition cursor-pointer font-medium"
                >
                  <Eye className="w-3.5 h-3.5 text-[#f6833b]" />
                  <span className="hidden sm:inline">Photo</span>
                  <span>Gallery</span>
                </button>
              )}

              <button
                type="button"
                onClick={onOpenMasterMap}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xs bg-[#ebf0e7] dark:bg-[#1a241f] hover:bg-[#dbe4d7] dark:hover:bg-[#223027] text-xs font-mono text-[#18201a] dark:text-[#dfdfc1] border border-[#d6ded4] dark:border-[#2e3e34] transition cursor-pointer font-medium"
              >
                <Compass className="w-3.5 h-3.5 text-[#2d7745] dark:text-[#78d197]" />
                <span>Master Map</span>
              </button>

              <button
                type="button"
                onClick={onExploreDay}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xs bg-[#f6833b] hover:bg-[#fa8e49] text-xs font-mono font-bold text-[#0b0d0b] transition cursor-pointer shadow-xs"
              >
                <span>View Circuit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Geographic Cluster & Efficiency Overview Card */}
        <div className="lg:col-span-5 rounded-xs border border-[#e0e5dd] dark:border-[#223027] bg-white dark:bg-[#131b17] p-4 sm:p-5 flex flex-col justify-between space-y-3.5 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#ecf0e9] dark:border-[#1b251f] pb-2.5">
            <span className="font-mono text-xs uppercase tracking-wider text-[#f6833b] font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Route Audit Overview</span>
            </span>
            <span className="font-mono text-[10px] text-[#607065] dark:text-[#88968d]">
              Audited 17-09-26
            </span>
          </div>

          {/* Efficiency Stats Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-xs bg-[#f6f9f4] dark:bg-[#0e1411] border border-[#e0e5dd] dark:border-[#1e2a22]">
              <span className="text-[10px] uppercase text-[#607065] dark:text-[#88968d] block">Road Saved</span>
              <span className="text-sm font-bold text-[#2d7745] dark:text-[#78d197]">~50+ km</span>
            </div>
            <div className="p-2.5 rounded-xs bg-[#f6f9f4] dark:bg-[#0e1411] border border-[#e0e5dd] dark:border-[#1e2a22]">
              <span className="text-[10px] uppercase text-[#607065] dark:text-[#88968d] block">Backtracking</span>
              <span className="text-sm font-bold text-[#18201a] dark:text-[#dfdfc1]">0 Loops</span>
            </div>
          </div>

          {/* 3 Clustered Corridors List */}
          <div className="space-y-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#607065] dark:text-[#88968d] block">
              3 Clustered Daily Zones
            </span>

            <div className="text-xs space-y-1 font-mono">
              <div className="flex items-center justify-between p-1.5 rounded-xs bg-[#f6f9f4] dark:bg-[#0e1411] border border-[#e0e5dd] dark:border-[#1e2a22]">
                <span className="flex items-center gap-1.5 text-[#18201a] dark:text-[#dfdfc1]">
                  <span className="w-2 h-2 rounded-full bg-[#b45309]" />
                  <span>Day 1: Bukit Tunku & Chow Kit</span>
                </span>
                <span className="text-[11px] text-[#607065] dark:text-[#88968d] font-semibold">6 stops</span>
              </div>

              <div className="flex items-center justify-between p-1.5 rounded-xs bg-[#f6f9f4] dark:bg-[#0e1411] border border-[#e0e5dd] dark:border-[#1e2a22]">
                <span className="flex items-center gap-1.5 text-[#18201a] dark:text-[#dfdfc1]">
                  <span className="w-2 h-2 rounded-full bg-[#0d9488]" />
                  <span>Day 2: Petaling Jaya Corridor</span>
                </span>
                <span className="text-[11px] text-[#607065] dark:text-[#88968d] font-semibold">6 stops</span>
              </div>

              <div className="flex items-center justify-between p-1.5 rounded-xs bg-[#f6f9f4] dark:bg-[#0e1411] border border-[#e0e5dd] dark:border-[#1e2a22]">
                <span className="flex items-center gap-1.5 text-[#18201a] dark:text-[#dfdfc1]">
                  <span className="w-2 h-2 rounded-full bg-[#6366f1]" />
                  <span>Day 3: Chinatown & Ampang</span>
                </span>
                <span className="text-[11px] text-[#607065] dark:text-[#88968d] font-semibold">4 stops</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
