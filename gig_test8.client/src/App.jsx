import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Frontpage from './Frontpage.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import Card from './Card.jsx';


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/frontpage" replace />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/frontpage" element={<Frontpage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/card" element={<Card />} />
               
            </Routes>
        </>
    );
}

export default App;