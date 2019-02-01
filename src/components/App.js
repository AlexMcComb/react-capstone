import React, { Component } from "react";
import { Map, TileLayer, GeoJSON, Marker } from "react-leaflet";
import L from "leaflet";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 40.75,
      lng: -112.4,
      zoom: 10,
      trails: ""
    };
  }

  componentDidMount() {
    fetch(
      "https://www.hikingproject.com/data/get-trails?lat=40.71&lon=-111.76&maxDistance=10&key=200414472-cec778ee06c27612a21b53d6a62c4e6f"
    )
      .then(response => response.json())

      .then(data => console.log(data));
    // this.setState({ trails: data }));
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    const { trails } = this.state.trails;
    console.log(this.state);

    return (
      <div>
        {/* <ul>
          {trails.map(trail => (
            <li key={trail.ID}>
              <a href={trail.url}>{trail.name}</a>
            </li>
          ))}
        </ul> */}
        <Map className="map" center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png"
          />

          <GeoJSON key={`geojson-01`} data={trails} />
        </Map>
      </div>
    );
  }
}
