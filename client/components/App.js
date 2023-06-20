import React from 'react';
import { Routes, Route } from "react-router-dom";
import FinderContainer from './FinderContainer.js'
import Home from './Home.js';
import ResultsContainer2 from './ResultsContainer2.js';

function App() {
    return (
        
        <>
            <FinderContainer />
            <Routes>
                <Route path="/results/:location/:species" element={<ResultsContainer2 />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </>
            
    )
}

export default App;


