/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { Toaster, toast } from 'sonner';
import { AmpChronicleHeader } from './components/AmpChronicleHeader';
import { NotesRail } from './components/NotesRail';
import { TimeCapsulesRail } from './components/TimeCapsulesRail';
import { ApiKeyBanner } from './components/ApiKeyBanner';
import { KL2601DestinationView } from '@/destinations/malaysia/KL-26-01/index';
import { KL_26_01_DESTINATION } from '@/destinations/malaysia/KL-26-01/data';
import { Place } from './types';
import { ChronicleNote } from './data/chronicleNotes';
import { FolderGit2, Sparkles, MapPin } from 'lucide-react';

export default function App() {
  const [apiKey, setApiKey] = useState<string>(
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  );
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('amp-theme');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'dark';
  });
  const [currentTab, setCurrentTab] = useState<
    'chronicle' | 'day-1' | 'day-2' | 'day-3' | 'master' | 'gallery' | 'notes'
  >('chronicle');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState<boolean>(false);

  // Sync theme with document html class and data-theme attribute
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    try {
      localStorage.setItem('amp-theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSelectNote = (note: ChronicleNote) => {
    setSelectedNoteId(note.id);
    if (note.stopId) {
      setSelectedPlaceId(note.stopId);
    }
    toast(`Viewing Note: ${note.title}`, {
      description: note.excerpt,
    });
  };

  const handleSelectStopFromRail = (stopId: string, dayNumber: number) => {
    setSelectedPlaceId(stopId);
    // Find place name
    const targetPlace = KL_26_01_DESTINATION.days
      .flatMap((d) => d.places)
      .find((p) => p.id === stopId);

    if (targetPlace) {
      toast.success(`Focused on #${targetPlace.number}: ${targetPlace.name}`, {
        description: `Day ${dayNumber} • ${targetPlace.time}`,
      });
      // Scroll to timeline item
      const el = document.getElementById(`timeline-item-${stopId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <APIProvider apiKey={apiKey} libraries={['marker']}>
      <div className="min-h-screen bg-[#fafaf8] dark:bg-[#0b0d0b] text-[#0b0f0c] dark:text-[#f5f6ed] font-sans antialiased flex flex-col transition-colors selection:bg-[#f6833b] selection:text-black">
        {/* Amp Chronicle Sticky Top Navbar */}
        <AmpChronicleHeader
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          theme={theme}
          onToggleTheme={toggleTheme}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          apiKey={apiKey}
          onOpenApiKeyModal={() => setApiKeyModalOpen(!apiKeyModalOpen)}
          totalStops={KL_26_01_DESTINATION.meta.totalStops}
        />

        {/* Google Maps API Key Drawer / Modal if toggled */}
        {apiKeyModalOpen && (
          <div className="w-full max-w-6xl mx-auto px-4 pt-4">
            <ApiKeyBanner
              apiKey={apiKey}
              onUpdateKey={(newKey) => {
                setApiKey(newKey);
                setApiKeyModalOpen(false);
              }}
              isOpen={apiKeyModalOpen}
              onClose={() => setApiKeyModalOpen(false)}
            />
          </div>
        )}

        {/* Chronicle Main 3-Column Architecture */}
        <div className="flex-1 w-full max-w-[1720px] mx-auto flex flex-col lg:flex-row items-stretch">
          {/* Left Rail: Notes Stream (Visible on XL screens, or when 'notes' tab active on mobile) */}
          <div
            className={`${
              currentTab === 'notes' ? 'block w-full' : 'hidden xl:block'
            } xl:w-[280px] 2xl:w-[320px] shrink-0 h-[calc(100vh-4rem)] sticky top-16`}
          >
            <NotesRail
              selectedNoteId={selectedNoteId}
              onSelectNote={handleSelectNote}
              onSelectStopId={handleSelectStopFromRail}
            />
          </div>

          {/* Center Column: Chronicle Primary Feed */}
          <main
            id="destination-viewport"
            className="flex-1 min-w-0 px-3 sm:px-6 md:px-8 py-6 max-w-5xl mx-auto w-full"
          >
            <KL2601DestinationView
              currentTab={currentTab}
              onSelectTab={setCurrentTab}
              searchQuery={searchQuery}
              selectedPlaceId={selectedPlaceId}
              onSelectPlace={(place: Place | null) =>
                setSelectedPlaceId(place ? place.id : null)
              }
            />
          </main>

          {/* Right Rail: Time Capsules & Route Audit (Visible on LG screens) */}
          <div className="hidden lg:block lg:w-[300px] 2xl:w-[340px] shrink-0 h-[calc(100vh-4rem)] sticky top-16">
            <TimeCapsulesRail onSelectStopId={handleSelectStopFromRail} />
          </div>
        </div>

        {/* Sonner Toast Notification Center */}
        <Toaster
          richColors
          position="bottom-right"
          theme={theme}
          closeButton
        />
      </div>
    </APIProvider>
  );
}
