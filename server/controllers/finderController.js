const finderController = {}

finderController.getNatureData = (req, res, next) => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const weekAgoStr = `${weekAgo.getFullYear()}-${weekAgo.getMonth()}-${weekAgo.getDate()}`

    console.log('finderController.getNatureData')
    // console.log(req.params)
    fetch(`https://api.inaturalist.org/v1/observations/species_counts?verifiable=true&spam=false&quality_grade=research&d1=${weekAgoStr}&locale=en-US&per_page=50&place_id=${req.params.location_id}&iconic_taxa%5B%5D=${req.params.nature_option}`)
        // fetch('https://api.inaturalist.org/v1/observations/species_counts?verifiable=true&spam=false&quality_grade=research&d1=2023-04-04&iconic_taxa%5B%5D=Fungi&locale=en-US&per_page=50' + new URLSearchParams({ place_id: req.params.id }))
        // fetch('https://api.inaturalist.org/v1/observations/species_counts?verifiable=true&spam=false&d1=2023-04-02&quality_grade=research&iconic_taxa%5B%5D=Fungi&locale=en-US&per_page=50')
        .then(response => response.json())
        .then((data) => {
            let speciesArr = []

            // console.log('data:', data)
            data.results.forEach(x => {

                speciesArr.push({ count: x.count, name: x.taxon.name, id: x.taxon.id, medium_url: x.taxon.default_photo.medium_url, preferred_common_name: x.taxon.preferred_common_name })
            })
            // console.log('speciesArr', speciesArr)
            res.locals.date = weekAgoStr
            res.locals.results = speciesArr
            next();
        })
        .catch(error => console.error(error));



}

module.exports = finderController