import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Registration from './components/registration';

import './App.css';

function App() {
    return (
        <>
            <h1>Paper Trader</h1>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path='*' element={<NotFound />} />
                        <Route path='registration' element={<Registration />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;