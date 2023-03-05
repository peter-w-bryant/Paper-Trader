import { Card } from 'react-bootstrap';

function Ticker(props) {
    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    { props.industry !== '' && <Card.Text>Industry: {props.industry}</Card.Text> }
                    { props.country !== '' && <Card.Text>Country: {props.country}</Card.Text> }
                    { props.net_change !== '' && <Card.Text>Net change: {props.net_change}</Card.Text> }
                    { props.percent_change !== '' && <Card.Text>Percent change: {props.percent_change}</Card.Text> }
                    { props.volume !== '' && <Card.Text>Volume: {props.volume}</Card.Text> }
                    <Card.Footer>
                        Last sale: {props.last_sale}
                    </Card.Footer>
                </Card.Body>
            </Card>
        </>
    );
}

export default Ticker;