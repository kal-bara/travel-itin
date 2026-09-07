/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { Toaster, toast } from 'sonner';
import { ApiKeyBanner } from './components/ApiKeyBanner';
import {
  DESTINATIONS,
  DEFAULT_DESTINATION_PATH,
  getAllDestinations,
  getDestinationEntry,
} from '@/destinations/index';
import { FolderGit2, MapPin, Globe2 } from 'lucide-react';

export default function App() {
  const [apiKey, setApiKey] = useState<string>(
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  );
  const [selectedDestinationPath, setSelectedDestinationPath] = useState<string>(
    DEFAULT_DESTINATION_PATH
  );

  const currentDestinationEntry = getDestinationEntry(selectedDestinationPath);
  const allDestinations = getAllDestinations();
  const DestinationComponent = currentDestinationEntry.component;

  return (
    <APIProvider apiKey={apiKey} libraries={['marker']}>
      <div className="min-h-screen bg-[#fcfbfa] text-stone-900 font-sans antialiased py-6 px-3 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Top Architecture Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-xl border border-stone-200 shadow-2xs text-xs">
            <div className="flex items-center gap-2 text-stone-700">
              <span className="p-1.5 rounded-lg bg-stone-100 text-stone-800">
                <FolderGit2 className="w-4 h-4 text-amber-700" />
              </span>
              <div>
                <span className="text-stone-400 font-mono">destinations/</span>
                <span className="font-mono font-bold text-stone-900">
                  {currentDestinationEntry.path}
                </span>
              </div>
            </div>

            {/* Destination selector if multiple, or informative code tag */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-stone-100 rounded-md text-stone-600 font-mono text-[11px]">
                <Globe2 className="w-3.5 h-3.5 text-stone-500" />
                <span>Format: country/citycode-YY-seq</span>
              </div>

              {allDestinations.length > 1 && (
                <select
                  value={selectedDestinationPath}
                  onChange={(e) => setSelectedDestinationPath(e.target.value)}
                  className="px-2.5 py-1 bg-stone-50 border border-stone-300 rounded-md text-xs font-medium cursor-pointer"
                >
                  {allDestinations.map((d) => (
                    <option key={d.path} value={d.path}>
                      {d.path} ({d.destination.meta.cityName})
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Google Maps API Key Indicator */}
          <ApiKeyBanner apiKey={apiKey} onUpdateKey={setApiKey} />

          {/* Render the compiled Destination Component from destinations/country/citycode-YY-sequencednumber */}
          <main id="destination-viewport">
            <DestinationComponent />
          </main>
        </div>

        {/* Sonner Toast Notification Center (Emil Kowalski) */}
        <Toaster richColors position="bottom-right" closeButton />
      </div>
    </APIProvider>
  );
}
