import React, { Component } from 'react';


class Finder extends Component {


    render() {
        return (
            <div className='finder' locationInput={this.props.location_input} passThisDown2={this.props.passThisDown}>
                <h1>THIS IS MY FINDER</h1>

                {/* <form action={"/find"+"value"}>
                     */}
                <label for="location">Location:</label>
                <input type="text" id="location" name="loc" onChange={this.props.handleChange} defaultValue='Loc' />
                <button onClick={this.props.handleClick} id='findButton'>Find</button>
                {/* <input type="submit" value="Submit" />
                </form> */}

                <div className='locationResults'>
                    {this.props.location_input}
                </div>


            </div>
        )
    }
}

export default Finder;