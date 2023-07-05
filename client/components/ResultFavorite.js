import React from "react";

function Result({ speciesID, handleFavorite, common, name, url, count, isFavorite }) {

  return (
    <div
      className={`result ${isFavorite ? '' : 'fav-removed'}`}>
      <span onClick={e => {
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
