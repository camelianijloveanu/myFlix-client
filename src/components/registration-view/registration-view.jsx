import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [emailError, setEmailError] = useState({});


  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    const isValid = formValidation();
    if (isValid) {
      axios.post('https://cnjlv.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      }).then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
      }).catch(e => {
        console.log('Registration failed')
      });
    }
  }
  
  const formValidation = () => {
    const usernameError = {};
    const passwordError = {};
    const emailError = {};
    let isValid = true;

    if (username.trim().length < 5) {
      usernameError.usernameShort = "Minimum 5 characters";
      isValid = false;
    }

    if (password.trim().length < 1) {
      passwordError.passwordMissing = "Password is required";
      isValid = false;
    }

    if (!email.includes(".") && !email.includes("@")) {
      emailError.emailNotEmail = "Email doesn't seem valid";
      isValid = false;
    }

    setUsernameError(usernameError);
    setPasswordError(passwordError);
    setEmailError(emailError);
    return isValid;
  };

  return (
  <Form>
      <Form.Group controlId="registerUsername">
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

      <Form.Group controlId="registerPassword">
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

      <Form.Group controlId="registerEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" onChange={e => setEmail(e.target.value)} />
      </Form.Group>

      {Object.keys(emailError).map((key) => {
        return (
          <div key={key}>
            {emailError[key]}
          </div>
        );
      })}

      <Form.Group controlId="registerBirthday">
        <Form.Label>Birthdate</Form.Label>
        <Form.Control type="text" onChange={e => setBirthday(e.target.value)} />
      </Form.Group>

      <Button variant="dark" type="submit" onClick={handleRegister}>Register</Button>

      
      <Link to={`/`}>
        <Button variant="dark" style={{
                      marginLeft: '5px',
                    }}>Login</Button>
      </Link>
    </Form>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.date
  }),
  onRegister: PropTypes.func,
};