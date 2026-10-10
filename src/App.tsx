/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { Toaster, toast } from 'sonner';
import { AmpChronicleHeader } from './components/AmpChronicleHeader';
import { ApiKeyBanner } from './components/ApiKeyBanner';
import { KL2601DestinationView } from '@/destinations/malaysia/KL-26-01/index';
import { getDestinationEntry, DEFAULT_DESTINATION_PATH } from '@/destinations/index';
import { Place } from './types';

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
  const [currentDestinationPath, setCurrentDestinationPath] = useState<string>(DEFAULT_DESTINATION_PATH);
  const [currentTab, setCurrentTab] = useState<'chronicle' | 'master' | 'gallery'>('chronicle');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState<boolean>(false);

  const currentEntry = getDestinationEntry(currentDestinationPath);
  const currentDestination = currentEntry.destination;

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

  const handleSelectDestination = (newPath: string) => {
    setCurrentDestinationPath(newPath);
    setSelectedPlaceId(null);
    const newEntry = getDestinationEntry(newPath);
    toast.success(`Switched to ${newEntry.title}`, {
      description: `${newEntry.code} • ${newEntry.badge}`,
    });
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
          totalStops={currentDestination.meta.totalStops}
          currentDestinationId={currentDestinationPath}
          onSelectDestination={handleSelectDestination}
        />

        {/* Google Maps API Key Drawer / Modal if toggled */}
        {apiKeyModalOpen && (
          <div className="w-full max-w-5xl mx-auto px-4 pt-4">
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

        {/* Main Chronicle Primary Workspace */}
        <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col items-stretch px-3 sm:px-6 md:px-8 py-6">
          <main id="destination-viewport" className="w-full min-w-0">
            <KL2601DestinationView
              destination={currentDestination}
              currentTab={currentTab}
              onSelectTab={setCurrentTab}
              searchQuery={searchQuery}
              selectedPlaceId={selectedPlaceId}
              onSelectPlace={(place: Place | null) =>
                setSelectedPlaceId(place ? place.id : null)
              }
            />
          </main>
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
