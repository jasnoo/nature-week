import React, { Component } from "react";
import ResultFavorite from "./ResultFavorite";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false,
    };

  }

  getUpdatedFavorite() {
    fetch(`/favorites/${this.props.speciesID}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ isFavorite: data });
      })
      .catch((e) => console.log(e));
  }

  componentDidMount() {
    this.getUpdatedFavorite();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.getUpdatedFavorite();
    }
  }

  render() {
    return (
      <div
        className='result'
        onClick={this.props.handleClick}
        isFavorite={this.state.isFavorite}
      >
        <h2>{this.props.common}</h2>

        <h3>{this.props.name}</h3>
        <img src={this.props.url}></img>
        <h4>Seen {this.props.count} this week </h4>

        {/* <div url={this.props.url}
                    nature_option={this.props.nature_option}
                    speciesID={this.props.speciesID}

                    name={this.props.name}
                    common={this.props.common} className='favoriteResult' onClick={this.props.handleClick} >Favorite <span>⭐</span>
                </div> */}

        <ResultFavorite
          url={this.props.url}
          nature_option={this.props.nature_option}
          speciesID={this.props.speciesID}
          name={this.props.name}
          common={this.props.common}
          isFavorite={this.state.isFavorite}
          className='favoriteResult'
          onClick={this.props.handleClick}
        >
          Favorite <span>⭐</span>
        </ResultFavorite>
      </div>
    );
  }
}

export default Result;
