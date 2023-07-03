import React, { Component } from "react";
import Result from "./Result.js";

function ResultsContainer({ speciesList, sinceDate, natureOption, handleFavorite, speciesID, favorites }) {
  let resultArr
  // console.log('favorites in results container: ', favorites)


  if (speciesList !== null) {
    resultArr = speciesList.map((x, i) => {
      let isFavorite = favorites.includes(Number(x.id))
      console.log('isFavorite in results list', isFavorite)
      return (
        <Result
          handleFavorite={handleFavorite}
          key={`result-${x.id}`}
          count={x.count}
          name={x.name}
          url={x.medium_url}
          speciesID={x.id}
          common={x.preferred_common_name}
          nature_option={natureOption}
          // favorite={(favorites.includes(speciesID)) ? true : false}
          isFavorite={isFavorite}

        />
      );
    })
  }

  if (speciesList === null) {
    return
  } else if (speciesList.length === 0) {
    return (
      <div>
        <h1 className='seenSince'>{`No species found ${sinceDate} `}</h1>
      </div>
    )
  } else return (
    <div>
      <h1 className='seenSince'>{`Seen between`}<br />{`${sinceDate} `}</h1>
      <div className='resultsContainer'>{resultArr || ''}</div>
    </div>
  )
}

export default ResultsContainer;
