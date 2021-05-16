import { Component } from "react";
import { withRouter } from "react-router-dom";
import logos from "./logos/*.png";

const MAPS_API = process.env.REACT_APP_MAPS_API;

class PlaceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      place: [],
    };
  }

  componentDidMount() {
    const { getPlaceById } = this.props;
    const id = this.props.match.params.id;
    const place = getPlaceById(id);
    if (place) {
      document.title = `${place.name} | Food Places`;
      this.setState({
        loading: false,
        place: place,
      });
    } else {
      this.setState({
        loading: false,
        place: null,
      });
    }
  }

  render() {
    if (this.state.loading) {
      return <h3>Loading place details...</h3>;
    }
    if (!this.state.place) {
      return <h3>Place not found!</h3>;
    }

    const { place } = this.state;
    const {
      id,
      name,
      category,
      sub_category,
      address,
      city,
      province,
      postal,
      logo,
    } = place;

    return (
      <div className="place-details">
        <div className="place-details-logo">
          <img src={`${logos[logo]}`} alt={name}></img>
        </div>
        <div className="place-details-info">
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
        <div className="embed-map">
          <iframe
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?key=${MAPS_API}&q=${name}+${address}+${city}+${province}+${postal}`}
          ></iframe>
        </div>
      </div>
    );
  }
}

export default withRouter(PlaceDetails);
