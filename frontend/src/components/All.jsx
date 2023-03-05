import { useEffect, useState } from 'react';

import Ticker from './Ticker';

function All() {
    const [tickers, setTickers] = useState([]);

    useEffect(() => {
        fetch('/all-tickers').then(res => res.json()).then(json => {
            setTickers(json);
        }).catch(err => console.log(err));
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