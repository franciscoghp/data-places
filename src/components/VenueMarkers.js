import { useState } from "react";
import { Marker } from "react-leaflet";
import { VenueLocationIcon } from "./VenueLocationIcon";
import MarkerModal from "./MarkerModal";

const VenueMarkers = ({ venues, setState }) => {
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleMarkerClick = (venue) => {
    setSelectedVenue(venue);
    setShowModal(true);
    setState((prevState) => ({
      ...prevState,
      isAddingMarker: false // Deshabilitar agregar marcadores cuando el modal está abierto
    }));
  };

  const markers = venues.map((venue, i) => (
    <div key={i}>
      <Marker
        position={venue.geometry}
        icon={VenueLocationIcon}
        eventHandlers={{
          click: () => handleMarkerClick(venue),
        }}
      />
      {selectedVenue && (
        <MarkerModal 
          selectedVenue={selectedVenue} 
          setSelectedVenue={setSelectedVenue} 
          showModal={showModal} 
          setShowModal={setShowModal}
          setState={setState}
        />
      )}
    </div>
  ));

  return <>{markers}</>;
};

export default VenueMarkers;
