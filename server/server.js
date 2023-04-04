const express = require('express');
const app = express();

const path = require('path'); // NEW

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