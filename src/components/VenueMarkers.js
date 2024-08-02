import { useState } from "react";
import { Marker } from "react-leaflet";
import { VenueLocationIcon } from "./VenueLocationIcon";
// import MarkerPopup from "./MarkerPopup";

const VenueMarkers = (props) => {
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { venues } = props;

  const handleMarkerClick = (venue) => {
    setSelectedVenue(venue);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVenue(null);
  };

  const markers = venues.map((venue, i) => (
    // <Marker key={i} position={venue.geometry} icon={VenueLocationIcon}>
    //   <MarkerPopup data={venue} />
    // </Marker>
    <>
    <Marker
      key={i}
      position={venue.geometry}
      icon={VenueLocationIcon}
      eventHandlers={{
        click: () => handleMarkerClick(venue),
      }}
    />

    {selectedVenue && (
      <div className={`modal fade show ${showModal ? 'd-block' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Venue Information</h5>
              <button type="button" className="btn-close" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body">
              <p><strong>Name:</strong> {selectedVenue.name}</p>
              <p><strong>Latitude:</strong> {selectedVenue.geometry[0]}</p>
              <p><strong>Longitude:</strong> {selectedVenue.geometry[1]}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>

  ));
  return <>{markers}</>;
};

export default VenueMarkers;
