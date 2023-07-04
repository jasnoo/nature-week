import React, { Component } from "react";
import Result from "./Result.js";
import ResultFavorite from "./ResultFavorite.js";

function ResultsContainer({ speciesList, sinceDate, natureOption, handleFavorite, speciesID, favorites, showFavorites, auth }) {

  if (showFavorites) {

    let resultArr
    if (speciesList !== null) {

      resultArr = speciesList.map((x, i) => {

        let isFavorite = favorites.includes(Number(x.id))
        return (
          <ResultFavorite
            handleFavorite={handleFavorite}
            key={`favresult-${x.id}-${i}`}
            name={x.name}
            url={x.medium_url}
            speciesID={x.id}
            common={x.preferred_common_name}
            nature_option={natureOption}
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
          <h1 className='seenSince'>{`No favorites saved yet!`}</h1>
        </div>
      )
    } else return (
      <div>
        <h1 className='seenSince'>Your Favorite Species:</h1>
        <div className='resultsContainer'>{resultArr || ''}</div>
      </div>
    )
  }

  else {

    let resultArr
    if (speciesList !== null) {
      resultArr = speciesList.map((x, i) => {
        console.log('favorites:', favorites, ' Number(x.id)): ', Number(x.id))

        let isFavorite = favorites.includes(Number(x.id))
        console.log('isFavorite in results list', isFavorite)
        return (
          <Result auth={auth}
            handleFavorite={handleFavorite}
            key={`result-${x.id}-${i}`}
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

}

export default ResultsContainer;
