import React, { useState, useEffect } from "react";
import ResultsContainer from "./ResultsContainer.js";
import LocationResults from "./LocationResults.js";
import ErrorMessage from "./ErrorMessage.js";
import Footer from "./Footer.js";



function App() {
    const [locationInput, setLocationInput] = useState('')
    const [location, setLocation] = useState({})
    const [locationText, setLocationText] = useState('')
    const [locationId, setLocationId] = useState()
    const [locationList, setLocationList] = useState([])
    const [speciesList, setSpeciesList] = useState(null)
    const [headerText, setHeaderText] = useState("Nature")
    const [natureOption, setNatureOption] = useState('all')
    const [sinceDate, setSinceDate] = useState('')
    const [showLocations, setShowLocations] = useState(true)
    const [showResults, setShowResults] = useState(false)
    const [error, setError] = useState(null)

    // when user types location
    useEffect(() => {
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

    }, [locationInput])


    // when user has chosen a location
    useEffect(() => {

        if (natureOption && locationId) {
            setShowResults(true)
            fetch(`/find/${locationId}/${natureOption}`)
                .then((response) => response.json())
                .then((data) => {
                    setSpeciesList(data.results)
                    setSinceDate(` between ${data.date} - today`)
                })
                .catch((e) => console.log('error', e));
        }

    }, [locationId, natureOption])


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

    // when user changes locations
    function handleLocationChange(e) {
        setShowLocations(true)
        setLocationInput(e.target.value)
    }

    // when user clicks on a location
    function handleLocationClick(e) {
        setLocationInput(e.target.innerText)
        setLocationText(e.target.innerText)
        setLocationId(e.target.id)
        setShowLocations(false)

    }


    // temporarily removing favorite functionality 

    // function handleFavoriteClick(e) {
    //   let favObj = {
    //     _id: e.target.getAttribute("speciesId"),
    //     name: e.target.getAttribute("name"),
    //     common_name: e.target.getAttribute("common"),
    //     type: e.target.getAttribute("nature_option"),
    //     photo_url: e.target.getAttribute("url"),
    //   };
    //   fetch("/favorites", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(favObj),
    //   })
    //     .then((response) => response.json())
    //     // .then((data) => {
    //     // })

    //     ;
    // }

    return (
        <div className="container">
            <div className='finderContainer'>
                <h1 className='newHeader'>
                    This Week In{" "}
                    <span className='titleOption'>{headerText}</span>
                </h1>

                <ul className='natureOptions'>
                    <li className='natureOption' onClick={(e) => natureFilter(e)} id='Birds'>🐦 Birds </li>
                    <li className='natureOption' onClick={(e) => natureFilter(e)} id='Plants' >🌱 Plants</li>
                    <li className='natureOption' onClick={(e) => natureFilter(e)} id='Mushrooms' > 🍄 Mushrooms </li>
                </ul>
                <div className='finder'>
                    <div id='locationBox'>
                        <label htmlFor='location'> Location:</label>
                        <input type='text' id='location' name='loc' onChange={e => handleLocationChange(e)} value={locationInput} />
                        <ErrorMessage error={error} />

                        {showLocations ? <LocationResults results={locationList} locationInput={locationInput} locationText={locationText} handleClick={handleLocationClick} /> : null}
                        {showResults ? null : (
                            <div className='infoText'>Find out what plants, mushrooms, or birds have been spotted near you by the <a href="https://www.inaturalist.org/">iNaturalist</a> community this week by inputting your location and optionally choosing a nature option.</div>
                        )
                        }
                    </div>

                </div>
                <ResultsContainer
                    natureOption={headerText}
                    sinceDate={sinceDate}
                    speciesList={speciesList}
                // temporarily removing favorite functionality 
                // handleClick={handleFavoriteClick}
                />

            </div>
            <Footer />
        </div>

    )

}
export default App







