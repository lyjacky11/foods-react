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
import ThemeContext from "./ThemeContext";
import placesJson from "./places.json";
import "./style.css";

const App = () => {
  const theme = useState("light");
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    fetchPlaces();
    document.title = "Toronto Foods";
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
    <ThemeContext.Provider value={theme}>
      <div className="app">
        <Router>
          <div className="header">
            <h2 className="title">Toronto Foods</h2>
            <h4 className="links">
              By: Jacky Ly |{" "}
              <a href="https://github.com/lyjacky11" target="_blank">
                GitHub
              </a>{" "}
              |{" "}
              <a
                href="https://github.com/lyjacky11/foods-react"
                target="_blank"
              >
                Project Repo
              </a>
            </h4>
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
    </ThemeContext.Provider>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
