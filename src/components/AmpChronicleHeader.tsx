import React from 'react';
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
} from 'lucide-react';
import { toast } from 'sonner';

interface AmpChronicleHeaderProps {
  currentTab: 'chronicle' | 'day-1' | 'day-2' | 'day-3' | 'master' | 'notes';
  onSelectTab: (tab: 'chronicle' | 'day-1' | 'day-2' | 'day-3' | 'master' | 'notes') => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  apiKey: string;
  onOpenApiKeyModal: () => void;
  totalStops: number;
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
}: AmpChronicleHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const tabs = [
    { id: 'chronicle', label: 'Chronicle' },
    { id: 'day-1', label: 'Day 1' },
    { id: 'day-2', label: 'Day 2' },
    { id: 'day-3', label: 'Day 3' },
    { id: 'master', label: 'Master Map' },
    { id: 'notes', label: 'Notes' },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e0e5dd] dark:border-[#223027] bg-[#fafaf8]/95 dark:bg-[#0b0d0b]/95 backdrop-blur-md transition-colors">
      <div className="w-full px-3 sm:px-6 md:px-8 mx-auto flex items-center justify-between h-14 sm:h-16 gap-3">
        {/* Brand / Title with Amp's signature "//" format */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#root"
            onClick={(e) => {
              e.preventDefault();
              onSelectTab('chronicle');
            }}
            className="flex items-center gap-2.5 text-[#0b0f0c] dark:text-[#f5f6ed] hover:opacity-90 transition-opacity"
          >
            {/* Geometric Amp-styled mark */}
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-sm bg-[#18201a] dark:bg-[#1c2520] border border-[#d6ded4] dark:border-[#2e3e34] flex items-center justify-center text-[#dfdfc1] font-mono font-bold text-xs shadow-2xs">
              <span className="text-[#f6833b]">⚡</span>
            </div>

            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="font-bold tracking-tight text-sm sm:text-base uppercase text-[#18201a] dark:text-[#f5f6ed]">
                Chronicle
              </span>
              <span className="text-[#f6833b] font-bold text-xs sm:text-sm">//</span>
              <span className="text-xs uppercase text-[#607065] dark:text-[#88968d] hidden sm:inline font-mono">
                KL-26-01
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#ecefe9] dark:bg-[#131b17] border border-[#d6ded4] dark:border-[#223027] text-[11px] font-mono text-[#607065] dark:text-[#88968d]">
            <span className="text-[#18201a] dark:text-[#dfdfc1] font-medium">
              destinations/
            </span>
            <span>malaysia/KL-26-01</span>
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
                className={`relative px-2.5 sm:px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-sm transition-all cursor-pointer select-none ${
                  isActive
                    ? 'bg-[#e4eae0] dark:bg-[#1c2520] text-[#18201a] dark:text-[#f5f6ed] font-semibold border border-[#cfd8cb] dark:border-[#2e3e34]'
                    : 'text-[#607065] dark:text-[#88968d] hover:text-[#18201a] dark:hover:text-[#dfdfc1] hover:bg-[#ebf0e7] dark:hover:bg-[#141c18]/60'
                }`}
              >
                {tab.label}
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
