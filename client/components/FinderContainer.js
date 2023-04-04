import React, { Component } from 'react';
import ResultsContainer from './ResultsContainer.js'
import Finder from './Finder.js'

class FinderContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location_input: '',
            location_id: '',
            results: [],
            test_text: 'PASSINGSTATE'

        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }

    handleClick(e) {
        console.log('this is happening')
        console.log(e)
        let location = document.getElementById('location').value
        this.setState({ location_input: location })
    }

    handleChange(e) {
        let location = document.getElementById('location').value

        this.setState({ location_input: location })
    }

    render() {
        return (
            <div className='finderContainer'>
                <h1>THIS IS MY FINDER CONTAINER</h1>
                <Finder location_input={this.state.location_input} handleClick={this.handleClick} handleChange={this.handleChange} />
                <ResultsContainer />
            </div>
        )
    }
}

export default FinderContainer;