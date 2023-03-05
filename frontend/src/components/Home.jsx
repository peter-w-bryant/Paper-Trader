import All from './All'
import Graph from './Graph';
import Donut from './donut';
import Autosuggest from './Autosuggest';
import searchContext from '../contexts/searchContext';
import { useContext, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScroll } from '@fortawesome/free-solid-svg-icons'



function Home() {

    const [searchTicker, setSearchTicker] = useContext(searchContext);
    const handleSearchResult = (result) => {
        console.log(result);
        setSearchTicker(result);
    }

    const [showMore, setShowMore] = useState(false);

    const submit = () => {
        setShowMore(!showMore);
    }

    return (
        <>


            <div style= {{ textAlign: 'center', marginTop: '50px' }}>
                <h1>Paper Trader <FontAwesomeIcon icon={faScroll} /></h1>
                <h4><i>Test Before You Invest!</i></h4>
            </div>
            <Autosuggest parentCallback={handleSearchResult} />
            <Graph name={searchTicker} />
            { !showMore && <Button style = {{marginLeft: '1%'}} onClick={submit}>show more</Button> }
            { showMore && <Button style = {{marginLeft: '1%'}} onClick={submit}>show less</Button>}
            { showMore && <All />}
        </>
    );
}

export default Home;