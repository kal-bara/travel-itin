import { PlacePhoto } from '../types';

export interface CustomPhotoEntry {
  url: string;
  caption: string;
  photoTip?: string;
  category?: string;
  credit?: string;
  uploadedAt: string;
}

const STORAGE_KEY = 'amp-chronicle-custom-photos-v1';

export function getCustomPhotos(): Record<string, CustomPhotoEntry> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse custom photos from localStorage', err);
    return {};
  }
}

export function saveCustomPhoto(
  placeId: string,
  entry: Omit<CustomPhotoEntry, 'uploadedAt'> & { uploadedAt?: string }
): void {
  try {
    const current = getCustomPhotos();
    current[placeId] = {
      ...entry,
      uploadedAt: entry.uploadedAt || new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent('custom-photos-updated', { detail: { placeId } }));
  } catch (err) {
    console.error('Failed to save custom photo to localStorage', err);
    throw err;
  }
}

export function removeCustomPhoto(placeId: string): void {
  try {
    const current = getCustomPhotos();
    if (current[placeId]) {
      delete current[placeId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      window.dispatchEvent(new CustomEvent('custom-photos-updated', { detail: { placeId } }));
    }
  } catch (err) {
    console.error('Failed to remove custom photo from localStorage', err);
  }
}

export function resetAllCustomPhotos(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('custom-photos-updated', { detail: { resetAll: true } }));
  } catch (err) {
    console.error('Failed to reset all custom photos', err);
  }
}

/**
 * Resizes and compresses an image file to a lightweight data URL
 * so it fits safely into client localStorage without hitting quota limits.
 */
export function compressImageFile(
  file: File,
  maxDimension = 1280,
  quality = 0.84
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image into canvas'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get 2d context for image compression'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Try JPEG first with specified quality
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}
