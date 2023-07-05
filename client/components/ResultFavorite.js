import React, { useState, useEffect } from "react";
import ResultFavorite from "./ResultFavorite";


function Result({ speciesID, handleFavorite, common, name, url, count, isFavorite }) {
  const favColor = 'red'
  const regColor = 'grey'
  const [color, setColor] = useState(favColor);

  const toggleColor = (e) => {
    setColor((prevColor) => {
      return prevColor === regColor ? favColor : regColor;
    });
  };

  return (

    <div
      className={`result ${isFavorite ? '' : 'fav-removed'}`}>
      <span onClick={e => {
        toggleColor(e);
        handleFavorite(e, isFavorite);
      }} className={`fav-heart ${isFavorite ? 'fav-active' : 'fav-inactive'}`} speciesid={speciesID}  > ♥</span>
      <div className='resultLink'> <a href={`https://www.inaturalist.org/taxa/${speciesID}`} target="_blank">
        <h2>{common}</h2>
        <h3>{name}</h3>
      </a>
      </div>
      <img src={url}></img>
    </div >


  );
}
export default Result;
