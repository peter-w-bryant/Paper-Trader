import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import LoginContext from "../contexts/loginContext";

import "./Registration.css";

function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');

  const [wantToRegister, setWantToRegister] = useState(false);
  const [buttonText, setButtonText] = useState("Register");
  const [switchText, setSwitchText] = useState("Already have an account? Login here.");

  const [loggedIn, setLoggedIn] = useContext(LoginContext);

  const navigate = useNavigate();

  const handleUsername = (event) => {
    setUsername(event.target.value);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleEmail = (event) => {
    setEmail(event.target.value);
  }

  const handleSwitch = () => {
    wantToRegister ? setWantToRegister(false) : setWantToRegister(true);
    if(wantToRegister){
      setButtonText("Register");
      setSwitchText("Already have an account? Login here.");
    } else {
      setButtonText("Login");
      setSwitchText("Don't have an account? Register here.")
    }
  }

  const submit = () => {
    !wantToRegister ? handleRegister() : handleLogin();
  }

  const handleRegister = () => {
    fetch('/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email
      }),
      credentials: 'include'
    }).then(res => {
      
    })

    navigate('/')
  }

  const handleLogin = () => {
    
  }

  return (
      <Form>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="Enter Username" onChange={handleUsername} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control placeholder="Enter Password" onChange={handlePassword} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control placeholder="Enter Email" onChange={handleEmail} />
        </Form.Group>
        <Button className='submit' variant="primary" type="submit" onClick={submit}>
          {buttonText}
        </Button>
      <Button className='submit' onClick={handleSwitch}>{switchText}</Button>
      </Form>
  );
}

export default Registration;
