import { useState, useEffect } from "react";

const localCache = {};

export default function useCategories(places) {
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!places) {
      setCategories([]);
    } else if (localCache[places]) {
      setCategories(localCache[places]);
    } else {
      getCategories();
    }

    // Get unique categories from JSON
    function getCategories() {
      setCategories([]);
      setStatus("loading");
      var data = [];
      places.map((place) => {
        var found = data.find((x) => x === place.category);
        if (!found) {
          data.push(place.category);
        }
      });
      data.sort();
      localCache[places] = data;
      setCategories(localCache[places]);
      setStatus("loaded");
    }
  }, [places]);
  return [categories, status];
}
