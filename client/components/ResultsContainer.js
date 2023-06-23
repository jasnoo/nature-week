import React, { Component } from "react";
import Result from "./Result.js";

function ResultsContainer({ speciesList, sinceDate, natureOption, handleClick }) {
  let resultArr
  if (speciesList !== null) {
    resultArr = speciesList.map(x => {
      return (
        <Result
          handleClick={handleClick}
          key={`result-${x.id}`}
          count={x.count}
          name={x.name}
          url={x.medium_url}
          speciesID={x.id}
          common={x.preferred_common_name}
          nature_option={natureOption}
        // handleClick={this.props.handleClick}
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
      <h1 className='seenSince'>{`Seen ${sinceDate} `}</h1>
      <div className='resultsContainer'>{resultArr || ''}</div>
    </div>
  )
}

// class ResultsContainer extends Component {
//   render() {
//     let resultArr = this.props.speciesList.map((x, i) => {
//       return (
//         <Result
//           handleClick={this.props.handleClick}
//           key={`result-${i}`}
//           count={x.count}
//           name={x.name}
//           url={x.medium_url}
//           speciesID={x.id}
//           common={x.preferred_common_name}
//           nature_option={this.props.nature_option}
//           handleClick={this.props.handleClick}
//         />
//       );
//     }


//     );

//     return (
//       <div>
//         <h1 className='seenSince'>{`${this.props.headerLocation}  ${this.props.date}`}</h1>

//         <div className='resultsContainer'>{resultArr}</div>
//       </div>
//     );
//   }
// }

export default ResultsContainer;
