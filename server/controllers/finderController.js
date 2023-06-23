import fetch from "node-fetch";
const finderController = {}

finderController.getNatureData = (req, res, next) => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 604800)
    const weekAgoStr = `${weekAgo.getFullYear()}-${weekAgo.getMonth()}-${weekAgo.getDate()}`
    const displayDate = `${weekAgo.toLocaleString('default', { month: 'short' })} ${weekAgo.getDate()}, ${weekAgo.getFullYear()}`
    let option;
    req.params.nature_option === "all" ? option = `iconic_taxa%5B%5D=Fungi&iconic_taxa%5B%5D=Plantae&iconic_taxa%5B%5D=Aves` : option = `iconic_taxa%5B%5D=${req.params.nature_option}`


    fetch(`https://api.inaturalist.org/v1/observations/species_counts?verifiable=true&spam=false&quality_grade=research&d1=${weekAgoStr}&locale=en-US&per_page=25&place_id=${req.params.location_id}&${option}`)
        // fetch('https://api.inaturalist.org/v1/observations/species_counts?verifiable=true&spam=false&quality_grade=research&d1=2023-04-04&iconic_taxa%5B%5D=Fungi&locale=en-US&per_page=5' + new URLSearchParams({ place_id: req.params.id }))
        .then(response => response.json())
        .then((data) => {
            let speciesArr = []
            data.results.forEach(x => {
                speciesArr.push({ count: x.count, name: x.taxon.name, id: x.taxon.id, medium_url: x.taxon.default_photo.medium_url, preferred_common_name: x.taxon.preferred_common_name })
            })
            res.locals.date = displayDate
            res.locals.results = speciesArr
            next();
        })
        .catch(error => console.error(error));



}

module.exports = finderController