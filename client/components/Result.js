import React, { Component } from 'react';

class Result extends Component {

    render() {
        return (
            <div className='result'>
                <h2>{this.props.common}</h2>

                <h3>{this.props.name}</h3>
                <img src={this.props.url}></img>
                <h4>Seen {this.props.count} this week </h4>


                <div url={this.props.url}
                    nature_option={this.props.nature_option}
                    speciesID={this.props.speciesID}

                    name={this.props.name}
                    common={this.props.common} className='favoriteResult' onClick={this.props.handleClick} >Favorite <span>⭐</span></div>

            </div>
        )
    }
}


export default Result;