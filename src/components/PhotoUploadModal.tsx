import React, { useState, useRef, useEffect, DragEvent, ChangeEvent } from 'react';
import { Place } from '../types';
import {
  X,
  Upload,
  Link as LinkIcon,
  Camera,
  RotateCcw,
  Check,
  Sparkles,
  AlertCircle,
  Image as ImageIcon,
  MapPin,
  Info,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';
import { compressImageFile, saveCustomPhoto, removeCustomPhoto } from '../utils/photoStorage';

interface PhotoUploadModalProps {
  place: Place | null;
  isOpen: boolean;
  onClose: () => void;
  onPhotoSaved?: (placeId: string) => void;
}

export function PhotoUploadModal({
  place,
  isOpen,
  onClose,
  onPhotoSaved,
}: PhotoUploadModalProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [urlInput, setUrlInput] = useState<string>('');
  const [caption, setCaption] = useState<string>('');
  const [category, setCategory] = useState<string>('Traveler Capture');
  const [photoTip, setPhotoTip] = useState<string>('');
  const [credit, setCredit] = useState<string>('Personal Photo');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (place) {
      if (place.photo?.isCustom) {
        setPreviewUrl(place.photo.url);
        setCaption(place.photo.caption || '');
        setCategory(place.photo.category || 'Traveler Capture');
        setPhotoTip(place.photo.photoTip || '');
        setCredit(place.photo.credit || 'Personal Photo');
      } else {
        setPreviewUrl('');
        setUrlInput('');
        setCaption(place.photo?.caption || `My capture at ${place.name}`);
        setCategory(place.photo?.category || 'Traveler Capture');
        setPhotoTip(place.photo?.photoTip || '');
        setCredit('Personal Photo');
      }
    }
  }, [place, isOpen]);

  if (!isOpen || !place) return null;

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Invalid file format', {
        description: 'Please select a valid image file (JPEG, PNG, WEBP).',
      });
      return;
    }

    try {
      setIsProcessing(true);
      toast.loading('Processing & optimizing image...', { id: 'compress-toast' });
      const compressedDataUrl = await compressImageFile(file, 1280, 0.85);
      setPreviewUrl(compressedDataUrl);
      toast.success('Image ready for preview & saving', { id: 'compress-toast' });
    } catch (err) {
      console.error(err);
      toast.error('Failed to process image file', { id: 'compress-toast' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleLoadUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) {
      toast.error('Please enter an image URL');
      return;
    }
    setPreviewUrl(trimmed);
    toast.success('Image URL loaded successfully');
  };

  const handleSave = () => {
    if (!previewUrl) {
      toast.error('No photo selected', {
        description: 'Please upload an image file or enter a photo URL first.',
      });
      return;
    }

    try {
      saveCustomPhoto(place.id, {
        url: previewUrl,
        caption: caption.trim() || `My photo at ${place.name}`,
        category: category.trim() || 'Traveler Capture',
        photoTip: photoTip.trim(),
        credit: credit.trim() || 'Personal Photo',
      });

      toast.success(`Photo personalized for #${place.number} ${place.name}`, {
        description: 'Saved locally and immediately active across all views.',
      });

      if (onPhotoSaved) {
        onPhotoSaved(place.id);
      }
      onClose();
    } catch (err) {
      toast.error('Failed to save photo', {
        description: 'Local storage may be full. Try a smaller file.',
      });
    }
  };

  const handleRevert = () => {
    removeCustomPhoto(place.id);
    toast.success(`Restored original photo`, {
      description: `Default landmark photo restored for ${place.name}.`,
    });
    if (onPhotoSaved) {
      onPhotoSaved(place.id);
    }
    onClose();
  };

  const categories = [
    'Traveler Capture',
    'Architecture',
    'Culinary',
    'Heritage & Cafe',
    'Nature & Skyline',
    'Culture',
    'Atmosphere',
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#0e1410]/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 transition-colors"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#fafcf8] dark:bg-[#111713] border border-[#cbd6c8] dark:border-[#2b3a30] text-[#121914] dark:text-[#f5f6ed] rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(15,25,18,0.18)] dark:shadow-2xl flex flex-col max-h-[92vh] transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#dce4da] dark:border-[#223027] bg-[#edf3ea] dark:bg-[#16201a] font-mono text-xs transition-colors">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f6833b] inline-block" />
            <span className="uppercase tracking-wider text-[#18201a] dark:text-[#dfdfc1] font-bold">
              Personalize Photo // Stop #{place.number}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-xs hover:bg-[#dce6da] dark:hover:bg-[#25362c] text-[#55675b] dark:text-[#88968d] hover:text-[#0b0f0c] dark:hover:text-white transition cursor-pointer"
            title="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#fafcf8] dark:bg-[#111713] transition-colors">
          {/* Target Place Details */}
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#e2e8df] dark:border-[#223027]">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#55675b] dark:text-[#88968d]">
                <MapPin className="w-3.5 h-3.5 text-[#f6833b]" />
                <span>{place.area}</span>
                <span>•</span>
                <Clock className="w-3 h-3 text-[#55675b] dark:text-[#88968d]" />
                <span>{place.time}</span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl text-[#0b0f0c] dark:text-[#f5f6ed] leading-snug">
                {place.name}
              </h3>
            </div>

            {/* Current Photo Status Pill */}
            <div className="shrink-0 text-right">
              {place.photo?.isCustom ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 font-mono text-[10px] font-semibold">
                  <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>Custom Active</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs bg-[#eef3eb] dark:bg-[#1c2620] text-[#44564a] dark:text-[#a0b0a5] border border-[#d2ddd0] dark:border-[#2b3a30] font-mono text-[10px] font-medium">
                  <Camera className="w-3 h-3 text-[#f6833b]" />
                  <span>Default Curated</span>
                </span>
              )}
            </div>
          </div>

          {/* Current Landmark vs New Preview Status Card */}
          {!previewUrl && place.photo && (
            <div className="p-3 rounded-sm bg-[#f2f6ee] dark:bg-[#151e18] border border-[#d6dfd3] dark:border-[#243328] flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-14 h-12 rounded-xs overflow-hidden border border-[#ccd6c9] dark:border-[#2d3e33] shrink-0 bg-stone-900">
                  <img
                    src={place.photo.url}
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase text-[#607065] dark:text-[#88968d] flex items-center gap-1">
                    <span>Current Photo:</span>
                    <span className="font-semibold text-[#18201a] dark:text-[#dfdfc1]">
                      {place.photo.category || 'Architecture'}
                    </span>
                  </div>
                  <p className="font-serif italic text-xs text-[#2e3e34] dark:text-[#dfdfc1] truncate">
                    "{place.photo.caption}"
                  </p>
                </div>
              </div>

              <div className="text-[11px] font-mono text-[#55675b] dark:text-[#88968d] shrink-0 text-right">
                <span>Upload below to replace</span>
              </div>
            </div>
          )}

          {/* Method Selection Tabs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#44564a] dark:text-[#88968d] font-semibold">
                Select Photo Source
              </span>
            </div>

            <div className="flex items-center gap-1.5 p-1 rounded-xs bg-[#eef3ea] dark:bg-[#151e18] border border-[#d8e2d4] dark:border-[#223027] font-mono text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xs transition cursor-pointer ${
                  activeTab === 'upload'
                    ? 'bg-[#f6833b] text-[#0b0d0b] font-bold shadow-xs'
                    : 'text-[#4c5e52] dark:text-[#88968d] hover:text-[#18201a] dark:hover:text-[#dfdfc1] hover:bg-[#e2ebe0] dark:hover:bg-[#1f2b23]'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload File from Device</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('url')}
                className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xs transition cursor-pointer ${
                  activeTab === 'url'
                    ? 'bg-[#f6833b] text-[#0b0d0b] font-bold shadow-xs'
                    : 'text-[#4c5e52] dark:text-[#88968d] hover:text-[#18201a] dark:hover:text-[#dfdfc1] hover:bg-[#e2ebe0] dark:hover:bg-[#1f2b23]'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>Paste Image URL</span>
              </button>
            </div>
          </div>

          {/* Upload Method Body */}
          {activeTab === 'upload' ? (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-sm p-6 sm:p-7 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-[#f6833b] bg-[#fef5ee] dark:bg-[#f6833b]/10 scale-[1.01]'
                    : 'border-[#b8c7b5] dark:border-[#2d3e33] hover:border-[#f6833b] bg-[#f7faf5] dark:bg-[#151f19]/70 hover:bg-[#eff5eb] dark:hover:bg-[#1a2620]'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-[#e8efe5] dark:bg-[#1e2a22] border border-[#d0dbcd] dark:border-[#2a3a2f] flex items-center justify-center text-[#e06b23] dark:text-[#f6833b] mb-2.5 shadow-2xs">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs font-mono font-semibold text-[#18201a] dark:text-[#dfdfc1] mb-1">
                  Drag & drop your photograph here, or browse files
                </p>
                <p className="text-[11px] font-mono text-[#55675b] dark:text-[#88968d] mb-2.5">
                  Supports JPEG, PNG, WEBP (auto-compressed for speedy rendering)
                </p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs bg-white dark:bg-[#202d24] text-[#18201a] dark:text-[#dfdfc1] border border-[#c8d4c5] dark:border-[#2e3e34] shadow-2xs text-[11px] font-mono font-medium hover:bg-[#f3f7f0] transition">
                  <Camera className="w-3.5 h-3.5 text-[#f6833b]" />
                  <span>Browse Device Files</span>
                </span>
              </div>
            </div>
          ) : (
            /* Direct URL Mode */
            <div className="p-4 rounded-sm bg-[#f2f6ee] dark:bg-[#151f19] border border-[#d6dfd3] dark:border-[#243328] space-y-2">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#3c4e42] dark:text-[#a0b0a5] font-semibold">
                Image Direct Web Address (URL)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or your cloud image link"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLoadUrl()}
                  className="flex-1 bg-white dark:bg-[#18221c] border border-[#c6d2c3] dark:border-[#2c3d31] rounded-xs px-3 py-2 text-xs font-mono text-[#18201a] dark:text-[#dfdfc1] placeholder:text-[#88978b] dark:placeholder:text-[#55655a] focus:outline-none focus:ring-2 focus:ring-[#f6833b]/25 focus:border-[#f6833b]"
                />
                <button
                  type="button"
                  onClick={handleLoadUrl}
                  className="px-3.5 py-2 rounded-xs bg-[#e2ebe0] dark:bg-[#1f2b23] hover:bg-[#d6e2d3] dark:hover:bg-[#28382e] border border-[#c6d2c3] dark:border-[#2d3e33] text-xs font-mono text-[#18201a] dark:text-[#dfdfc1] font-bold cursor-pointer transition shadow-2xs"
                >
                  Load URL
                </button>
              </div>
              <p className="text-[10px] font-mono text-[#5e7063] dark:text-[#88968d]">
                Tip: Direct link to any public image on Unsplash, Imgur, or cloud storage.
              </p>
            </div>
          )}

          {/* Photo Live Preview Container */}
          {previewUrl && (
            <div className="space-y-2 p-3 rounded-sm bg-[#f2f6ee] dark:bg-[#151e18] border border-[#d4ded1] dark:border-[#25352a]">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-1.5 text-[#1b5e32] dark:text-[#78d197] font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>Preview Ready for Stop #{place.number}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setPreviewUrl('')}
                  className="text-[11px] text-[#b45309] dark:text-[#e5a05b] hover:underline cursor-pointer font-medium"
                >
                  Clear Photo
                </button>
              </div>

              <div className="relative w-full h-48 sm:h-56 rounded-sm overflow-hidden border border-[#cbd6c8] dark:border-[#2d3e33] bg-[#0b0f0c] shadow-xs">
                <img
                  src={previewUrl}
                  alt="User preview"
                  className="w-full h-full object-cover"
                />

                {/* Top Overlay Badge */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-xs bg-[#121914]/85 dark:bg-black/80 backdrop-blur-xs text-[10px] font-mono text-[#fbbf24] border border-white/20">
                  {category || 'Traveler Capture'}
                </div>

                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-xs bg-emerald-950/80 backdrop-blur-xs text-[10px] font-mono text-emerald-300 border border-emerald-500/40">
                  New Photo Selected
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-2 left-2 right-2 p-2 rounded-xs bg-[#121914]/85 dark:bg-black/75 backdrop-blur-xs text-[11px] font-serif italic text-white truncate border border-white/10">
                  "{caption || `My photo at ${place.name}`}"
                </div>
              </div>
            </div>
          )}

          {/* Metadata Customization Fields */}
          <div className="p-3.5 sm:p-4 rounded-sm bg-[#f3f7ef] dark:bg-[#141d17] border border-[#d6dfd3] dark:border-[#233127] space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#35483a] dark:text-[#a0b0a5] font-bold">
                Editorial Details & Memory
              </span>
              <span className="text-[10px] font-mono text-[#607264] dark:text-[#7d8f82]">
                Customizable
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#35483a] dark:text-[#a0b0a5] mb-1 font-semibold">
                Photo Caption / Traveler Memory
              </label>
              <input
                type="text"
                placeholder="Describe your moment, angle, or discovery..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full bg-white dark:bg-[#18221c] border border-[#c6d2c3] dark:border-[#2c3d31] rounded-xs px-3 py-2 text-xs text-[#18201a] dark:text-[#dfdfc1] placeholder:text-[#88978b] dark:placeholder:text-[#55655a] focus:outline-none focus:ring-2 focus:ring-[#f6833b]/25 focus:border-[#f6833b] font-serif shadow-2xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#35483a] dark:text-[#a0b0a5] mb-1 font-semibold">
                  Category / Landmark Theme
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white dark:bg-[#18221c] border border-[#c6d2c3] dark:border-[#2c3d31] rounded-xs px-2.5 py-2 text-xs font-mono text-[#18201a] dark:text-[#dfdfc1] focus:outline-none focus:ring-2 focus:ring-[#f6833b]/25 focus:border-[#f6833b] shadow-2xs cursor-pointer"
                >
                  {categories.map((c) => (
                    <option
                      key={c}
                      value={c}
                      className="bg-white text-[#18201a] dark:bg-[#18221c] dark:text-[#dfdfc1]"
                    >
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#35483a] dark:text-[#a0b0a5] mb-1 font-semibold">
                  Photo Credit / Camera Note
                </label>
                <input
                  type="text"
                  placeholder="e.g. Personal Photo / iPhone"
                  value={credit}
                  onChange={(e) => setCredit(e.target.value)}
                  className="w-full bg-white dark:bg-[#18221c] border border-[#c6d2c3] dark:border-[#2c3d31] rounded-xs px-3 py-2 text-xs font-mono text-[#18201a] dark:text-[#dfdfc1] placeholder:text-[#88978b] dark:placeholder:text-[#55655a] focus:outline-none focus:ring-2 focus:ring-[#f6833b]/25 focus:border-[#f6833b] shadow-2xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#35483a] dark:text-[#a0b0a5] mb-1 font-semibold">
                Perspective or Lighting Advice (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Best captured during golden hour from the rear garden pathway..."
                value={photoTip}
                onChange={(e) => setPhotoTip(e.target.value)}
                className="w-full bg-white dark:bg-[#18221c] border border-[#c6d2c3] dark:border-[#2c3d31] rounded-xs px-3 py-2 text-xs font-mono text-[#18201a] dark:text-[#dfdfc1] placeholder:text-[#88978b] dark:placeholder:text-[#55655a] focus:outline-none focus:ring-2 focus:ring-[#f6833b]/25 focus:border-[#f6833b] shadow-2xs"
              />
            </div>
          </div>

          {/* Local Storage & Privacy Callout */}
          <div className="p-2.5 rounded-xs bg-[#eef4ec] dark:bg-[#16211a] border border-[#d2ddd0] dark:border-[#243328] text-[11px] font-mono text-[#405245] dark:text-[#8ba091] flex items-start gap-2">
            <Info className="w-4 h-4 text-[#2d7745] dark:text-[#78d197] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Storage Note: Your image is saved locally in your browser storage. It instantly syncs across the Circuit Timeline, Visual Gallery, and Google Maps views.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:px-6 py-3 border-t border-[#dce4da] dark:border-[#223027] bg-[#edf3ea] dark:bg-[#16201a] flex flex-wrap items-center justify-between gap-2.5 font-mono text-xs transition-colors">
          <div>
            {place.photo?.isCustom && (
              <button
                type="button"
                onClick={handleRevert}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-[#fef2f2] dark:bg-[#241a1a] hover:bg-[#fee2e2] dark:hover:bg-[#311f1f] text-[#b91c1c] dark:text-[#f87171] border border-[#fecaca] dark:border-[#482828] transition cursor-pointer font-medium shadow-2xs"
                title="Restore default iconic landmark photo"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Revert to Default</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xs bg-white dark:bg-[#1f2b23] hover:bg-[#e4ede1] dark:hover:bg-[#28382e] text-[#405245] dark:text-[#88968d] hover:text-[#18201a] dark:hover:text-[#dfdfc1] border border-[#c6d2c3] dark:border-[#2d3e33] transition cursor-pointer shadow-2xs font-medium"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={!previewUrl || isProcessing}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xs font-bold transition shadow-xs cursor-pointer ${
                previewUrl && !isProcessing
                  ? 'bg-[#f6833b] hover:bg-[#e0722b] text-[#0b0d0b] active:scale-[0.98]'
                  : 'bg-[#d6ded4] dark:bg-[#243128] text-[#7d8f82] dark:text-[#5e7065] border border-[#c6d2c3] dark:border-[#2e3e34] cursor-not-allowed'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Photo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
