export interface PlaceTag {
  text: string;
  type?: 'default' | 'highlight' | 'cost' | 'opt';
}

export interface Place {
  id: string;
  number: number;
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
