import L from "leaflet";

export const VenueLocationIcon = L.icon({
  iconUrl: require("../assets/venue_location_icon.svg").default,
  iconRetinaUrl: require("../assets/venue_location_icon.svg").default,
  iconAnchor: [17.5, 35], // Ajuste para anclar el ícono correctamente
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: "leaflet-venue-icon",
});