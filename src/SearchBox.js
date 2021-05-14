import { useState, useEffect } from "react";

const SearchBox = ({ places }) => {
  const [nameValue, setNameValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategoryValue, setSubCategoryValue] = useState("");
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    var data = [];
    places.map((place) => {
      var found = data.find((x) => x === place.category);
      if (!found) {
        data.push(place.category);
      }
    });
    data.sort();
    setCategories(data);
  }, [places]);

  useEffect(() => {
    var data = [];
    places.map((place) => {
      var found = data.find((x) => x === place.sub_category);
      if (!found && place.category === categoryValue) {
        data.push(place.sub_category);
      }
    });
    data.sort();
    setSubCategories(data);
  }, [categoryValue]);

  return (
    <div className="search-box">
      <b>Search for a place:</b>
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
            <option>None</option>
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
            {subCategories.map((subCategory) => (
              <option key={subCategory} value={subCategory}>
                {subCategory}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button>Reset</button>
      </form>
    </div>
  );
};

export default SearchBox;
