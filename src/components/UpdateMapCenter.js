import { useEffect } from "react";
import { useMap } from "react-leaflet";

export const UpdateMapCenter = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.setView(center, map.getZoom());
      }
    }, [center, map]);
  
    return null;
};