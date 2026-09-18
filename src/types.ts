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
}

export interface DayItinerary {
  id: string;
  dayNumber: number;
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
  code: string; // e.g. "KL-26-01"
  cityCode: string; // e.g. "KL"
  year: string; // e.g. "26"
  sequence: string; // e.g. "01"
  cityName: string; // e.g. "Kuala Lumpur"
  country: string; // e.g. "malaysia"
  countryName: string; // e.g. "Malaysia"
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
