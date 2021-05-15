import Place from "./Place";

const Results = ({ filteredPlaces }) => {
  return (
    <div className="results">
      {!filteredPlaces.length ? (
        <h3>No results matching the search filters found.</h3>
      ) : (
        filteredPlaces.map((place) => (
          <Place
            key={place.id}
            id={place.id}
            name={place.name}
            category={place.category}
            sub_category={place.sub_category}
            address={place.address}
            city={place.city}
            province={place.province}
            postal={place.postal}
            logo={place.logo}
          />
        ))
      )}
    </div>
  );
};

export default Results;
