const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const finderController = require("../server/controllers/finderController.js");
const favoriteController = require("../server/controllers/favoriteController.js");
const userController = require("../server/controllers/userController.js");
const cookieController = require("../server/controllers/cookieController.js");
const bodyParser = require("body-parser");
const cors = require("cors");


// const mongoURI = 'mongodb://localhost:27017/natureweek';
// const mongoURI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost/natureweek' : 'mongodb://localhost/natureweek';
try {
    mongoose.connect('mongodb://localhost:27017/natureweek')
        .then(console.log('db connection'))
}
catch { err => console.log(error) }



// const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());


app.use('/find/:location_id/:nature_option', finderController.getNatureData, (req, res) => {
    // res.status(200).json(res.locals.results);
    // console.log('res.locals.results in server.js', res.locals.results)
    res.json({ results: res.locals.results, date: res.locals.date })
    // res.status(200).send('wow this worked')
});




// app.get('/signup', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/signup.html'));
// });
// app.post('/signup', userController.createUser, (req, res) => {
//     res.status(200).send('did it')
// })

// app.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.isLoggedIn, (req, res) => {
// app.post('/login', (req, res) => {
//     // what should happen here on successful log in?
//     // res.status(200).sendFile(path.resolve(__dirname, '../client/index.js'));
//     res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
// });

app.post('/favorites', favoriteController.addFavorite, (req, res) => {
    // console.log('req:', req.body)
    // req: {
    //     _id: '54573',
    //         name: 'Schizophyllum commune',
    //             common_name: 'splitgill mushroom',
    //                 type: 'Fungi'
    // }
    // console.log('res:', res)
    res.status(200)
})


// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
// serve index.html on the route '/'
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../index.html'));
});



// if (process.env.NODE_ENV === 'production') {
//     // statically serve everything in the build folder on the route '/build'
//     app.use('/build', express.static(path.join(__dirname, '../build')));
//     // serve index.html on the route '/'
//     app.get('/', (req, res) => {
//         return res.status(200).sendFile(path.join(__dirname, 'index.html'));
//     });
// };



app.listen(3000);