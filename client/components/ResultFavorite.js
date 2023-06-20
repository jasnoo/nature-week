import React, { Component } from "react";

function ResultFavorite(props) {

  let text = "";
  let fav = "";
  if (props.isFavorite) {
    fav = "regStar";
    text = `★ In Your Favorites `;
  } else {
    fav = "favStar";

    text = `Add To Favorites`;
  }
  
  return (
    <div
      // className='resultFavText'
      url={props.url}
      isFavorite={props.isFavorite}
      nature_option={props.nature_option}
      name={props.name}
      common={props.common}
      key={`fav-${props.speciesID}`}
      speciesID={props.speciesID}
      id={`fav-${props.speciesID}`}
      className={`resultFavorite`}
    >
      {/* <span className={fav}>☆★</span> */}

      {text}
    </div>
  )
}
export default ResultFavorite;
