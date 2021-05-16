import { useState, useEffect, useContext } from "react";
import useCategories from "./useCategories";
import useSubCategories from "./useSubCategories";
import ThemeContext from "./ThemeContext";

const SearchBox = ({ places, filteredPlaces, setFilteredPlaces }) => {
  const [theme, setTheme] = useContext(ThemeContext);

  const [nameValue, setNameValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [prevCategoryValue, setPrevCategoryValue] = useState("");
  const [subCategoryValue, setSubCategoryValue] = useState("");

  // Custom hooks
  const [categories] = useCategories(places);
  const [subCategories] = useSubCategories(places, categoryValue);

  // Fetch places by search parameters
  let placesList = places;
  useEffect(() => {
    findByName();
    findByLocation();
    findByCategory();
    findBySubCategory();
    setFilteredPlaces(placesList);
  }, [nameValue, locationValue, categoryValue, subCategoryValue]);

  // Find places by name
  function findByName() {
    let placesByName = new Set();
    if (nameValue) {
      placesList.map((place) => {
        if (place.name.toLowerCase().includes(nameValue.toLowerCase())) {
          placesByName.add(place);
        }
      });
      placesList = [...placesByName];
    }
  }

  // Find places by location
  function findByLocation() {
    let placesByLocation = new Set();
    if (locationValue) {
      placesList.map((place) => {
        if (
          place.address.toLowerCase().includes(locationValue.toLowerCase()) ||
          place.city.toLowerCase().includes(locationValue.toLowerCase()) ||
          place.province.toLowerCase().includes(locationValue.toLowerCase()) ||
          place.postal.toLowerCase().includes(locationValue.toLowerCase())
        ) {
          placesByLocation.add(place);
        }
      });
      placesList = [...placesByLocation];
    }
  }

  // Find places by category
  function findByCategory() {
    let placesByCategory = new Set();
    if (!categoryValue || categoryValue !== prevCategoryValue) {
      setSubCategoryValue("");
    }
    if (categoryValue) {
      placesList.map((place) => {
        if (place.category === categoryValue) {
          placesByCategory.add(place);
        }
      });
      setPrevCategoryValue(categoryValue);
      placesList = [...placesByCategory];
    }
  }

  // Find places by sub category
  function findBySubCategory() {
    let placesBySubCategory = new Set();
    if (subCategoryValue) {
      placesList.map((place) => {
        if (place.sub_category === subCategoryValue) {
          placesBySubCategory.add(place);
        }
      });
      placesList = [...placesBySubCategory];
    }
  }

  // Reset search filters
  function resetFilters() {
    setNameValue("");
    setLocationValue("");
    setCategoryValue("");
    setSubCategoryValue("");
    setTheme("light");
  }

  return (
    <div className="search-box">
      <b>Search Filters</b>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="name">
          Name:
          <input
            id="name"
            value={nameValue}
            placeholder="Search by name..."
            onChange={(e) => setNameValue(e.target.value)}
            onBlur={(e) => setNameValue(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="location">
          Location:
          <input
            id="location"
            value={locationValue}
            placeholder="Address, City, Prov, or Postal Code"
            onChange={(e) => setLocationValue(e.target.value)}
            onBlur={(e) => setLocationValue(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="category">
          Category:
          <select
            id="category"
            value={categoryValue}
            onChange={(e) => setCategoryValue(e.target.value)}
            onBlur={(e) => setCategoryValue(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label htmlFor="sub_category">
          Sub Category:
          <select
            id="sub_category"
            value={subCategoryValue}
            onChange={(e) => setSubCategoryValue(e.target.value)}
            onBlur={(e) => setSubCategoryValue(e.target.value)}
            disabled={!subCategories.length}
          >
            <option value=""></option>
            {subCategories.map((subCategory) => (
              <option key={subCategory} value={subCategory}>
                {subCategory}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label htmlFor="theme">
          Theme:
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
            style={{ width: "initial" }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
        <button
          className="button"
          onClick={resetFilters}
          style={{
            color: theme === "dark" ? "white" : "",
            backgroundColor: theme === "dark" ? "gray" : "",
          }}
        >
          Reset Filters
        </button>
        <br />
        <h3>{filteredPlaces.length} results</h3>
      </form>
    </div>
  );
};

export default SearchBox;
