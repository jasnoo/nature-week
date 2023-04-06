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

            // has_rendered: false,

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


    // set up to handle when 
    handleClick(e) {
        console.log('this is happening')
        console.log(e)

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
                    this.setState({ location_results: [] })


                })
                .catch(e => console.log(e))
        }

        // when a natureoption button is clicked:
        if (e.target.classList.contains('natureOption')) {
            let natureOption = e.target.id
            this.setState({ nature_option: natureOption })
            if (this.state.location_id !== '') {
                fetch(`/find/${this.state.location_id}/${natureOption}`)
                    .then(response => response.json())
                    .then((data) => {
                        // console.log('data coming through everything', data)
                        this.setState({ species_list: data.results })
                        this.setState({ sinceDate: data.date })
                        this.setState({ location_results: [] })

                    })
                    .catch(e => console.log(e))

            }




            // let natureOption = document.getElementById('location').value
            // this.setState({ location_input: location })
            // getINaturalist(location)

        }
        // if a result favorite is clicked
        if (e.target.classList.contains('favoriteResult')) {
            // console.log('a fav item was clicked')
            // console.log(e.target.getAttribute('common'))

            // console.log(e.target.getAttribute('name'),
            //     e.target.getAttribute('common'),
            //     e.target.getAttribute('speciesId'),
            //     e.target.getAttribute('nature_option'),
            //     e.target.getAttribute('url'))

            let favObj = {
                _id: e.target.getAttribute('speciesId'),
                name: e.target.getAttribute('name'),
                common_name: e.target.getAttribute('common'),
                type: e.target.getAttribute('nature_option'),
                photo_url: e.target.getAttribute('url')
            }
            fetch('/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(favObj)
            })
                .then(response => response.json())
                .then((data) => {
                    console.log('what came back from db stuff')
                })



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
                <ResultsContainer nature_option={this.state.nature_option} date={this.state.sinceDate} speciesList={this.state.species_list} handleClick={this.handleClick} />
            </div>
        )
    }
}

export default FinderContainer;