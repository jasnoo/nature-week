import React from "react";
import Result from "./Result.js";
import ResultFavorite from "./ResultFavorite.js";

// todo: refactor
function ResultsContainer({ speciesList, sinceDate, natureOption, handleFavorite, speciesID, favorites, showFavorites, auth }) {

  if (showFavorites) {
    if (speciesList !== null && speciesList.length > 0) {
      let resultArr
      resultArr = speciesList.map((x, i) => {

        let isFavorite = favorites.includes(Number(x.id))
        return (
          <ResultFavorite
            handleFavorite={handleFavorite}
            key={`favresult-${x.id}`}
            name={x.name}
            url={x.medium_url}
            speciesID={x.id}
            common={x.preferred_common_name}
            nature_option={natureOption}
            isFavorite={isFavorite}
          />
        );
      })
      return (
        <div>
          <h1 className='seenSince'>Your Favorite Species:</h1>
          <div className='resultsContainer'>{resultArr || ''}</div>
        </div>
      )
    }
    else {
      return (
        <div>
          <h1 className='seenSince'>{`No favorites saved yet!`}</h1>
        </div>
      )
    }
  }

  else {
    let resultArr
    if (speciesList !== null) {
      resultArr = speciesList.map((x, i) => {
        let isFavorite = favorites.includes(Number(x.id))
        return (
          <Result auth={auth}
            handleFavorite={handleFavorite}
            key={`result-${x.id}`}
            count={x.count}
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
