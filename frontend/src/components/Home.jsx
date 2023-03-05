import All from './All'
import Graph from './Graph';
import Donut from './donut';
import Autosuggest from './Autosuggest';

function Home() {
    return (
        <>
            <h1>Paper Trade Home Page</h1>
            <Graph name='AAPL'/>
            {/* <   Donut /> */}
            <Autosuggest/>
            <All />
        </>
    );
}

export default Home;