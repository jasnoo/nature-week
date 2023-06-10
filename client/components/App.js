import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FinderContainer from './FinderContainer.js'
import LocationResults from './LocationResults.js';


function App() {
    return (
        <BrowserRouter>
            <FinderContainer />
            <Routes>
                <Route path="/" element = {LocationResults}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;


