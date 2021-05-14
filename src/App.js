import { StrictMode, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import SearchBox from "./SearchBox";
import Results from "./Results";
import placesJson from "./places.json";

const App = () => {
  const [places, setPlaces] = useState([]);

  function getPlaces() {
    setPlaces(placesJson.places);
  }

  useEffect(() => {
    getPlaces();
  }, []);

  return (
    <div className="app">
      <h1 className="header">Food Places</h1>
      <SearchBox places={places} />
      <Results places={places} />
    </div>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
