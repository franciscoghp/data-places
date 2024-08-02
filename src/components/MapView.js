import { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useLocation, useNavigate } from "react-router-dom";
import { UpdateMapCenter } from "./UpdateMapCenter";
import Markers from "./VenueMarkers";
import AddMarkerOnClick from "./AddMarkerOnClick";
import data from "../assets/db.json";
import "leaflet/dist/leaflet.css";

const MapView = () => {

  // Lógica para irme a Londres por default
  const [state, setState] = useState({
    currentLocation: { lat: 51.5074, lng: -0.1278 },
    zoom: 13,
    data: data, // Initial data from mock file
    isAddingMarker: true // Inicialmente, permitir agregar marcadores
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    // Lógica para irme a mi posicion actual

    if (location.state && location.state.latitude && location.state.longitude) {
      const currentLocation = {
        lat: location.state.latitude,
        lng: location.state.longitude,
      };

      setState((prevState) => ({
        ...prevState,
        currentLocation,
        data: {
          venues: prevState.data.venues.concat({
            name: "New Pin",
            geometry: [currentLocation.lat, currentLocation.lng],
          }),
        },
      }));
    }

    if (!!location?.state?.fetch) fectData();
  }, [location, location.state]);

  const addVenue = (latlng) => {
    if (!state.isAddingMarker) return; // Evitar agregar marcadores cuando el modal está abierto
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

  const fectData = async () => {

    // Lógica para irme a mi Berlin haciendo fetch

    try {
      const response = await fetch('https://my-json-server.typicode.com/franciscoghp/db-places/db');
      const dataFecth = await response.json();
      setState((prevState) => ({
        ...prevState,
        currentLocation: { lat: 52.52437, lng: 13.41053 },
        data: dataFecth
      }));
    } catch (error) {
      console.error('Error fetching venues:', error);
    }
  };

  return (
    <>
      <button onClick={() => navigate('/')} className="button-back">
        Back to Home
      </button>
      <MapContainer center={state.currentLocation} zoom={state.zoom} style={{ height: "100vh", width: "100%" }}>

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <UpdateMapCenter center={state.currentLocation} />

        <AddMarkerOnClick addVenue={addVenue} isAddingMarker={state.isAddingMarker} />

        <Markers venues={state.data.venues} setState={setState}/>

      </MapContainer>
    </>
  );
};

export default MapView;
