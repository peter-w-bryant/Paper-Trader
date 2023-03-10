import { useState, useContext } from 'react';
import { Button, Container, Card, Row, Form, Col } from 'react-bootstrap';

import LoginContext from "../contexts/loginContext";

import './Ticker.css';

function Ticker(props) {
    const [amount, setAmount] = useState(0);

    const [loggedIn, setLoggedIn] = useContext(LoginContext);

    const handleAmount = (event) => {
        setAmount(parseFloat(event.target.value));
    }

    const buy = () => {
        fetch('/execute-order', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                order_type: 'buy',
                ticker: props.symbol,
                value: amount
            }),
            credentials: 'include'
        }).then(res => {
            if (res.status === 200) {
                handleSignal();
                alert('successfully purchased')
            } else if (res.status === 400) {
                alert("insufficient funds");
            } else {
                throw new Error();
            }
        }).catch(err => console.log('register:' + err));
    }

    const sell = () => {
        fetch('/execute-order', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                order_type: 'sell',
                ticker: props.symbol,
                value: amount
            }),
            credentials: 'include'
        }).then(res => {
            if (res.status === 200) {
                handleSignal();
                alert('successfully sold')
            } else if (res.status === 400) {
                alert("insufficient shares");
            } else {
                throw new Error();
            }
        }).catch(err => console.log('register:' + err));
    }

    const handleSignal = () => {
        props !== undefined && Object.keys(props).includes('signal') && props.signal();
    }

    return (
        <>
            <Container>
                <Row>
                    <Card>
                        <Card.Body>
                            <Card.Title>{props.name}</Card.Title>

                            <ul className="custom-unordered-list">
                                {props.country !== '' && <li><Card.Text>Country: {props.country}</Card.Text></li>}
                                {props.volume !== '' && <li><Card.Text>Volume: {props.volume}</Card.Text></li>}
                                {props.net_change !== '' && <li><Card.Text>Net change: {props.net_change}</Card.Text></li>}
                                {props.percent_change !== '' && <li><Card.Text>Percent change: {props.percent_change}</Card.Text></li>}
                                {props.last_sale !== '' && <li><Card.Text>Last sale: {props.last_sale}</Card.Text></li>}
                                {props.total_value !== undefined && <li><Card.Text>Value Owned: ${props.total_value}</Card.Text></li>}
                            </ul>

                            { loggedIn !== '' && (
                                <Card.Footer>
                                                <Row>
                                                    <Col xs={12} md={5}>
                                                        <Form>
                                                            <Form.Group className='form-group-custom'>
                                                                <Form.Label>Amount</Form.Label>
                                                                <Form.Control placeholder="$" onChange={handleAmount} />
                                                            </Form.Group>
                                                        </Form>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={12} md={7} className='d-flex align-items-center justify-content-between'>
                                                        <Button onClick={buy}>Buy</Button>&nbsp;&nbsp;
                                                        <Button variant='secondary' onClick={sell}>Sell</Button>
                                                    </Col>
                                                </Row>
                                </Card.Footer>
                            )}
                        
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </>
    );
}

export default Ticker;