import React, { Component } from 'react';
import Result from './Result.js'

class ResultsContainer extends Component {

    render() {
        console.log(this.props.speciesList)


        let resultArr = this.props.speciesList.map((x, i) => {
            return <Result key={`result-${i}`} count={x.count} name={x.name} url={x.medium_url} common={x.preferred_common_name} />


        })


        return (
            <div>
                <h1>From {this.props.date}</h1>

                <div className='resultsContainer' >
                    {resultArr}
                </div>
            </div>
        )
    }
}

export default ResultsContainer;