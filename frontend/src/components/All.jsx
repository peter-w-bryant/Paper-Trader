import { useEffect, useState } from 'react';

import Ticker from './Ticker';

function All() {
    const [tickers, setTickers] = useState([]);

    useEffect(() => {
        fetch('/all-tickers').then(res => res.json()).then(json => {
            setTickers(json);
        }).catch(err => console.log(err));

        const data = [
            {
            "country": "United States",
            "industry": "Electrical Products",
            "ipo_year": "1999",
            "last_sale": "$143.93",
            "market_cap": "42583140595.00",
            "name": "Agilent Technologies Inc. Common Stock",
            "net_change": "2.26",
            "percent_change": "1.595%",
            "sector": "Industrials",
            "symbol": "A",
            "volume": "1147777"
            },
            {
            "country": "",
            "industry": "Metal Fabrications",
            "ipo_year": "2016",
            "last_sale": "$55.52",
            "market_cap": "9825323932.00",
            "name": "Alcoa Corporation Common Stock ",
            "net_change": "1.83",
            "percent_change": "3.408%",
            "sector": "Industrials",
            "symbol": "AA",
            "volume": "6158788"
            },
            {
            "country": "",
            "industry": "Blank Checks",
            "ipo_year": "2021",
            "last_sale": "$10.25",
            "market_cap": "1281250000.00",
            "name": "Ares Acquisition Corporation Class A Ordinary Shares",
            "net_change": "0.01",
            "percent_change": "0.098%",
            "sector": "Finance",
            "symbol": "AAC",
            "volume": "960713"
            }
        ];
        setTickers(data);
    }, []);

    return (
        <>
            {
                tickers.map(ticker => <Ticker key={ticker.symbol} {...ticker}/>)
            }
        </>
    );
}

export default All;