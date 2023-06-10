import React, { Component, useState, useEffect } from "react";
import ResultsContainer from "./ResultsContainer.js";
import Finder from "./Finder.js";
import {BrowserRouter, Routes,Route} from 'react-router-dom'

function FinderContainer(){
  const [locationInput, setLocationInput] = useState('')
  const [location, setLocation] = useState({})
  const [locationList, setLocationList] = useState([])
  const [species_list, setSpecies_list] = useState([])
  const [headerText, setHeaderText] = useState("Nature")
  const [natureOption, setNatureOption] = useState('')


useEffect(()=>{

  function getINaturalist(id) {
    fetch(
      "https://api.inaturalist.org/v1/places/autocomplete?" +
        new URLSearchParams({ q: id })

    )
      .then((response) => response.json())
      .then((data) => {
        let locationArr = data.results.map((x) => {
          return { display_name: x.display_name, location_id: x.id };
        });
        setLocationList(locationArr)
      })
      .catch((error) => console.error(error));
  }

  getINaturalist(locationInput)
},[locationInput])

  //specifically whne one of the 3 buttons are clicked
  function natureFilter(e) {
    const natureObj = {
      Birds: "Aves",
      Plants: "Plantae",
      Mushrooms: "Fungi"
    };
    setNatureOption(natureObj[e.target.id])
    setHeaderText(e.target.id)
  }

  function handleLocationChange(e) {
    setLocationInput(e.target.value)
  }

return (
  <div className='finderContainer'>
        <h1 className='newHeader'>
          One Week Of{" "}
          <span className='titleOption'>{headerText}</span>
        </h1>

        <ul className='natureOptions'>
          <li className='natureOption' onClick={(e) => natureFilter(e)} id='Birds'>🐦 Birds</li>
          <li className='natureOption' onClick={(e) => natureFilter(e)} id='Plants'>🌱 Plants</li>
          <li className='natureOption' onClick={(e) => natureFilter(e)} id='Mushrooms'> 🍄 Mushrooms </li>
        </ul>

        <div className='finder'>
          <div id='locationBox'>
            <label htmlFor='location'> Location:</label>
            <input type='text' id='location' name='loc' onChange={e=>handleLocationChange(e)} value={locationInput}/>
            
            {/* <Finder
              nature_option={this.state.nature_option}
              location_input={this.state.location_input}
              handleClick={this.handleClick}
              handleChange={this.handleChange}
              locationResults={this.state.location_results}
            /> */}
          </div>
        </div>

        {/* <ResultsContainer
          headerLocation={this.state.headerLocation}
          nature_option={this.state.nature_option}
          date={this.state.sinceDate}
          speciesList={this.state.species_list}
          handleClick={this.handleClick}
        /> */}
      </div>
)

} 
export default FinderContainer
















// class FinderContainer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       location_input: "",
//       location_id: "",
//       location_results: [],
//       species_list: [],
//       sinceDate: "",
//       nature_option: "",
//       headerText: "Nature",
//       headerLocation: "",

//       // has_rendered: false,
//     };
//     this.handleClick = this.handleClick.bind(this);
//     this.handleClick2 = this.handleClick2.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }


//   // getINaturalist(id) {
//   //   fetch(
//   //     "https://api.inaturalist.org/v1/places/autocomplete?" +
//   //       new URLSearchParams({ q: id })
//   //   )
//   //     .then((response) => response.json())
//   //     .then((data) => {
//   //       let locationArr = data.results.map((x) => {
//   //         return { display_name: x.display_name, location_id: x.id };
//   //       });
//   //       this.setState({ location_results: locationArr });
//   //     })
//   //     .catch((error) => console.error(error));
//   // }
  
//   //specifically whne one of the 3 buttons are clicked
//   handleClick2(e) {
//     const natureObj = {
//       Birds: "Aves",
//       Plants: "Plantae",
//       Mushrooms: "Fungi"
//     };
//     this.setState({ nature_option: natureObj[e.target.id] });
//     this.setState({ headerText: e.target.id });
//   }


//   handleClick(e) {
//     console.log(e.target);

//     // when a location list item is clicked
//     if (e.target.classList.contains("locItem")) {
//       let location_id = e.target.getAttribute("id");
//       console.log("e.target.innerText", e.target.innerText);
//       this.setState({ location_id: location_id });
//       this.setState({ location_input: e.target.innerText });

//       document.getElementById("location").value = e.target.innerText; //this.setState.location_input

//       fetch(`/find/${location_id}/${this.state.nature_option}`)
//         .then((response) => response.json())
//         .then((data) => {
//           this.setState({ species_list: data.results });
//           this.setState({ sinceDate: ` between ${data.date} - today` });
//           this.setState({ location_results: [] });
//           this.setState({ headerLocation: `Seen in ${e.target.innerText}` });
//         })
//         .catch((e) => console.log(e));
//     };

//     // when a natureoption button is clicked:
//     if (e.target.classList.contains("natureOption")) {
//       let natureOption = e.target.id;
//       this.setState({ nature_option: natureOption });
//       if (natureOption === "Plantae") {
//         this.setState({ headerText: "Plants" });
//       } else if (natureOption === "Fungi") {
//         this.setState({ headerText: "Mushrooms" });
//       } else if (natureOption === "Aves") {
//         this.setState({ headerText: "Birds" });
//       }

//       if (this.state.location_id !== "") {
//         fetch(`/find/${this.state.location_id}/${natureOption}`)
//           .then((response) => response.json())
//           .then((data) => {
//             this.setState({ species_list: data.results });

//             this.setState({ sinceDate: `Seen between ${data.date} - today` });
//             this.setState({ location_results: [] });
//             this.setState({
//               headerLocation: `in ${this.state.location_input}`,
//             });
//           })
//           .catch((e) => console.log(e));
//       }
//     }

//     if (e.target.classList.contains("resultFavorite")) {
//       let favObj = {
//         _id: e.target.getAttribute("speciesId"),
//         name: e.target.getAttribute("name"),
//         common_name: e.target.getAttribute("common"),
//         type: e.target.getAttribute("nature_option"),
//         photo_url: e.target.getAttribute("url"),
//       };
//       console.log(favObj);
//       fetch("/favorites", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(favObj),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log("over here 2");

//           console.log("this db check", data);
//         });
//     }

//     // next click event behavior can go here
//   }

//   handleChange(e) {
//     let location = document.getElementById("location").value;
//     this.setState({ location_input: location });

//     this.getINaturalist(location);
//   }

//   render() {
//     return (
//       <div className='finderContainer'>
//         <h1 className='newHeader'>
//           One Week Of{" "}
//           <span className='titleOption'>{this.state.headerText}</span>
//         </h1>

//         <ul className='natureOptions'>
//           <li className='natureOption' onClick={(e) => this.handleClick2(e)} id='Birds'>🐦 Birds</li>
//           <li className='natureOption' onClick={(e) => this.handleClick2(e)} id='Plants'>🌱 Plants</li>
//           <li className='natureOption' onClick={(e) => this.handleClick2(e)} id='Mushrooms'> 🍄 Mushrooms </li>
//         </ul>

//         {/* <h2 className='newHeader2'>{this.state.headerLocation}</h2> */}

//         <div
//           className='finder'
//           location_input={this.props.location_input}
//         >
//           {/* <h1>THIS IS MY FINDER</h1> */}
//           <div id='locationBox'>
//             <label htmlFor='location'> Location:</label>
//             <input
//               type='text'
//               id='location'
//               name='loc'
//               onChange={this.handleChange}
//               defaultValue=''
//             />
//             <Finder
//               nature_option={this.state.nature_option}
//               location_input={this.state.location_input}
//               handleClick={this.handleClick}
//               handleChange={this.handleChange}
//               locationResults={this.state.location_results}
//             />
//           </div>
//         </div>

//         <ResultsContainer
//           headerLocation={this.state.headerLocation}
//           nature_option={this.state.nature_option}
//           date={this.state.sinceDate}
//           speciesList={this.state.species_list}
//           handleClick={this.handleClick}
//         />
//       </div>
//     );
//   }



// }


// class FinderContainer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       location_input: "",
//       location_id: "",
//       location_results: [],
//       species_list: [],
//       sinceDate: "",
//       nature_option: "",
//       headerText: "Nature",
//       headerLocation: "",

//       // has_rendered: false,
//     };
//     this.handleClick = this.handleClick.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   getINaturalist(id) {
//     fetch(
//       "https://api.inaturalist.org/v1/places/autocomplete?" +
//         new URLSearchParams({ q: id })
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         let locationArr = data.results.map((x) => {
//           return { display_name: x.display_name, location_id: x.id };
//         });
//         this.setState({ location_results: locationArr });
//       })
//       .catch((error) => console.error(error));
//   }

//   handleClick(e) {
//     console.log(e.target);

//     // when a location list item is clicked
//     if (e.target.classList.contains("locItem")) {
//       let location_id = e.target.getAttribute("id");
//       console.log("e.target.innerText", e.target.innerText);
//       this.setState({ location_id: location_id });
//       this.setState({ location_input: e.target.innerText });

//       document.getElementById("location").value = e.target.innerText; //this.setState.location_input

//       fetch(`/find/${location_id}/${this.state.nature_option}`)
//         .then((response) => response.json())
//         .then((data) => {
//           this.setState({ species_list: data.results });
//           this.setState({ sinceDate: ` between ${data.date} - today` });
//           this.setState({ location_results: [] });
//           this.setState({ headerLocation: `Seen in ${e.target.innerText}` });
//         })
//         .catch((e) => console.log(e));
//     }

//     // when a natureoption button is clicked:
//     if (e.target.classList.contains("natureOption")) {
//       let natureOption = e.target.id;
//       this.setState({ nature_option: natureOption });
//       if (natureOption === "Plantae") {
//         this.setState({ headerText: "Plants" });
//       } else if (natureOption === "Fungi") {
//         this.setState({ headerText: "Mushrooms" });
//       } else if (natureOption === "Aves") {
//         this.setState({ headerText: "Birds" });
//       }

//       if (this.state.location_id !== "") {
//         fetch(`/find/${this.state.location_id}/${natureOption}`)
//           .then((response) => response.json())
//           .then((data) => {
//             this.setState({ species_list: data.results });

//             this.setState({ sinceDate: `Seen between ${data.date} - today` });
//             this.setState({ location_results: [] });
//             this.setState({
//               headerLocation: `in ${this.state.location_input}`,
//             });
//           })
//           .catch((e) => console.log(e));
//       }
//     }

//     if (e.target.classList.contains("resultFavorite")) {
//       let favObj = {
//         _id: e.target.getAttribute("speciesId"),
//         name: e.target.getAttribute("name"),
//         common_name: e.target.getAttribute("common"),
//         type: e.target.getAttribute("nature_option"),
//         photo_url: e.target.getAttribute("url"),
//       };
//       console.log(favObj);
//       fetch("/favorites", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(favObj),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log("over here 2");

//           console.log("this db check", data);
//         });
//     }

//     // next click event behavior can go here
//   }

//   handleChange(e) {
//     let location = document.getElementById("location").value;
//     this.setState({ location_input: location });

//     this.getINaturalist(location);
//   }

//   render() {
//     return (
//       <div className='finderContainer'>
//         <h1 className='newHeader'>
//           One Week Of{" "}
//           <span className='titleOption'>{this.state.headerText}</span>
//         </h1>
//         {/* <h2 className='newHeader2'>{this.state.headerLocation}</h2> */}
//         <Finder
//           nature_option={this.state.nature_option}
//           location_input={this.state.location_input}
//           handleClick={this.handleClick}
//           handleChange={this.handleChange}
//           locationResults={this.state.location_results}
//         />
//         <ResultsContainer
//           headerLocation={this.state.headerLocation}
//           nature_option={this.state.nature_option}
//           date={this.state.sinceDate}
//           speciesList={this.state.species_list}
//           handleClick={this.handleClick}
//         />
//       </div>
//     );
//   }
// }

// export default FinderContainer
