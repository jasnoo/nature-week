import React, { useState, useEffect } from "react";
import ResultsContainer from "./ResultsContainer.js";
import LocationResults from "./LocationResults.js";
import ErrorMessage from "./ErrorMessage.js";
import Login from "./Login.js";
import Footer from "./Footer.js";


function App() {
    const [locationInput, setLocationInput] = useState('')
    // const [location, setLocation] = useState({})
    const [locationText, setLocationText] = useState('')
    const [locationId, setLocationId] = useState()
    const [locationList, setLocationList] = useState([])
    const [speciesList, setSpeciesList] = useState(null)
    const [natureOption, setNatureOption] = useState('all')
    const [sinceDate, setSinceDate] = useState('')
    const [showLocations, setShowLocations] = useState(true)
    const [error, setError] = useState(null)
    const [active, setActive] = useState('');
    const [user, setUser] = useState(null)
    const [name, setName] = useState(null)
    const [favorites, setFavorites] = useState([])
    const [showFavorites, setShowFavorites] = useState(false)

    // used to change what button is actively selected
    const changeStyle = (iNatVal) => setActive(iNatVal)

    // maps all options display names, button text, and iNat value
    const nature = [
        { name: "Birds", iNat: "Aves", btn: "🐦 Birds" },
        { name: "Plants", iNat: "Plantae", btn: "🌱 Plants" },
        { name: "Mushrooms", iNat: "Fungi", btn: "🍄 Mushrooms" },
        { name: "Insects", iNat: "Insecta", btn: "🐜 Insects" },
        { name: "Favorites", iNat: "Favorites", btn: "❤️ Your Favorites" }
    ];

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

        if (locationInput !== '') {
            getINaturalist(locationInput)
        }
    }, [locationInput])


    // when user has chosen a location
    useEffect(() => {
        if (natureOption && locationId && natureOption !== 'Favorites') {
            setShowFavorites(false)
            fetch(`/find/${locationId}/${natureOption}`)
                .then((response) => response.json())
                .then((data) => {
                    setSpeciesList(data.results)
                    setSinceDate(`${data.date} - today`)
                })
                .catch((e) => console.log('error', e));
        }
    }, [locationId, natureOption])

    // when user chooses favorites

    function getFavorites() {
        if (user) {
            if (favorites[0] !== undefined) {
                let favString = favorites.join("%2C")
                fetch(`https://api.inaturalist.org/v1/taxa/${favString}`)
                    .then((response) => response.json())
                    .then((data) => {
                        let favoritesInfo = data.results.map(x => {
                            return {
                                id: x.id,
                                preferred_common_name: x.preferred_common_name,
                                name: x.name,
                                medium_url: x.default_photo.medium_url,
                                nature_option: x.iconic_taxon_name,
                            }
                        })
                        setSpeciesList(favoritesInfo)
                    })
                    .catch((e) => console.log('error', e));
            }
        }
        else { setSpeciesList([]) }
    }


    //specifically whne one of the buttons are clicked
    function natureFilter(i, name, iNat) {
        const natureObj = {
            Birds: "Aves",
            Plants: "Plantae",
            Mushrooms: "Fungi",
            Insects: "Insecta",
            Favorites: "Favorites"
        };
        setNatureOption(iNat)


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

    // when a user adds/removes favorites
    function handleFavorite(e, isFavorite) {
        if (user) {
            let favObj = {
                _id: e.target.getAttribute("speciesId"),
                'user': user,
                'isFavorite': isFavorite,
            }
            const modify = (isFavorite ? "remove" : "add")
            fetch(`/favorites/${modify}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(favObj),
            })
                .then((response) => response.json())
                .then(data => {
                    setFavorites(data)
                })
        }
    }

    // creates buttons for nature filters
    const natureButtons =
        (<span className="natureOptions">
            {nature.map(({ name, iNat, btn }, i) => {
                if (iNat !== 'Favorites') {
                    return (
                        <li className={`natureOption ${active === iNat && "active"}`} key={iNat}>
                            <span
                                onClick={(e) => {
                                    setSpeciesList(null)
                                    if (showFavorites === true) setShowFavorites(false)
                                    natureFilter(i, name, iNat)
                                    changeStyle(iNat)
                                    // setShowFavorites(false)
                                }}>
                                {btn}
                            </span>
                        </li>
                    )
                }
                else {
                    if (user) {
                        return <li className={`natureOption ${active === iNat && "active"}`} key='favorite'>
                            <span
                                onClick={() => {
                                    setShowFavorites(true)
                                    setLocationText('')
                                    natureFilter(i, name, iNat)
                                    changeStyle(iNat)
                                    getFavorites()
                                }}>
                                ❤️ Your Favorites
                            </span>
                        </li>
                    }
                    return
                }
            })}
        </span>)


    return (
        <div className="container">
            <Login key={`login${!!user}`} user={user} setUser={setUser} setName={setName} name={name} setFavorites={setFavorites} />
            <div className='finderContainer'>
                <h1 className='newHeader'>
                    This Week in Nature
                </h1>

                <div className='infoText'>Find out what has been spotted near you by the <a href="https://www.inaturalist.org/">iNaturalist</a> community this week!</div>
                {/* nature buttons */}
                {natureButtons}
                <div className='finder'>
                    <div id='locationBox'>
                        {showFavorites ? null : <input type='text' id='location' name='loc' placeholder="Your Location" onChange={e => handleLocationChange(e)} value={locationInput} />}
                        <ErrorMessage error={error} />
                        {showLocations ? <LocationResults key='locRes' results={locationList} locationInput={locationInput} locationText={locationText} handleClick={handleLocationClick} /> : null}
                    </div>
                </div>
                <ResultsContainer
                    key={`results-${natureOption}`}
                    auth={!!user}
                    // natureOption={headerText}
                    sinceDate={sinceDate}
                    speciesList={speciesList}
                    favorites={favorites}
                    handleFavorite={handleFavorite}
                    showFavorites={showFavorites}
                />
            </div>
            <Footer key='footer' />


        </div>

    )

}
export default App







