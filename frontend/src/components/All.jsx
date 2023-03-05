import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

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
            <Container fluid>
                <Row>
                    {
                        tickers.map(ticker => <Col xs={12} sm={6} md={4} xl={3} key={ticker.symbol}><Ticker {...ticker}/></Col>)
                    }
                </Row>
            </Container>
        </>
    );
}

export default All;