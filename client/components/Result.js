import React, { Component } from 'react';

class Result extends Component {

    render() {
        return (
            <div className='result'>
                <h1>{this.props.name}</h1>
                <h2>{this.props.common}</h2>
                <img src={this.props.url}></img>
                {/* <p className='resultName'>BUFFALO</p> */}
            </div>
        )
    }
}

export default Result;