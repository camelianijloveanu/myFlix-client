import React from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view'
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { ProfileUpdate } from '../profile-update/profile-update';
import {NavbarView} from "../navbar-view/navbar-view";


import "./main-view.scss";

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.userObj.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.userObj.Username);
    localStorage.setItem('email', authData.userObj.Email);
    localStorage.setItem('birthday', authData.userObj.Birthday);
    localStorage.setItem('favoriteMovies', authData.userObj.FavoriteMovies)
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://cnjlv.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onLoggedOut() {
    localStorage.clear();
    this.setState({
      user: null,
    });
    console.log("logout successful");
    window.open("/", "_self");
  }

    updateUser(data) {
      this.setState({
        userInfo: data
      });
      localStorage.setItem('user', data.userObj.userName);
    }


 render() {
    const { movies, user } = this.state;


    return (
      <div>
      <Router>

        <Row className="main-view justify-content-md-center">
          
          <Route exact path='/' render={() => {
              if (!user) return <Col md={6}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

              return(
              <div>
                <NavbarView />
                <Row>
                  {movies.map(m => (
                  <Col md={4} key={m._id} style={{
                    marginTop: '70px',
                  }}>
                  <MovieCard movie={m} />
                  </Col>)
                  )}
                </Row>
              </div>)

              if (movies.length === 0) return <div className="main-view" />

              return movies.map(m => (
                <Col md={4} key={m._id} >
                  <MovieCard movie={m} />
                </Col>
              ))
            }} />

            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col md={6}>
                <RegistrationView />
              </Col>
            }} />

            <Route path="/movies/:movieId" render={({ match, history }) => {
              if (!user) return <Row> 
              <NavbarView />
              <Col md={6}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              </Row>

              if (movies.length === 0) return <div className="main-view" />

              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path="/directors/:name" render={({ match, history }) => {
              if (!user) return <Row>
                <NavbarView />
                <Col md={6}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              </Row>

              if (movies.length === 0) return <div className="main-view" />;

              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} movies={movies} onBackClick={() => history.goBack()} />
              </Col>

            }} />

            <Route path="/genres/:name" render={({ match, history }) => {
              if (!user) return <Col md={6}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

              if (movies.length === 0) return <div className="main-view" />;

              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} movies={movies} />
              </Col>
            }} />

            <Route path="/users/:userId" render={({ history }) => {
              if (!user) return <Col md={6}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

              if (movies.length === 0) return <div className="main-view" />;

              return <Col md={8}>
                <ProfileView movies={movies} onBackClick={() => history.goBack()} />
              </Col>

            }} />

            <Route path="/update/:userId" render={({ history }) => {
              if (!user) return <Col md={6}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

              if (movies.length === 0) return <div className="main-view" />;

              return <Col md={8}>
                <ProfileUpdate movies={movies} onBackClick={() => history.goBack()} /></Col>

            }} /> 
      </Row>
    </Router>
    </div>
  );
}
}