import React, { Component } from "react";
import LocationResults from "./LocationResults";


class Finder extends Component {
  render() {
    let locations = this.props.locationResults;

    let locationResultArr = locations.map((x) => {
      return <li locID={x.location_id}>{x.display_name}</li>;
    });
    return (
      <div className='finder' location_input={this.props.location_input} >
        {/* <h1>THIS IS MY FINDER</h1> */}
        <div id='locationBox'>
          {/* <label htmlFor='location'> Location:</label> */}
          {/* <input type='text' id='location' name='loc' onChange={this.props.handleChange} defaultValue=''/> */}
          <LocationResults results={this.props.locationResults} handleClick={this.props.handleClick}/>
        </div>
      </div>
    );
  }
}

export default Finder;
