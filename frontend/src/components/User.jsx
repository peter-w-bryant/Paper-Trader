import { useState, useContext, useEffect } from 'react';
import React from 'react';


import LoginContext from "../contexts/loginContext";

import ReactHighcharts from 'react-highcharts';

import { createDonutChart } from '@brightlayer-ui/highcharts';

function User(props){
    const [info, setInfo] = useState({});

    // Currently uses loggedIn as the name for user, change to use props in the future
    const [loggedIn, setLoggedIn] = useContext(LoginContext);

    const [donutInfo, setDonutInfo] = useState([]);

    useEffect(() => {
         fetch(`/user-info/${loggedIn}`).then(res => res.json()).then(json => {
            setInfo(json);
            console.log(json);

        }).catch(err => console.log(err))     
    }, [loggedIn]);

    useEffect(() => {
        if(info.current_holdings === undefined){
            return;
        }
        const temp = [];

        

        // get values from array in info.current_holdings which is an array of objects from which we need the ticker and total_value
        for( let i = 0; i < info.current_holdings.length; i++){
            let x = (info.current_holdings[i].total_value/(10000-info.balance))*100;
            x=Math.round(x * 10) / 10

            temp.push([info.current_holdings[i].ticker, x]); 
        }
        setDonutInfo(temp);
        console.log(temp);
    }, [info]);

    

    const donutConfig = {

        series: [{
            name: 'Browsers',
            data:donutInfo,
        }],
};

const graphStyles = {
    domProps: {
        style: {
            height: '100%',
        },
    },
};


    return (
        <>  
            <h1>Balance: {info.balance}</h1>
            <div style={{ height: '300px' }}>
            <ReactHighcharts config={createDonutChart(donutConfig)} {...graphStyles} />
        </div>
        </>
    );
}

export default User;