import Place from "./Place";

const Results = ({ places }) => {
  return (
    <div id="results">
      {places.map((place) => (
        <div key={place.id}>
          <Place
            id={place.id}
            name={place.name}
            category={place.category}
            address={place.address}
            city={place.city}
            province={place.province}
            postal={place.postal}
          />
        </div>
      ))}
    </div>
  );
};

export default Results;
