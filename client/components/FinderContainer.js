import React, { Component } from 'react';
import ResultsContainer from './ResultsContainer.js'
import Finder from './Finder.js'

class FinderContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location_input: '',
            location_id: '',
            location_results: [],
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

        fetch('https://api.inaturalist.org/v1/places/autocomplete?' + new URLSearchParams({ q: location }))
            .then(response => response.json())
            .then((data) => {
                // console.log(data)
                let locationArr = data.results.map(x => {
                    return { display_name: x.display_name, location_id: x.id }
                })
                console.log(locationArr)
                this.setState({ location_results: locationArr })

                // res.locals.results = data
                // next();
            })
            .catch(error => console.error(error));
    }

    handleChange(e) {
        let location = document.getElementById('location').value

        this.setState({ location_input: location })
    }

    render() {
        return (
            <div className='finderContainer'>
                <h1>THIS IS MY FINDER CONTAINER</h1>
                <Finder location_input={this.state.location_input} handleClick={this.handleClick} handleChange={this.handleChange} locationResults={this.state.location_results} />
                <ResultsContainer />
            </div>
        )
    }
}

export default FinderContainer;