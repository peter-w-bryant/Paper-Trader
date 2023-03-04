import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

function Registration() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsername = (event) => {
        // if username is less than 3 characters, display error message
        if (event.target.value.length < 3) {
            // use bootstrap alert
            // use react-bootstrap popover

    
            console.log("Username must be at least 3 characters");

        }

        setUsername(event.target.value);
    }

    const handleNewPassword = (event) => {
        setPassword(event.target.value);
    }

    const handleRegister = (event) => {
        event.preventDefault();
        console.log(username);
    }
    return (
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="Enter Username" onChange={handleUsername} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="New Password" onChange={handleNewPassword}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleRegister}>
                    Register
                </Button>
            </Form>
                        
    );
}

function UsernamePopover() {
    const [placement, setPlacement] = useState('right');
    return (
      <>
         
          <OverlayTrigger
           
            
            overlay={
              <Popover id={`popover-positioned-${placement}`}>
                <Popover.Header as="h3">{`Popover ${placement}`}</Popover.Header>
                <Popover.Body>
                  <strong>Invalid Username!</strong> It needs to be at least 3 characters.
                </Popover.Body>
              </Popover>
            }
          >
            <Button variant="secondary">Popover on {placement}</Button>
          </OverlayTrigger>
        
      </>
    );
  }


export default Registration;