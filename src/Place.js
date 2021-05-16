import { Link } from "react-router-dom";
import logos from "./logos/*.png";

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
    <Link to={`/place/${id}`} className="place-container">
      <div className="place-logo">
        <img src={`${logos[logo]}`} alt={name}></img>
      </div>
      <div className="place-info">
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
    </Link>
  );
};

export default Place;
