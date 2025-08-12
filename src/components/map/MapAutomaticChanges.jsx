import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import { updateLocationCoordsByMoved } from '../../store/newAdSlice';

export function MapAutomaticChanges({
  lat,
  lon,
  setMovedLat,
  setMovedLon,
  movedLat,
  movedLon,
  setMapMoved,
}) {
  const map = useMap();
  const dispatch = useDispatch();

  // Auto Find Loc On Map
  useEffect(() => {
    lat && lon && map.setView([lat, lon]);
  }, [lat, lon, map]);

  // Find center Of Map on move
  useEffect(() => {
    const handleMoveEnd = () => {
      const center = map.getCenter();
      setMovedLat(center.lat);
      setMovedLon(center.lng);

      setMapMoved(!!(center.lat && center.lng));
    };

    map.on('moveend', handleMoveEnd);

    // cleanup listener on unmount
    return () => {
      map.off('moveend', handleMoveEnd);
    };
  }, [map]);

  // Change Coordinate in Redux After Moving
  useEffect(() => {
    if (movedLat && movedLon) {
      dispatch(updateLocationCoordsByMoved({ lat: movedLat, lon: movedLon }));
    }
  }, [movedLat, movedLon]);

  return null;
}
