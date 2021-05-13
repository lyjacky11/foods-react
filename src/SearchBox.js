import { useState, useEffect } from "react";
import Place from "./Place";

const CATEGORIES = ["Boba", "Restaurant", "Sushi"];

const SearchBox = () => {
  const [categoryValue, setCategoryValue] = useState("");
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getPlaces();
  }, []);

  function getPlaces() {
    setPlaces([
      {
        id: 1,
        name: "The Alley",
        category: "Boba",
        address: "5 St Joseph St",
        city: "Toronto",
        province: "ON",
        postal: "M4Y 0B6",
      },
    ]);
  }

  return (
    <div className="search-box">
      <form>
        <label htmlFor="category">
          Category
          <select
            id="category"
            value={categoryValue}
            onChange={(e) => setCategoryValue(e.target.value)}
            onBlur={(e) => setCategoryValue(e.target.value)}
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <button>Search</button>
      </form>
      {places.map((place) => (
        <Place
          key={place.id}
          id={place.id}
          name={place.name}
          address={place.address}
          city={place.city}
          province={place.province}
          postal={place.postal}
        />
      ))}
    </div>
  );
};

export default SearchBox;
