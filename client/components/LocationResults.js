import React from 'react';


function LocationResults({results,handleClick, locationText, locationInput,handleLocationHover}){


       
        let resultArr = []
        for (let i = 0; i < results.length; i++) {
            resultArr.push(<li key={results[i]['location_id']} className='locItem' id={results[i]['location_id']} onClick={handleClick} >{results[i]['display_name']}</li>)
        }

        return locationInput  ?
        (
            <ul className='LocationResults'>
                {resultArr}
            </ul >
        )
        : <></>
        
}


export default LocationResults;