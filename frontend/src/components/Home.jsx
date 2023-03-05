import All from './All'
import Graph from './Graph';
import Donut from './donut';
import Autosuggest from './Autosuggest';
import searchContext from '../contexts/searchContext';
import { useContext } from 'react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScroll } from '@fortawesome/free-solid-svg-icons'



function Home() {

    const [searchTicker, setSearchTicker] = useContext(searchContext);
    const handleSearchResult = (result) => {
        console.log(result);
        setSearchTicker(result);
    }

    return (
        <>
            <div style= {{ textAlign: 'center', marginTop: '50px' }}>
                <h1>Paper Trader <FontAwesomeIcon icon={faScroll} /></h1>
                <h4><i>Test Before You Invest!</i></h4>
            </div>
            <Autosuggest parentCallback={handleSearchResult} />
            <Graph name={searchTicker} />
        </>
    );
}

export default Home;