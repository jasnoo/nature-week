import React, { Component } from 'react';
import Result from './Result.js'

class ResultsContainer extends Component {

    render() {
        return (
            <div className='resultsContainer'>
                <h1>THIS IS MY RESULTS CONTAINER</h1>
                <Result />
                <Result /><Result /><Result /><Result />
                <Result />
                <p></p>
            </div>
        )
    }
}

export default ResultsContainer;