const finderController = {}

finderController.getNatureData = (req, res, next) => {


    fetch('https://api.inaturalist.org/v1/observations/species_counts?verifiable=true&spam=false&d1=2023-04-02&place_id=48&quality_grade=research&iconic_taxa%5B%5D=Fungi&locale=en-US&per_page=50')
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            res.locals.results = data
            next();
        })
        .catch(error => console.error(error));



}

module.exports = finderController