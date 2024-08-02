import { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom";

const Home = () => {
  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
        setLoading(false);
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-header">Geolocation</h1>
      <h6 className="">Current Location:</h6>
      {loading ? 
        (
          <div className="loader"></div>
        ) 
        : 
        (
          <div className="home-coordinates">
            <p>Latitude: {state.latitude}</p>
            <p>Longitude: {state.longitude}</p>
          </div>
        )
      }

      <button onClick={() => navigate('/map', { state })}
        className="home-link mb-2 border-none"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Current location on map">
        See current location
      </button>

      <button onClick={() => navigate('/map',)} 
        className="home-link mb-2 border-none"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="With Mock Data">
        See markers London
      </button>
  
      <button onClick={() => navigate('/map', { state: {fetch: true} })} 
        className="home-link mb-2 border-none"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="With Fecth Data">
        See markers Berlin
      </button>

    </div>
  );
};

export default Home;
