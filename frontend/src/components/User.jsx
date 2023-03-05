import { useState, useContext, useEffect } from 'react';
import React from 'react';
import Ticker from './Ticker';
import { Container, Row, Col } from 'react-bootstrap';




import LoginContext from "../contexts/loginContext";

import ReactHighcharts from 'react-highcharts';

import { createDonutChart } from '@brightlayer-ui/highcharts';

function User(props){
    const [info, setInfo] = useState({});
    const [portfolio, setPortfolio] = useState([]);
    const [tickers, setTickers] = useState([]);


    // Currently uses loggedIn as the name for user, change to use props in the future
    const [loggedIn, setLoggedIn] = useContext(LoginContext);

    const [donutInfo, setDonutInfo] = useState([]);

    useEffect(() => {
        fetch('/all-tickers').then(res => res.json()).then(json => {
            setTickers(json);
        }).catch(err => console.log(err));
    }, []);

    useEffect(() => {
         fetch(`/user-info/${loggedIn}`).then(res => res.json()).then(json => {
            setInfo(json);
            console.log(json);

        }).catch(err => console.log(err))     
    }, [loggedIn]);

    useEffect(() => {
        if(info.current_holdings === undefined || tickers.length === 0){
            return;
        }

        const portfolioList = [];
        const temp = [];

        

        // get values from array in info.current_holdings which is an array of objects from which we need the ticker and total_value
        if (info.current_holdings !== null)
            for( let i = 0; i < info.current_holdings.length; i++){
                let x = (info.current_holdings[i].total_value/(10000-info.balance))*100;
                x=Math.round(x * 10) / 10

                temp.push([info.current_holdings[i].ticker, x]); 
                let tickerI = tickers.filter(ticker => ticker.symbol === info.current_holdings[i].ticker)[0];
                tickerI.total_value = info.current_holdings[i].total_value;
                portfolioList.push(tickers.filter(ticker => ticker.symbol === info.current_holdings[i].ticker)[0]);
            }
        setDonutInfo(temp);
        console.log(temp);
        setPortfolio(portfolioList);
    }, [info,tickers]);

    

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

            <Row>
                { info.current_holdings !== null && <h1>Portfolio</h1> }
                { info.current_holdings !== null && portfolio.map(ticker => <Col xs={12} sm={6} md={4} xl={3} key={ticker.symbol}><Ticker {...ticker}/></Col>) }
            </Row>
            </div>
        </>
    );
}

export default User;