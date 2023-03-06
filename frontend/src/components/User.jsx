import { useState, useContext, useEffect } from 'react';
import React from 'react';
import Ticker from './Ticker';
import { Container, Row, Col } from 'react-bootstrap';




import LoginContext from "../contexts/loginContext";

import ReactHighcharts from 'react-highcharts';

import { createDonutChart } from '@brightlayer-ui/highcharts';

function User(props){
    const [info, setInfo] = useState({balance:0});
    const [portfolio, setPortfolio] = useState([]);
    const [tickers, setTickers] = useState([]);


    // Currently uses loggedIn as the name for user, change to use props in the future
    const [loggedIn, setLoggedIn] = useContext(LoginContext);

    const [donutInfo, setDonutInfo] = useState([]);

    const [sig, setSig] = useState(false);

    const signal = () => {
        setSig(oldSig => !oldSig);
    }

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
    }, [loggedIn, sig]);

    useEffect(() => {
        if(info.current_holdings === undefined || tickers.length === 0){
            return;
        }

        const portfolioList = [];
        const temp = [];

        

        // get values from array in info.current_holdings which is an array of objects from which we need the ticker and total_value
        if (info.current_holdings !== null)
            for( let i = 0; i < info.current_holdings.length; i++){


                // if temp already has the ticker, add the total value to the total value of the ticker in temp
                if( temp.filter(ticker => ticker[0] === info.current_holdings[i].ticker).length === 0){
                    // let tickerAlreadyThere = temp.filter(ticker => ticker[0] === info.current_holdings[i].ticker)[0];
                    // let value = Math.round((tickerAlreadyThere[1] + info.current_holdings[i].total_value) * 100) / 100;
                    temp.push([info.current_holdings[i].ticker, 0]);
                }
                



            }

            for (let i = 0; i < temp.length; i++) {
                let tickersOwned = info.current_holdings.filter(ticker => ticker.ticker === temp[i][0]);
                let totalValue = 0;
                for (let j = 0; j < tickersOwned.length; j++) {
                    totalValue += tickersOwned[j].total_value;
                }
                temp[i][1] = Math.round((totalValue/(10000-info.balance))*1000) / 10;
                let tickerToAdd = tickers.filter(ticker => ticker.symbol === temp[i][0])[0];
                tickerToAdd.total_value = Math.round(totalValue * 100) / 100;
                portfolioList.push(tickerToAdd);
            }


        setDonutInfo(temp);
        console.log(temp);
        setPortfolio(portfolioList);
    }, [info,tickers,sig]);

    

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
            {info.balance > 0 ? <h1>Balance: {info.balance}</h1> : <h1>Calculating...</h1>}
            <div style={{ height: '300px' }}>
            { info.current_holdings !== null && info.current_holdings !== undefined && <ReactHighcharts config={createDonutChart(donutConfig)} {...graphStyles} /> }

            <Row>
                { info.current_holdings !== null && info.current_holdings !== undefined && <h1>Portfolio</h1> }
                { info.current_holdings !== null && info.current_holdings !== undefined && portfolio.map(ticker => <Col xs={12} sm={6} md={4} xl={3} key={ticker.symbol}><Ticker {...ticker} signal={signal}/></Col>) }
            </Row>
            </div>
        </>
    );
}

export default User;