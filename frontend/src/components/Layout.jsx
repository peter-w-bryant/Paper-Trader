import { useState } from 'react';
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from 'react-router-dom';

import LoginContext from "../contexts/loginContext";

function Layout() {
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        loggedIn ? setLoggedIn(false) : setLoggedIn(true);
        !loggedIn && (logout());
    }

    const logout = () => {
        fetch('/logout', {
            method: 'POST',
            credentials: 'include'
        }).catch(err => console.log('logout: ' + err));
    }
    
    return (
        <>
            <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
                <Navbar bg='dark' variant='dark'>
                    <Container>
                        <Navbar.Brand as={Link} to='/'>Home</Navbar.Brand>
                        <Nav className='ms-auto'>
                            { loggedIn === false && <Nav.Link as={Link} to="registration">Login / Register</Nav.Link> }
                            { loggedIn === true && <Nav.Link onClick={handleLogin}>Logout</Nav.Link> }
                        </Nav>
                    </Container>
                </Navbar> 
                <Outlet />
            </LoginContext.Provider>
        </>
    );
}

export default Layout;