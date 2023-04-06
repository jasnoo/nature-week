import React, { Component } from 'react';

class ResultFavorite extends Component {



    render() {

        let text = ''
        let fav = ''
        if (this.props.isFavorite) {
            fav = 'regStar'
            text = `★ In Your Favorites `
        } else {
            fav = 'favStar'

            text = `Add To Favorites`
        }


        return (



            // <div key={`fav-${this.props.speciesID}`} className='resultFavorite ' >Favorite <span>⭐</span></div >
            <div className='resultFavText' url={this.props.url}
                isFavorite={this.props.isFavorite}

                nature_option={this.props.nature_option}

                name={this.props.name}
                common={this.props.common}

                key={`fav-${this.props.speciesID}`} speciesID={this.props.speciesID} id={`fav-${this.props.speciesID}`} className={`resultFavorite`
                } >
                {/* <span className={fav}>☆★</span> */}

                {text}
            </div >


            // <div isFavorite={this.props.isFavorite} onClick={this.props.handleClick} key={`fav-${this.props.speciesID}`} className={`resultFavorite`} >
            //     <span className={fav}>☆★</span>
            //     {text}</div >
        )
    }
}


export default ResultFavorite;