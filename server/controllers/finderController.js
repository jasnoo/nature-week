const finderController = {}

finderController.getNatureData = (req, res, next) => {
    console.log('got to finderController')

    fetch(`https://api.inaturalist.org/v1/observations/species_counts?verifiable=true&spam=false&quality_grade=research&d1=2023-04-04&iconic_taxa%5B%5D=Fungi&locale=en-US&per_page=50&place_id=${req.params.id}`)
        // fetch('https://api.inaturalist.org/v1/observations/species_counts?verifiable=true&spam=false&quality_grade=research&d1=2023-04-04&iconic_taxa%5B%5D=Fungi&locale=en-US&per_page=50' + new URLSearchParams({ place_id: req.params.id }))
        // fetch('https://api.inaturalist.org/v1/observations/species_counts?verifiable=true&spam=false&d1=2023-04-02&quality_grade=research&iconic_taxa%5B%5D=Fungi&locale=en-US&per_page=50')
        .then(response => response.json())
        .then((data) => {
            let speciesArr = []

            // console.log('data.results:', data.results)
            data.results.forEach(x => {
                speciesArr.push({ count: x.count, name: x.taxon.name, medium_url: x.taxon.medium_url, preferred_common_name: x.taxon.preferred_common_name })
            })
            console.log('speciesArr', speciesArr)
            res.locals.results = data
            next();
        })
        .catch(error => console.error(error));



}

module.exports = finderController