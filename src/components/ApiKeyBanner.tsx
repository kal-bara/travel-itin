import { useState } from 'react';
import { Key, ExternalLink, CheckCircle2, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

interface ApiKeyBannerProps {
  apiKey: string;
  onUpdateKey: (newKey: string) => void;
}

export function ApiKeyBanner({ apiKey, onUpdateKey }: ApiKeyBannerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);

  const isConfigured = Boolean(apiKey && apiKey.trim().length > 5);

  const handleSave = () => {
    const trimmed = tempKey.trim();
    onUpdateKey(trimmed);
    setIsOpen(false);
    if (trimmed.length > 5) {
      toast.success('Google Maps Platform API key applied', {
        description: 'Interactive maps and custom marker pins reloaded successfully',
      });
    } else {
      toast('API key cleared', {
        description: 'Maps falling back to default configuration',
      });
    }
  };

  return (
    <div className="bg-stone-100/90 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-700 mb-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {isConfigured ? (
            <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Google Maps Platform Active</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-stone-700 font-medium">
              <Key className="w-4 h-4 text-amber-600" />
              <span>Google Maps JavaScript API & Advanced Markers Ready</span>
            </span>
          )}
          <span className="hidden sm:inline text-stone-400">•</span>
          <span className="hidden sm:inline text-stone-500">
            {isConfigured
              ? 'Using configured API Key'
              : 'Add your Google Cloud Key or use Maps Demo Key for prototyping'}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-1 font-medium text-stone-600 hover:text-stone-900 transition cursor-pointer"
        >
          <span>{isOpen ? 'Close' : isConfigured ? 'Configure' : 'Add Key'}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-3 pt-3 border-t border-stone-200 text-xs space-y-3">
          <p className="text-stone-600 leading-relaxed">
            You can enter your Google Maps Platform API key below, or declare{' '}
            <code className="bg-stone-200 px-1 py-0.5 rounded font-mono text-[11px]">
              VITE_GOOGLE_MAPS_API_KEY
            </code>{' '}
            in your environment secrets.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="text"
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              placeholder="AIzaSy..."
              className="flex-1 px-3 py-1.5 bg-white border border-stone-300 rounded-lg font-mono text-xs focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            />
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-medium transition cursor-pointer"
            >
              Apply Key
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-stone-500 pt-1">
            <a
              href="https://mapsplatform.google.com/maps-demo-key?utm_campaign=gmp_mcp_codeassist_v1_aistudio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-amber-800 hover:underline font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Get Free Maps Demo Key (Zero Billing Setup)</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>

            <a
              href="https://console.cloud.google.com/google/maps-apis/credentials?utm_campaign=gmp_mcp_codeassist_v1_aistudio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-700 hover:underline font-medium"
            >
              <span>Google Cloud Console</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
