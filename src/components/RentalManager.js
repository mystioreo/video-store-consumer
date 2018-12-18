import React, { Component } from "react";
import AppRouter from "./Router";
import axios from "axios";
import RentalSelection from "./RentalSelection";

class RentalManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCustomerID: "",
      currentCustomerName: "",
      currentMovieTitle: ""
    };
  }

  addToLibrary = movie => {
    const image_url = movie.image_url.slice(31);
    movie = {...movie, image_url: image_url};
    axios
      .post("http://localhost:3000/movies", movie)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        const errorMessage = error.message;
        this.setState({ errorMessage });
      });
  };

  setCustomer = (customerID, customerName) => {
    // console.log(customerID, customerName);
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

  checkOut = () => {
    if (this.state.currentCustomerID && this.state.MovieTitle) {
      const date = new Date(Date.now());
      date.setDate(date.getDate() + 7);

      const url = `http://localhost:3000/rentals/${this.state.currentMovieTitle}/check-out?customer_id=${this.state.currentCustomerID}&due_date=${date}` ;

      axios
        .post(url)
        .then(response => {
          // success message to status bar
          console.log(response);
        })

        .catch(error => {
          const errorMessage = error.message;
          this.setState({ errorMessage });
          console.log(errorMessage);
        });
     } else {
       // error message to status bar
       console.log("need a customer and a movie to check out");
     }
  };

  render() {
    return (
      <div>
        <h2> {this.state.currentCustomerName}</h2>
        <h2> {this.state.currentMovieTitle}</h2>
        <RentalSelection checkOutCallback={this.checkOut} />
        <AppRouter
          setCustomerCallback={this.setCustomer}
          setMovieCallback={this.setMovie}
          addToLibraryCallback={this.addToLibrary}
        />
      </div>
    );
  }
}

RentalManager.propTypes = {};

export default RentalManager;
