import { useState, useContext, useEffect } from 'react';

import LoginContext from "../contexts/loginContext";

function User(props){
    const [info, setInfo] = useState({});

    // Currently uses loggedIn as the name for user, change to use props in the future
    const [loggedIn, setLoggedIn] = useContext(LoginContext);

    useEffect(() => {
        fetch(`/user-info/${loggedIn}`).then(res => res.json()).then(json => {
            setInfo(json);
        }).catch(err => console.log(err));
    }, [loggedIn]);

    return (
        <>  
            <h1>Balance: {info.balance}</h1>
        </>
    );
}

export default User;