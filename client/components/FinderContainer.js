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
            species_list: [],
            sinceDate: ''

        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }

    handleClick(e) {
        console.log('this is happening')
        console.log(e)
        // if the click was from the find button
        if (e.target === document.getElementById('findButton')) {
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
                })
                .catch(error => console.error(error));
        }
        // when a list item is clicked 
        if (e.target.classList.contains('locItem')) {
            console.log(e.target.getAttribute('id'))
            let location_id = e.target.getAttribute('id')

            fetch(`/find/${location_id}`)
                .then(response => response.json())
                .then((data) => {
                    console.log('data coming through everything', data)
                    this.setState({ species_list: data.results })
                    this.setState({ sinceDate: data.date })

                })
                .catch(e => console.log(e))





        }



        // next click event behavior can go here
    }

    handleChange(e) {
        let location = document.getElementById('location').value

        this.setState({ location_input: location })
    }

    render() {
        return (
            <div className='finderContainer'>
                {/* <h1>THIS IS MY FINDER CONTAINER</h1> */}
                <Finder location_input={this.state.location_input} handleClick={this.handleClick} handleChange={this.handleChange} locationResults={this.state.location_results} />
                <ResultsContainer date={this.state.sinceDate} speciesList={this.state.species_list} />
            </div>
        )
    }
}

export default FinderContainer;