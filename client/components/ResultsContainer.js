import React, { Component } from 'react';
import Result from './Result.js'

class ResultsContainer extends Component {

    render() {
        // console.log(this.props.speciesList)


        let resultArr = this.props.speciesList.map((x, i) => {
            return <Result handleClick={this.props.handleClick} key={`result-${i}`} count={x.count} name={x.name} url={x.medium_url} speciesID={x.id} common={x.preferred_common_name} nature_option={this.props.nature_option} handleClick={this.props.handleClick} />


        })


        return (
            <div>
                <h1 className='seenSince'>{`${this.props.headerLocation}  ${this.props.date}`}</h1>

                <div className='resultsContainer' >
                    {resultArr}
                </div>
            </div>
        )
    }
}

export default ResultsContainer;