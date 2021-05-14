import Place from "./Place";

const Results = ({ places }) => {
  return (
    <div className="results">
      {places.map((place) => (
        <Place
          key={place.id}
          id={place.id}
          name={place.name}
          category={place.category}
          address={place.address}
          city={place.city}
          province={place.province}
          postal={place.postal}
        />
      ))}
    </div>
  );
};

export default Results;
