import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function registration() {
    return (
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="Enter Username" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="New Password" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleRegister}>
                    Register
                </Button>
            </Form>
                        
    );
}

function handleRegister() {
    console.log("Registering");
}

function handleUsername() {
    // check if username is > 4 characters
    console.log("Username");
}

function handleConfirmPassword() {
    console.log("Confirming Password");
}

function handleNewPassword() {
    console.log("New Password");
}

export default registration;