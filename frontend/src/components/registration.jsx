import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import "./Registration.css";


function Registration() {
  const [wantToRegister, setWantToRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState("Register");
  const [switchText, setSwitchText] = useState("Already have an account? Login here.");
  // const [loggedIn, setLoggedIn] = useState(loggedIn);

  const handleUsername = (event) => {
    // if username is less than 3 characters, display error message


    setUsername(event.target.value);
  }

  const handleNewPassword = (event) => {
    setPassword(event.target.value);
  }

  const handleSwitch = () => {
    wantToRegister ? setWantToRegister(false) : setWantToRegister(true);

    if(wantToRegister) {
      // change button text to "Already have an account? Login here."
      setButtonText("Register");
      setSwitchText("Already have an account? Login here.");
    } else {
      // change button text to "Don't have an account? Register here."
      setButtonText("Login");
      setSwitchText("Don't have an account? Register here.");
    }
  }

  const handleRegister = (event) => {
    if (username.length < 3) {
      // use bootstrap alert
      // use react-bootstrap popover


      // console.log("Username must be at least 3 characters");
      alert("Username must be at least 3 characters");

    }
    event.preventDefault();
    console.log(username);
  }
  return (
    <div className='root'>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="Enter Username" onChange={handleUsername} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter Password" onChange={handleNewPassword} />
        </Form.Group>
        <Button className='submit' variant="primary" type="submit" onClick={handleRegister}>
          {buttonText}
        </Button>
      <Button className='submit' onClick={handleSwitch}>{switchText}</Button>

      </Form>
    </div>

  );
}




export default Registration;