/**
 * Destinations Registry
 * 
 * Naming convention: country/citycode-YY-sequencednumber
 * Example: malaysia/KL-26-01 (Kuala Lumpur, 2026, 01)
 */

import { ComponentType } from 'react';
import { Destination } from '@/src/types';
import {
  KL_26_01_DESTINATION,
  KL2601DestinationView,
} from './malaysia/KL-26-01';
import { EUR_10D_DESTINATION } from './europe/western-capitals-10d/data';

export interface DestinationEntry {
  path: string; // e.g. "malaysia/kuala-lumpur-3d" or "europe/western-capitals-10d"
  region: string; // e.g. "Southeast Asia" or "Europe"
  country: string; // e.g. "Malaysia" or "Western Europe"
  code: string; // e.g. "KUL-3D" or "EUR-10D"
  title: string;
  badge: string;
  totalDays: number;
  totalStops: number;
  flagEmoji: string;
  destination: Destination;
  component: ComponentType<any>;
}

export const DESTINATIONS: Record<string, DestinationEntry> = {
  'malaysia/kuala-lumpur-3d': {
    path: 'malaysia/kuala-lumpur-3d',
    region: 'Southeast Asia',
    country: 'Malaysia',
    code: 'KUL-3D',
    title: '3 Days in Kuala Lumpur',
    badge: 'Smarter Flow • Zero Backtracking',
    totalDays: 3,
    totalStops: 16,
    flagEmoji: '🇲🇾',
    destination: KL_26_01_DESTINATION,
    component: KL2601DestinationView,
  },
  'europe/western-capitals-10d': {
    path: 'europe/western-capitals-10d',
    region: 'Europe',
    country: 'Western Europe',
    code: 'EUR-10D',
    title: '10 Days in Western Europe',
    badge: 'London • Paris • Amsterdam Rail',
    totalDays: 10,
    totalStops: 24,
    flagEmoji: '🇪🇺',
    destination: EUR_10D_DESTINATION,
    component: KL2601DestinationView,
  },
};

// Aliases for backward compatibility
DESTINATIONS['malaysia/KL-26-01'] = DESTINATIONS['malaysia/kuala-lumpur-3d'];

export const DEFAULT_DESTINATION_PATH = 'malaysia/kuala-lumpur-3d';

export function getDestinationEntry(pathOrCode: string): DestinationEntry {
  if (DESTINATIONS[pathOrCode]) {
    return DESTINATIONS[pathOrCode];
  }
  // Try matching by code only (e.g. "KUL-3D", "EUR-10D", "KL-26-01")
  const entry = Object.values(DESTINATIONS).find(
    (d) => d.code.toUpperCase() === pathOrCode.toUpperCase()
  );
  if (entry) return entry;
  return DESTINATIONS[DEFAULT_DESTINATION_PATH];
}

export function getAllDestinations(): DestinationEntry[] {
  // Return unique entries (deduping aliases)
  const uniqueMap = new Map<string, DestinationEntry>();
  Object.values(DESTINATIONS).forEach((d) => {
    if (!uniqueMap.has(d.path)) {
      uniqueMap.set(d.path, d);
    }
  });
  return Array.from(uniqueMap.values());
}

// Direct re-exports
export * from './malaysia/KL-26-01';
export * from './europe/western-capitals-10d/data';
