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


        // console.log('locationResultArr', locationResultArr)



        return (
            <div className='finder' location_input={this.props.location_input} >
                {/* <h1>THIS IS MY FINDER</h1> */}

                <ul className='natureOptions'>
                    <li className='natureOption' onClick={this.props.handleClick} id='Aves' >🐦 Birds</li>
                    <li className='natureOption' onClick={this.props.handleClick} id='Plantae'>🌱 Plants</li>
                    <li className='natureOption' onClick={this.props.handleClick} id='Fungi'>🍄 Mushrooms</li>
                </ul>
                <div id='locationBox'>

                    <label htmlFor="location" > Location:</label>


                    <input type="text" id="location" name="loc" onChange={this.props.handleChange} defaultValue='' />
                    {/* <button onClick={this.props.handleClick} id='findButton'>Find</button> */}
                    {/* <input type="submit" value="Submit" />
                </form> */}

                    <LocationResults results={this.props.locationResults} handleClick={this.props.handleClick} />
                    {/* <ul>{locationResultArr}</ul> */}
                </div>

            </div >
        )
    }
}

export default Finder