import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Movie.css";
import "./Item.css";

class Movie extends Component {
  render() {
    return (
      <div className="movie-container-box">
        <div className="movie ">
          <img src={this.props.movie.image_url} alt="movie poster" />
          <div className="item__details">
            <h2 className="titlefont">{this.props.movie.title}</h2>
            <p>{this.props.movie.release_date}</p>
          </div>
          <button
            onClick={() => {
              this.props.setMovieCallback(this.props.movie.title);
            }}
            className="item__button"
          >
            Select for Rental
          </button>
        </div>
      </div>
    );
  }
}

Movie.propTypes = {
  movie: PropTypes.object
};

export default Movie;
