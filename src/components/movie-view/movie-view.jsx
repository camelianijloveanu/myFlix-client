import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import "./movie-view.scss";
import {NavbarView} from "../navbar-view/navbar-view";

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  addFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://cnjlv.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/movies/" +
      movie._id;

    console.log(token);

    axios
      .post(url, "", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        // window.open("/", "_self");
        window.open("/users/" + localStorage.getItem("user"), "_self");
        alert("Added to favorites!");
      });
  }


  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
          <div>
        <NavbarView />
      </div>
        <Card
          style={{
            width: '50%',
            height: '50%',
            border: 'solid 1px black',
            marginTop: '30px',
            marginBottom: '30px',
          }}
        >
          <Card.Img
            variant="top"
            src={movie.ImagePath}
          />
          <Card.Body>
            <Card.Title>
              <h1 className="label">{movie.Title} </h1>
            </Card.Title>
            <Card.Text>
              <span className="label">{movie.Description}</span>
            </Card.Text>
            <Card.Text>
              <span className="label">Genre: </span>
    
              <Link to={`/genres/${movie.Genre.Name}`}>
                <span className="value">{movie.Genre.Name}</span>
              </Link>
            </Card.Text>
            <Card.Text>
              <span className="label">Director: </span>
              <Link to={`/directors/${movie.Director.Name}`}>
                <span className="value">{movie.Director.Name}</span>
              </Link>
            </Card.Text>
            <Button
                    variant="dark"
                    style={{ marginBottom: '8px' }}
                    onClick={() => this.addFavorite(movie)}
                  >
                    Add to Favorites
                  </Button>
            <Link to={`/`}>
              <Button
                block
                variant="dark"
              >
                Back to the list
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
    }
    }
    