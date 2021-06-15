import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { Link } from 'react-router-dom';

import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
     if (isValid) {
    axios.post('https://cnjlv.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      console.log('data', data);
      props.onLoggedIn(data);
      window.open("/");
    })
    .catch(e => {
      console.log('error',e)
    });
    }
  };

  const formValidation = () => {
    const usernameError = {};
    const passwordError = {};
    let isValid = true;

    if (username.trim().length < 1) {
      usernameError.usernameShort = "Username is required";
      isValid = false;
    }

    if (password.trim().length < 1) {
      passwordError.passwordMissing = "Password is required";
      isValid = false;
    }

    setUsernameError(usernameError);
    setPasswordError(passwordError);
    return isValid;
  };

  return (
    <Container>
      <h1
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          letterSpacing: '10px',
          paddingTop: '50px',
        }}
      >
        Marilyn's top 10
      </h1>
      <Form style={{
        justifyContent: 'center',
        paddingTop: '8%'
      }}>
          <Form.Group controlId="formUsername" >
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
          </Form.Group>

        {Object.keys(usernameError).map((key) => {
              return (
                <div key={key}>
                  {usernameError[key]}
                </div>
              );
            })}

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>

          {Object.keys(passwordError).map((key) => {
          return (
            <div key={key}>
              {usernameError[key]}
            </div>
          );
        })}

          <Button variant="dark" type="submit" onClick={handleSubmit}>Login</Button>

          <Link to={`/register`}>
            <Button variant="dark" style={{
                      marginLeft: '5px',
                    }}>New here? Register</Button>
          </Link>
        </Form>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func
};