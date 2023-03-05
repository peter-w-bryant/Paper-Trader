import { useState } from 'react';
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from 'react-router-dom';

import LoginContext from "../contexts/loginContext";

function Layout() {
    const [loggedIn, setLoggedIn] = useState('');

    const handleLogout = () => {
        setLoggedIn('');
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
                        { loggedIn !== '' && <Nav><Nav.Link as={Link} to='profile'>Profile</Nav.Link></Nav> }
                        <Nav className='ms-auto'>
                            { loggedIn === '' && <Nav.Link as={Link} to="registration">Login / Register</Nav.Link> }
                            { loggedIn !== '' && <Nav.Link onClick={handleLogout}>Logout</Nav.Link> }
                        </Nav>
                    </Container>
                </Navbar> 
                <Outlet />
            </LoginContext.Provider>
        </>
    );
}

export default Layout;