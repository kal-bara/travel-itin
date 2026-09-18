import { useState } from 'react';
import { Key, ExternalLink, CheckCircle2, ChevronDown, ChevronUp, ShieldCheck, X } from 'lucide-react';
import { toast } from 'sonner';

interface ApiKeyBannerProps {
  apiKey: string;
  onUpdateKey: (newKey: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function ApiKeyBanner({
  apiKey,
  onUpdateKey,
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
}: ApiKeyBannerProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const [tempKey, setTempKey] = useState(apiKey);

  const isConfigured = Boolean(apiKey && apiKey.trim().length > 5);

  const handleSave = () => {
    const trimmed = tempKey.trim();
    onUpdateKey(trimmed);
    if (controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
    if (trimmed.length > 5) {
      toast.success('Google Maps Platform API key applied', {
        description: 'Interactive maps and custom marker pins reloaded',
      });
    } else {
      toast('API key cleared', {
        description: 'Maps falling back to standard configuration',
      });
    }
  };

  if (!isOpen && controlledIsOpen !== undefined) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-[#121815] border border-[#e0e5dd] dark:border-[#223027] rounded-sm px-4 py-3 text-xs font-mono text-[#607065] dark:text-[#88968d] mb-4 shadow-xs">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {isConfigured ? (
            <span className="flex items-center gap-1.5 text-[#2d7745] dark:text-[#78d197] font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#2d7745] dark:text-[#78d197]" />
              <span>Google Maps Platform Active</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-[#b45309] dark:text-[#e5a05b] font-medium">
              <Key className="w-4 h-4 text-[#b45309] dark:text-[#e5a05b]" />
              <span>Maps API Configuration</span>
            </span>
          )}
          <span className="hidden sm:inline text-[#d2ddd0] dark:text-[#2e3e34]">•</span>
          <span className="hidden sm:inline text-[#607065] dark:text-[#88968d]">
            {isConfigured
              ? 'Using configured API Key'
              : 'Add your Google Cloud Key or use Maps Demo Key'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {controlledOnClose ? (
            <button
              type="button"
              onClick={controlledOnClose}
              className="p-1 text-[#607065] dark:text-[#88968d] hover:text-[#18201a] dark:hover:text-[#dfdfc1] rounded-xs hover:bg-[#edf2ea] dark:hover:bg-[#1a241f] transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setInternalIsOpen(!internalIsOpen)}
              className="inline-flex items-center gap-1 font-mono text-xs text-[#18201a] dark:text-[#dfdfc1] hover:text-[#f6833b] transition cursor-pointer"
            >
              <span>{isOpen ? 'Hide' : isConfigured ? 'Configure' : 'Add Key'}</span>
              {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="mt-3 pt-3 border-t border-[#e0e5dd] dark:border-[#223027] text-xs space-y-3 font-mono">
          <p className="text-[#607065] dark:text-[#88968d] leading-relaxed">
            Enter your Google Maps Platform API key below, or declare{' '}
            <code className="bg-[#edf2ea] dark:bg-[#1c2520] text-[#b45309] dark:text-[#f6833b] px-1.5 py-0.5 rounded-xs border border-[#d6ded4] dark:border-[#2e3e34]">
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
              className="flex-1 px-3 py-1.5 bg-[#fafaf8] dark:bg-[#0b0d0b] border border-[#d6ded4] dark:border-[#223027] rounded-xs text-[#0b0f0c] dark:text-[#f5f6ed] font-mono text-xs focus:outline-none focus:border-[#f6833b]"
            />
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-1.5 bg-[#f6833b] hover:bg-[#fa8e49] text-[#0b0d0b] rounded-xs font-bold transition cursor-pointer text-xs uppercase tracking-wider"
            >
              Apply Key
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[#88968d] pt-1">
            <a
              href="https://mapsplatform.google.com/maps-demo-key?utm_campaign=gmp_mcp_codeassist_v1_aistudio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#f6833b] hover:underline font-mono"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Get Free Maps Demo Key (Zero Billing Setup)</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
