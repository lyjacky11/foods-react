import { StrictMode, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import SearchBox from "./SearchBox";
import Results from "./Results";
import PlaceDetails from "./PlaceDetails";
import placesJson from "./places.json";
import "./style.css";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    fetchPlaces();
    document.title = "Food Places";
  }, []);

  function fetchPlaces() {
    setPlaces(placesJson.places);
    setFilteredPlaces(placesJson.places);
  }

  function getPlaceById(id) {
    let data = placesJson.places;
    return data.find((place) => place.id === id);
  }

  function getOtherLocations(place) {
    let data = placesJson.places;
    return data.filter((x) => x.name === place.name && x.id !== place.id);
  }

  return (
    <div className="app">
      <Router>
        <div className="header">
          <h2 className="title">Food Places</h2>
          <h3 className="subtitle">By: Jacky Ly</h3>
          <h5 className="links">
            <a href="https://github.com/lyjacky11" target="_blank">
              GitHub
            </a>{" "}
            |{" "}
            <a href="https://github.com/lyjacky11/foods-react" target="_blank">
              Project Repo
            </a>
          </h5>
        </div>
        <Switch>
          <Route exact path="/">
            <SearchBox
              places={places}
              filteredPlaces={filteredPlaces}
              setFilteredPlaces={setFilteredPlaces}
            />
            <Results filteredPlaces={filteredPlaces} />
          </Route>
          <Route
            exact
            path="/place/:id"
            render={(props) => (
              <PlaceDetails
                key={props.match.params.id}
                getPlaceById={getPlaceById}
                getOtherLocations={getOtherLocations}
              />
            )}
          ></Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
