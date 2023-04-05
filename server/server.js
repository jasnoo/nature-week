const express = require('express');
const app = express();

const path = require('path'); // NEW
const finderController = require("../server/controllers/finderController.js");


// const port = process.env.PORT || 3000;


const mockResponse = {
    foo: 'bar',
    bar: 'foo'
};
app.get('/api', (req, res) => {
    res.send(mockResponse);
});
// app.get('/', (req, res) => {
//     res.status(200).send('Hello World!');
// });

// app.use('/find', (req, res) => {
app.use('/find/:id', finderController.getNatureData, (req, res) => {
    // res.status(200).json(res.locals.results);
    // console.log('res.locals.results in server.js', res.locals.results)
    res.json({ results: res.locals.results, date: res.locals.date })
    // res.status(200).send('wow this worked')
});


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