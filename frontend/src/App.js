import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Registration from './components/Registration';
import User from './components/User';

import './App.css';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path='registration' element={<Registration />} />
                        <Route path='profile' element={<User />} />
                        <Route path='*' element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;