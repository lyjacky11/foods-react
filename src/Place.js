import logos from "./logos/*.png";
const MAPS_API = process.env.REACT_APP_MAPS_API;

const Place = ({
  id,
  name,
  category,
  sub_category,
  address,
  city,
  province,
  postal,
  logo,
}) => {
  return (
    <div className="place-container">
      <div className="place-logo">
        <img src={`${logos[logo]}`} alt={name}></img>
      </div>
      <div className="place-details">
        <h2>{name}</h2>
        <h3>
          {sub_category != "null" ? `${sub_category} ` : ""}
          {category}
        </h3>
        <h4>{address}</h4>
        <h4>
          {city}, {province} {postal}
        </h4>
      </div>
      {/* <div className="embed-map">
        <iframe
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/place?key=${MAPS_API}&q=${name}+${address}+${city}+${province}+${postal}`}
        ></iframe>
      </div> */}
    </div>
  );
};

export default Place;
