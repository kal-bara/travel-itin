import { useEffect, useRef } from 'react';
import { useMap } from '@vis.gl/react-google-maps';

interface MapPolylineProps {
  key?: string | number;
  path: { lat: number; lng: number }[];
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWeight?: number;
  geodesic?: boolean;
}

export function MapPolyline({
  path,
  strokeColor = '#b45309',
  strokeOpacity = 0.85,
  strokeWeight = 4,
  geodesic = true,
}: MapPolylineProps) {
  const map = useMap();
  const polylineRef = useRef<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!map || typeof google === 'undefined' || !google.maps?.Polyline) {
      return;
    }

    if (!polylineRef.current) {
      polylineRef.current = new google.maps.Polyline({
        path,
        strokeColor,
        strokeOpacity,
        strokeWeight,
        geodesic,
        map,
      });
    } else {
      polylineRef.current.setOptions({
        path,
        strokeColor,
        strokeOpacity,
        strokeWeight,
      });
      polylineRef.current.setMap(map);
    }

    return () => {
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
        polylineRef.current = null;
      }
    };
  }, [map, path, strokeColor, strokeOpacity, strokeWeight, geodesic]);

  return null;
}
