import { useEffect, useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import searchContext from '../contexts/searchContext';
import Ticker from './Ticker';

function All() {
    const [tickers, setTickers] = useState([]);

    const [topNetChange, setTopNetChange] = useState([]);
    const [topPercentChange, setTopPercentChange] = useState([]);
    const [topLastSale, setTopLastSale] = useState([]);
    const [currentTicker, setCurrentTicker] = useState({});

    const [searchTicker, setSearchTicker] = useContext(searchContext);

    useEffect(() => {
        fetch('/all-tickers').then(res => res.json()).then(json => {
            setTickers(json);
        }).catch(err => console.log(err));
    }, []);

    useEffect(() => {
        setTopNetChange(tickers.sort((a,b) => (parseFloat(a.net_change) < parseFloat(b.net_change)) ? 1 : -1).slice(0,9));
        setTopPercentChange(tickers.sort((a,b) => (parseFloat(a.percent_change.substring(0,a.percent_change.length-1)) < parseFloat(b.percent_change.substring(0,b.percent_change.length-1))) ? 1 : -1).slice(0,9));
        setTopLastSale(tickers.sort((a,b) => (parseFloat(a.last_sale.substring(1,a.last_sale.length)) < parseFloat(b.last_sale.substring(1,b.last_sale.length))) ? 1 : -1).slice(0,9));
        let current = tickers.filter(ticker => ticker.symbol === searchTicker)
        current.length > 0 && setCurrentTicker(current[0])
    }, [tickers, searchTicker])

    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs={12} sm={6} md={4} xl={3} key={currentTicker.symbol}><Ticker {...currentTicker}/></Col>
                </Row>
                <Row>
                    <h1>Top 10 tickers by net change</h1>
                    {
                        topNetChange.map(ticker => <Col xs={12} sm={6} md={4} xl={3} key={ticker.symbol}><Ticker {...ticker}/></Col>)
                    }
                </Row>
                <Row>
                    <h1>Top 10 tickers by percent change</h1>
                    {
                        topPercentChange.map(ticker => <Col xs={12} sm={6} md={4} xl={3} key={ticker.symbol}><Ticker {...ticker}/></Col>)
                    }
                </Row>
                <Row>
                    <h1>Top 10 tickers by last sale</h1>
                    {
                        topLastSale.map(ticker => <Col xs={12} sm={6} md={4} xl={3} key={ticker.symbol}><Ticker {...ticker}/></Col>)
                    }
                </Row>
            </Container>
        </>
    );
}

export default All;