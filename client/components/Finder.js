import React, { Component } from 'react';
import LocationResults from './LocationResults'

class Finder extends Component {


    render() {
        let locations = this.props.locationResults
        // let locationResultArr = []

        let locationResultArr = locations.map(x => {
            return <li locID={x.location_id}>{x.display_name}</li>
        })
        // for (let i = 0; i < locations.length; i++) {
        //     locationResultArr.push(<p> {locations[i]['display_name']}</p >)
        // }


        console.log('locationResultArr', locationResultArr)



        return (
            <div className='finder' locationInput={this.props.location_input} passThisDown2={this.props.passThisDown} >
                <h1>THIS IS MY FINDER</h1>


                {/* <form action={"/find"+"value"}> */}

                <label for="location" > Location:</label>
                <input type="text" id="location" name="loc" onChange={this.props.handleChange} defaultValue='New York City' />
                <button onClick={this.props.handleClick} id='findButton'>Find</button>
                {/* <input type="submit" value="Submit" />
                </form> */}

                <div className='locationResults'>
                    <LocationResults results={this.props.locationResults} handleClick={this.props.handleClick} />
                    {/* <ul>{locationResultArr}</ul> */}
                </div>


            </div >
        )
    }
}

export default Finder;