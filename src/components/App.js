import React, { Component } from "react";

import "./App.css";
import MapView from "./Map";
import Sidebar from "./Sidebar";

const API_KEY = `${process.env.REACT_APP_TRAILS_KEY}`;

console.log(process.env.REACT_APP_TRAILS_KEY);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 40.75,
      lng: -111.85,
      zoom: 10,
      isLoaded: false,
      trails: [],
      todos: [],
      disabled: [],
      maxDist: "",
      star: "",
      maxRes: ""
    };
    this.disableButton = this.disableButton.bind(this);
    this.mapItem = this.mapItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(
      `https://www.hikingproject.com/data/get-trails?lat=40.777&lon=-111.628&maxResults=2&key=${API_KEY}`
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            trails: result.trails
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  filterTrails() {
    fetch(
      `https://www.hikingproject.com/data/get-trails?lat=40.777&lon=-111.628&maxDistance=${
        this.state.maxDist
      }&minStars=${this.state.star}&maxResults=${
        this.state.maxRes
      }&key=${API_KEY}`
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            trails: result.trails
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }
  handleSubmit(e) {
    this.setState({ [e.target.name]: e.target.value });
    e.preventDefault();
    this.filterTrails();
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  mapItem = item => {
    this.setState({
      lat: item.latitude,
      lng: item.longitude,
      zoom: 16
    });
  };

  disableButton(item) {
    this.setState({
      todos: [...this.state.todos, { name: item.name, id: item.id }],
      disabled: [...this.state.disabled, item.id]
    });
  }

  render() {
    const { error, isLoaded } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Sidebar
            disabled={this.state.disabled}
            trails={this.state.trails}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            mapItem={this.mapItem}
            disableButton={this.disableButton}
            todos={this.todos}
          />
          <MapView
            trails={this.state.trails}
            zoom={this.state.zoom}
            lat={this.state.lat}
            lng={this.state.lng}
          />
        </div>
      );
    }
  }
}
