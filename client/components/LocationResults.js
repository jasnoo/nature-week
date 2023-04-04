import React, { Component } from 'react';


class LocationResults extends Component {


    render() {

        let locations = this.props.results
        let resultArr = []
        for (let i = 0; i < locations.length; i++) {
            resultArr.push(<li locID={locations[i]['location_id']}>{locations[i]['display_name']}</li>)
        }

        return (
            <ul className='LocationResults'>
                {resultArr}
            </ul >
        )
    }
}

export default LocationResults;