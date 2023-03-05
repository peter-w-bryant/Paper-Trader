import { useState, useContext, useEffect } from 'react';

import LoginContext from "../contexts/loginContext";

function User(){
    const [info, setInfo] = useState({});

    const [loggedIn, setLoggedIn] = useContext(LoginContext);

    useEffect(() => {
        fetch('/user-info/'+{loggedIn}).then(res => res.json()).then(json => {
            setInfo(json);
        }).catch(err => console.log(err));
    }, []);

    return (
        <>  
            {console.log(loggedIn)}
        </>
    );
}

export default User;