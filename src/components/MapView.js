import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import data from "../assets/data.json";
import Markers from "./VenueMarkers";

import { useLocation, useNavigate } from "react-router-dom";

import "leaflet/dist/leaflet.css";

const AddMarkerOnClick = ({ addVenue }) => {
  useMapEvents({
    click: (e) => {
      addVenue(e.latlng);
    },
  });
  return null;
};

const fectData = async () => {
  return await fetch('https://run.mocky.io/v3/7e46cf97-9769-485d-9aa5-4444619597c6', {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=UTF-8'
    },
  })
  .then(response => response.json())
  .then(data => console.log(data.venues))
  .catch(error => console.error('Error fetching venues:', error));
  
  // console.log(dataFecth)
  // return data;
};

const MapView = () => {
  const [state, setState] = useState({
    currentLocation: { lat: 52.52437, lng: 13.41053 },//Berlin
    zoom: 13,
    data: fectData() && null,
  });
  // const [selectedVenue, setSelectedVenue] = useState(null);
  // const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.latitude && location.state.longitude) {
      const currentLocation = {
        lat: location.state.latitude,
        lng: location.state.longitude,
      };
      setState((prevState) => ({
        ...prevState,
        data: {
          venues: prevState.data.venues.concat({
            name: "New Pin",
            geometry: [currentLocation.lat, currentLocation.lng],
          }),
        },
        currentLocation,
      }));
      navigate('/map', { replace: true, state: {} });
    }
  }, [location, navigate]);

  const addVenue = (latlng) => {
    setState((prevState) => ({
      ...prevState,
      data: {
        venues: prevState.data.venues.concat({
          name: "New Pin",
          geometry: [latlng.lat, latlng.lng],
        }),
      },
    }));
  };

  // const handleMarkerClick = (venue) => {
  //   setSelectedVenue(venue);
  //   setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   setSelectedVenue(null);
  // };

  return (
    <MapContainer center={state.currentLocation} zoom={state.zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <AddMarkerOnClick addVenue={addVenue} />
      <Markers venues={state.data.venues} />
    </MapContainer>
  );
};

export default MapView;
