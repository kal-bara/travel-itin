import React, { useState, useRef, useEffect } from 'react';
import {
  Compass,
  MapPin,
  Calendar,
  Sun,
  Moon,
  Search,
  Key,
  ExternalLink,
  Layers,
  Sparkles,
  Radio,
  RadioTower,
  SlidersHorizontal,
  X,
  Menu,
  Camera,
  ChevronDown,
  Check,
  Globe,
} from 'lucide-react';
import { toast } from 'sonner';
import { getAllDestinations, getDestinationEntry } from '@/destinations/index';

interface AmpChronicleHeaderProps {
  currentTab: 'chronicle' | 'master' | 'gallery';
  onSelectTab: (tab: 'chronicle' | 'master' | 'gallery') => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  apiKey: string;
  onOpenApiKeyModal: () => void;
  totalStops: number;
  currentDestinationId?: string;
  onSelectDestination?: (destinationPath: string) => void;
}

export function AmpChronicleHeader({
  currentTab,
  onSelectTab,
  theme,
  onToggleTheme,
  searchQuery,
  onSearchChange,
  apiKey,
  onOpenApiKeyModal,
  totalStops,
  currentDestinationId = 'malaysia/kuala-lumpur-3d',
  onSelectDestination,
}: AmpChronicleHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destMenuOpen, setDestMenuOpen] = useState(false);
  const destMenuRef = useRef<HTMLDivElement>(null);

  const allDestinations = getAllDestinations();
  const activeEntry = getDestinationEntry(currentDestinationId);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (destMenuRef.current && !destMenuRef.current.contains(event.target as Node)) {
        setDestMenuOpen(false);
      }
    }
    if (destMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [destMenuOpen]);

  const tabs = [
    { id: 'chronicle', label: 'Chronicle' },
    { id: 'master', label: 'Master Map' },
    { id: 'gallery', label: `Photos (${totalStops})`, hasIcon: true },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e0e5dd] dark:border-[#223027] bg-[#fafaf8]/95 dark:bg-[#0b0d0b]/95 backdrop-blur-md transition-colors">
      <div className="w-full px-3 sm:px-6 md:px-8 mx-auto flex items-center justify-between h-14 sm:h-16 gap-3">
        {/* Brand & Dynamic Destination Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="#root"
            onClick={(e) => {
              e.preventDefault();
              onSelectTab('chronicle');
            }}
            className="flex items-center gap-2 text-[#0b0f0c] dark:text-[#f5f6ed] hover:opacity-90 transition-opacity"
          >
            <img
              src="/favicon.svg?v=2"
              alt="Travel Chronicle Wayfinder"
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-sm shadow-2xs border border-[#d6ded4] dark:border-[#2e3e34] object-contain shrink-0"
              referrerPolicy="no-referrer"
            />

            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="font-bold tracking-tight text-sm sm:text-base uppercase text-[#18201a] dark:text-[#f5f6ed]">
                Chronicle
              </span>
              <span className="text-[#f6833b] font-bold text-xs sm:text-sm">//</span>
            </div>
          </a>

          {/* Time-Agnostic Destination Picker Dropdown */}
          <div className="relative" ref={destMenuRef}>
            <button
              type="button"
              onClick={() => setDestMenuOpen(!destMenuOpen)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-[#d6ded4] dark:border-[#2e3e34] bg-white dark:bg-[#131b17] hover:border-[#f6833b] dark:hover:border-[#f6833b] text-xs font-mono text-[#18201a] dark:text-[#f5f6ed] transition-all cursor-pointer shadow-2xs group"
              title="Switch Itinerary Destination"
            >
              <span className="text-sm">{activeEntry.flagEmoji}</span>
              <span className="font-bold text-[#f6833b] uppercase tracking-wide">
                {activeEntry.code}
              </span>
              <span className="hidden md:inline text-[#607065] dark:text-[#88968d] truncate max-w-[130px]">
                {activeEntry.title.replace('3 Days in ', '').replace('10 Days in ', '')}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#88968d] transition-transform duration-200 ${
                  destMenuOpen ? 'rotate-180 text-[#f6833b]' : 'group-hover:text-[#18201a] dark:group-hover:text-[#f5f6ed]'
                }`}
              />
            </button>

            {/* Destination Selection Dropdown Menu */}
            {destMenuOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-72 sm:w-80 rounded-sm border border-[#d6ded4] dark:border-[#2e3e34] bg-[#fafaf8] dark:bg-[#0e1411] shadow-xl z-50 p-1.5 space-y-1 backdrop-blur-md animate-in fade-in zoom-in-95 duration-100">
                <div className="px-2.5 py-1.5 border-b border-[#e0e5dd] dark:border-[#223027] flex items-center justify-between text-[11px] font-mono text-[#607065] dark:text-[#88968d]">
                  <span className="uppercase font-semibold tracking-wider">Itinerary Registry</span>
                  <span className="text-[10px] opacity-70">{allDestinations.length} Routes</span>
                </div>

                <div className="max-h-72 overflow-y-auto py-1 space-y-1">
                  {allDestinations.map((dest) => {
                    const isSelected = dest.path === activeEntry.path;
                    return (
                      <button
                        key={dest.path}
                        type="button"
                        onClick={() => {
                          if (onSelectDestination) {
                            onSelectDestination(dest.path);
                          }
                          setDestMenuOpen(false);
                        }}
                        className={`w-full flex items-start gap-2.5 p-2 rounded-xs text-left font-mono transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#edf3ea] dark:bg-[#1a251f] border border-[#cfdcc9] dark:border-[#2d4234]'
                            : 'hover:bg-[#f0f4ee] dark:hover:bg-[#151c18] border border-transparent'
                        }`}
                      >
                        <span className="text-xl shrink-0 mt-0.5">{dest.flagEmoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold text-[#18201a] dark:text-[#f5f6ed] truncate">
                              {dest.title}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded-2xs bg-[#e0e7dc] dark:bg-[#202c25] text-[#f6833b] font-bold shrink-0">
                              {dest.code}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#607065] dark:text-[#88968d] truncate mt-0.5">
                            {dest.badge}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-[#88968d]">
                            <span>{dest.totalDays} Days</span>
                            <span>•</span>
                            <span>{dest.totalStops} Stops</span>
                            <span>•</span>
                            <span className="text-[#18201a] dark:text-[#dfdfc1]">{dest.region}</span>
                          </div>
                        </div>
                        {isSelected && (
                          <Check className="w-4 h-4 text-[#2d7745] dark:text-[#78d197] shrink-0 mt-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#ecefe9] dark:bg-[#131b17] border border-[#d6ded4] dark:border-[#223027] text-[11px] font-mono text-[#607065] dark:text-[#88968d]">
            <span className="text-[#18201a] dark:text-[#dfdfc1] font-medium">
              destinations/
            </span>
            <span className="truncate max-w-[160px]">{activeEntry.path}</span>
          </div>
        </div>

        {/* Center Navigation Tabs (Amp Chronicle style pills) */}
        <nav className="hidden md:flex items-center gap-1">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={`relative inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-sm transition-all cursor-pointer select-none ${
                  isActive
                    ? 'bg-[#e4eae0] dark:bg-[#1c2520] text-[#18201a] dark:text-[#f5f6ed] font-semibold border border-[#cfd8cb] dark:border-[#2e3e34]'
                    : 'text-[#607065] dark:text-[#88968d] hover:text-[#18201a] dark:hover:text-[#dfdfc1] hover:bg-[#ebf0e7] dark:hover:bg-[#141c18]/60'
                }`}
              >
                {tab.id === 'gallery' && (
                  <Camera className={`w-3.5 h-3.5 ${isActive ? 'text-[#f6833b]' : 'text-[#88968d]'}`} />
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Tools: Search, Theme Toggle, Maps API, Directions */}
        <div className="flex items-center gap-2">
          {/* Quick Search */}
          <div className="relative hidden xl:block w-40 2xl:w-48">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#88968d]" />
            <input
              type="text"
              placeholder="Search stops..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white dark:bg-[#131b17] border border-[#d6ded4] dark:border-[#223027] rounded-sm pl-8 pr-2 py-1 text-xs text-[#18201a] dark:text-[#f5f6ed] placeholder-[#88968d] focus:outline-none focus:border-[#f6833b] font-mono transition-colors"
            />
          </div>

          {/* API Key Status Indicator button */}
          <button
            type="button"
            onClick={onOpenApiKeyModal}
            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-sm text-xs font-mono border transition-colors cursor-pointer ${
              apiKey
                ? 'bg-[#e8f3ea] dark:bg-[#131e18] text-[#2d7745] dark:text-[#78d197] border-[#badfbe] dark:border-[#1e3927]'
                : 'bg-[#faefe3] dark:bg-[#1c1813] text-[#b36319] dark:text-[#e5a05b] border-[#e9d2be] dark:border-[#362615]'
            }`}
            title="Configure Google Maps API Key"
          >
            <Key className="w-3 h-3" />
            <span className="hidden sm:inline">
              {apiKey ? 'Maps: Active' : 'Maps Key'}
            </span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-1.5 rounded-sm border border-[#d6ded4] dark:border-[#223027] bg-[#ffffff] dark:bg-[#131b17] text-[#607065] dark:text-[#88968d] hover:text-[#18201a] dark:hover:text-[#dfdfc1] transition-colors cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-[#e5a05b]" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-[#526357]" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-sm border border-[#d6ded4] dark:border-[#223027] bg-[#ffffff] dark:bg-[#131b17] text-[#607065] dark:text-[#88968d] hover:text-[#18201a] dark:hover:text-[#dfdfc1]"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e0e5dd] dark:border-[#223027] bg-[#fafaf8] dark:bg-[#0b0d0b] px-4 py-3 space-y-2">
          <div className="relative w-full mb-3">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#88968d]" />
            <input
              type="text"
              placeholder="Search 16 stops..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white dark:bg-[#131b17] border border-[#d6ded4] dark:border-[#223027] rounded-sm pl-8 pr-2 py-1.5 text-xs text-[#18201a] dark:text-[#f5f6ed] font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  onSelectTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 text-xs font-mono uppercase tracking-wider rounded-sm text-left ${
                  currentTab === tab.id
                    ? 'bg-[#1c2520] text-[#f5f6ed] font-bold border border-[#2e3e34]'
                    : 'text-[#88968d] hover:bg-[#131b17]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
