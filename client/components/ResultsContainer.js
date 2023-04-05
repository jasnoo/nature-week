import React, { Component } from 'react';
import Result from './Result.js'

class ResultsContainer extends Component {

    render() {
        console.log(this.props.speciesList)


        let resultArr = this.props.speciesList.map((x, i) => {
            return <Result key={`result-${i}`} name={x['name']} url={x['medium_url']} />


        })


        return (
            <div className='resultsContainer' >
                <h1>THIS IS MY RESULTS CONTAINER</h1>
                {resultArr}
                {/* <Result />
                <Result /><Result /><Result /><Result />
                <Result /> */}
                <p></p>
            </div>
        )
    }
}

export default ResultsContainer;