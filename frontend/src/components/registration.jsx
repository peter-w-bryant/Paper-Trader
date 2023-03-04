import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import "./Registration.css";
import LoginContext from "../contexts/loginContext";


function Registration() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [loggedIn, setLoggedIn] = useState(loggedIn);

    const handleUsername = (event) => {
        // if username is less than 3 characters, display error message
        

        setUsername(event.target.value);
    }

    const handleNewPassword = (event) => {
        setPassword(event.target.value);
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
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="New Password" onChange={handleNewPassword}/>
                </Form.Group>
                <Button className='submit' variant="primary" type="submit" onClick={handleRegister}>
                    Register
                </Button>
            </Form>
        </div>
                        
    );
}




export default Registration;