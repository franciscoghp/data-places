import { useMap } from "react-leaflet";
import { useEffect } from "react";

const AddMarkerOnClick = ({ addVenue, isAddingMarker }) => {
  const map = useMap();

  useEffect(() => {
    const handleMapClick = (e) => {
      if (isAddingMarker) {
        addVenue(e.latlng);
      }
    };

    map.on('click', handleMapClick);

    return () => {
      map.off('click', handleMapClick);
    };
  }, [map, addVenue, isAddingMarker]);

  return null;
};

export default AddMarkerOnClick;
