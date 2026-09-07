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

export interface DestinationEntry {
  path: string; // e.g. "malaysia/KL-26-01"
  country: string; // e.g. "malaysia"
  code: string; // e.g. "KL-26-01"
  destination: Destination;
  component: ComponentType<{ initialViewMode?: 'daily' | 'master' }>;
}

export const DESTINATIONS: Record<string, DestinationEntry> = {
  'malaysia/KL-26-01': {
    path: 'malaysia/KL-26-01',
    country: 'malaysia',
    code: 'KL-26-01',
    destination: KL_26_01_DESTINATION,
    component: KL2601DestinationView,
  },
};

export const DEFAULT_DESTINATION_PATH = 'malaysia/KL-26-01';

export function getDestinationEntry(pathOrCode: string): DestinationEntry {
  if (DESTINATIONS[pathOrCode]) {
    return DESTINATIONS[pathOrCode];
  }
  // Try matching by code only (e.g. "KL-26-01")
  const entry = Object.values(DESTINATIONS).find((d) => d.code === pathOrCode);
  if (entry) return entry;
  return DESTINATIONS[DEFAULT_DESTINATION_PATH];
}

export function getAllDestinations(): DestinationEntry[] {
  return Object.values(DESTINATIONS);
}

// Direct re-exports
export * from './malaysia/KL-26-01';
