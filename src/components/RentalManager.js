import React, { Component } from "react";
import axios from "axios";
import RentalSelection from "./RentalSelection";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./RentalManager.css";

import Index from "./Index";
import Search from "./Search";
import Library from "./Library";
import Customers from "./Customers";

class RentalManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCustomerID: "",
      currentCustomerName: "",
      currentMovieTitle: "",
      message: ""
    };
  }

  addToLibrary = movie => {
    const image_url = movie.image_url.slice(31);
    movie = { ...movie, image_url: image_url };
    axios
      .post("http://localhost:3000/movies", { ...movie })
      .then(response => {
        this.changeMessage(
          `Successfully added ${movie.title} to Movie Library!`
        );
      })
      .catch(error => {
        const errorMessage = error.message;
        this.changeMessage(errorMessage);
      });
  };

  setCustomer = (customerID, customerName) => {
    this.setState({
      currentCustomerID: customerID,
      currentCustomerName: customerName
    });
  };
  setMovie = movieTitle => {
    this.setState({
      currentMovieTitle: movieTitle
    });
  };
  changeMessage = message => {
    this.setState({ message });
    setTimeout(() => this.setState({ message: "" }), 2500);
  };

  render() {
    return (
      <div className="video-store-rm">
        <header className="header">
          <RentalSelection
            currentCustomerName={this.state.currentCustomerName}
            currentCustomerID={this.state.currentCustomerID}
            currentMovieTitle={this.state.currentMovieTitle}
          />
        <h2 className="message">{this.state.message}</h2>
          <Router>
            <div className="navbar">
              <nav className="nav-bar__nav">
                <ul className="nav-bar">
                  <li className="nav-bar__nav-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="nav-bar__nav-item">
                    <Link to="/search/">Go Fetch</Link>
                  </li>
                  <li className="nav-bar__nav-item">
                    <Link to="/library/">Library</Link>
                  </li>
                  <li className="nav-bar__nav-item">
                    <Link to="/customers/">Customers</Link>
                  </li>
                </ul>
              </nav>

              <Route path="/" exact component={Index} />
              <Route
                path="/search/"
                component={() => {
                  return <Search addToLibraryCallback={this.addToLibrary} />;
                }}
              />
              <Route
                path="/library/"
                component={() => {
                  return <Library setMovieCallback={this.setMovie} />;
                }}
              />
              <Route
                path="/customers/"
                component={() => {
                  return <Customers setCustomerCallback={this.setCustomer} />;
                }}
              />
            </div>
          </Router>
        </header>
      </div>
    );
  }
}

export default RentalManager;
