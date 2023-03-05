import All from './All'
import Graph from './Graph';
import Donut from './donut';
import Autosuggest from './Autosuggest';
import searchContext from '../contexts/searchContext';
import { useContext } from 'react';
import React from 'react';



function Home() {

    const [searchTicker, setSearchTicker] = useContext(searchContext);
    const handleSearchResult = (result) => {
        setSearchTicker(result);
    }

    return (
        <>
            <h1>Paper Trade Home Page</h1>
            <Autosuggest parentCallback = {handleSearchResult}/>
            <Graph name = {searchTicker}/>
            {/* <All /> */}
            {/* <   Donut /> */}
            <All />
        </>
    );
}

export default Home;