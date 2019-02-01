import React, { Component } from "react";
import { Map, TileLayer, GeoJSON, Marker } from "react-leaflet";
import L from "leaflet";
import "./App.css";

const myIcon = L.icon({
  iconUrl: "http://leafletjs.com/examples/custom-icons/leaf-green.png",
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76]
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 40.75,
      lng: -112.4,
      lat2: 40.6,
      lng2: -112.46,
      zoom: 10,
      isLoaded: false,
      trails: []
    };
  }

  componentDidMount() {
    fetch(
      "https://www.hikingproject.com/data/get-trails?lat=40.71&lon=-111.76&maxDistance=10&key=200414472-cec778ee06c27612a21b53d6a62c4e6f"
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            trails: result.trails
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    const { error, isLoaded, trails } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <ul>
            {trails.map(item => (
              <li key={item.id}>
                {item.name} {item.url}
              </li>
            ))}
          </ul>
          <Map className="map" center={position} zoom={this.state.zoom}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png"
            />
            <GeoJSON key={`geojson-01`} data={trails} />
            <Marker position={position} icon={myIcon} />
          </Map>
        </div>
      );
    }
  }
}
