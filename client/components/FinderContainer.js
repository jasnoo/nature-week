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
            sinceDate: '',
            nature_option: '',
            has_rendered: false,

        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }

    getINaturalist(id) {
        fetch('https://api.inaturalist.org/v1/places/autocomplete?' + new URLSearchParams({ q: id }))
            .then(response => response.json())
            .then((data) => {
                // console.log(data)
                let locationArr = data.results.map(x => {
                    return { display_name: x.display_name, location_id: x.id }
                })
                // console.log(locationArr)
                this.setState({ location_results: locationArr })
            })
            .catch(error => console.error(error));
    }


    /// THIS IS A TEST TO SEE IF THIS EXISTS IN MAIN


    // set up to handle when 
    handleClick(e) {
        console.log('this is happening')
        console.log(e)
        // if the click was from the find button

        // if (e.target === document.getElementById('findButton')) {
        //     let location = document.getElementById('location').value
        //     this.setState({ location_input: location })
        //     getINaturalist(location)
        // }

        // when a location list item is clicked 
        if (e.target.classList.contains('locItem')) {
            // console.log(e.target.getAttribute('id'))
            let location_id = e.target.getAttribute('id')
            this.setState({ location_id: location_id })

            fetch(`/find/${location_id}/${this.state.nature_option}`)
                .then(response => response.json())
                .then((data) => {

                    // console.log('data coming through everything', data)
                    this.setState({ species_list: data.results })
                    this.setState({ sinceDate: data.date })
                    this.setState({ has_rendered: true })

                })
                .catch(e => console.log(e))
        }

        // when a natureoption button is clicked:
        if (e.target.classList.contains('natureOption')) {
            let natureOption = e.target.id
            this.setState({ nature_option: natureOption })
            if (this.state.has_rendered === true) {
                fetch(`/find/${this.state.location_id}/${natureOption}`)
                    .then(response => response.json())
                    .then((data) => {
                        // console.log('data coming through everything', data)
                        this.setState({ species_list: data.results })
                        this.setState({ sinceDate: data.date })

                    })
                    .catch(e => console.log(e))

            }





            // let natureOption = document.getElementById('location').value
            // this.setState({ location_input: location })
            // getINaturalist(location)

        }



        // next click event behavior can go here
    }

    handleChange(e) {
        let location = document.getElementById('location').value
        this.setState({ location_input: location })
        this.getINaturalist(location)
    }

    render() {
        return (
            <div className='finderContainer'>
                {/* <h1>THIS IS MY FINDER CONTAINER</h1> */}
                <Finder nature_option={this.state.nature_option} location_input={this.state.location_input} handleClick={this.handleClick} handleChange={this.handleChange} locationResults={this.state.location_results} />
                <ResultsContainer nature_type={this.state.nature_option} date={this.state.sinceDate} speciesList={this.state.species_list} />
            </div>
        )
    }
}

export default FinderContainer;