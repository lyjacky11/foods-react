import { StrictMode, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import SearchBox from "./SearchBox";
import Results from "./Results";
import placesJson from "./places.json";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    getPlaces();
  }, []);

  function getPlaces() {
    setPlaces(placesJson.places);
    setFilteredPlaces(placesJson.places);
  }

  return (
    <div className="app">
      <div className="header">
        <h1 className="title">Food Places</h1>
        <h3 className="subtitle">By: Jacky Ly</h3>
      </div>
      <SearchBox
        places={places}
        filteredPlaces={filteredPlaces}
        setFilteredPlaces={setFilteredPlaces}
      />
      <Results filteredPlaces={filteredPlaces} />
    </div>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
