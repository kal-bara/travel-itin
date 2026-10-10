export interface PlacePhoto {
  url: string;
  thumbnailUrl?: string;
  caption: string;
  credit?: string;
  category?:
    | 'Architecture'
    | 'Architecture & Nature'
    | 'Culinary'
    | 'Culinary & Heritage'
    | 'Nature & Skyline'
    | 'Heritage & Cafe'
    | 'Heritage & Culture'
    | 'Culture'
    | 'Atmosphere'
    | string;
  photoTip?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  isCustom?: boolean;
  uploadedAt?: string;
}

export interface PlaceTag {
  text: string;
  type?: 'default' | 'highlight' | 'cost' | 'opt';
}

export interface Place {
  id: string;
  number: number;
  globalNumber?: number;
  name: string;
  time: string;
  description: string;
  tags: PlaceTag[];
  coordinates: {
    lat: number;
    lng: number;
  };
  area: string;
  photo?: PlacePhoto;
}

export interface DayItinerary {
  id: string;
  dayNumber: number;
  city?: string;
  country?: string;
  date?: string;
  title: string;
  subtitle: string;
  badge: string;
  color: string;
  polylineColor: string;
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  places: Place[];
  googleMapsDirectionsUrl: string;
}

export interface DestinationMeta {
  id?: string; // e.g. "malaysia/kuala-lumpur-3d" or "europe/western-capitals-10d"
  code: string; // e.g. "KUL-3D" or "EUR-10D"
  cityCode?: string;
  year?: string;
  sequence?: string;
  cityName?: string;
  country?: string;
  countryName?: string;
  region?: string; // e.g. "Southeast Asia" or "Europe"
  routeSummary?: string; // e.g. "London • Paris • Amsterdam"
  flagEmoji?: string; // e.g. "🇲🇾" or "🇪🇺"
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  totalDays: number;
  totalStops: number;
}

export interface Destination {
  meta: DestinationMeta;
  days: DayItinerary[];
}
