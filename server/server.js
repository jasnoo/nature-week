const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const finderController = require("../server/controllers/finderController.js");
const favoriteController = require("../server/controllers/favoriteController.js");
const userController = require("../server/controllers/userController.js");
const cookieController = require("../server/controllers/cookieController.js");
const authController = require("../server/controllers/authController.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require('axios');
require('dotenv').config();
// const session = require('express-session');
// const redis = require('redis');
// const connectRedis = require('connect-redis');
const RedisStore = require("connect-redis").default
const session = require('express-session');
const redis = require('redis');


const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))




// Initialize Redis client.
let redisClient = redis.createClient()
redisClient.connect().catch(console.error)

// Initialize redis store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "session:",
})
app.use(
  session({
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: process.env.SESS_SECRET,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie 
      maxAge: 1000 * 60 * 2 // session max age in miliseconds
    }
  })
)


// mongo
const mongoURI = process.env.NODE_ENV === 'development' ? process.env.MONGO_LOCAL : process.env.MONGO_URI;
console.log(mongoURI)
try {
  mongoose
    .connect('mongodb://localhost/natureweek', {
      // .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(console.log("Connected to MongoDB"));
} catch {
  (err) => console.log(error);
}



app.get("/", (req, res) => {
  const sess = req.session;
  if (sess.user) {
    console.log(sess.user)
    res.status(200).send(sess.user)

    // res.end('<a href=' + '/logout' + '>Click here to log out</a >')
  } else {
    console.log('no username')
    res.status(200).send('no username')

    // res.end('<a href=' + '/logout' + '>Click here to log in</a >')

  }
});

app.use("/login",
  authController.verifyCredentials,
  userController.createUser,
  (req, res) => {

    console.log('req.body here: ', req.body)

    const sess = req.session;
    const user = res.locals.credentials.email
    sess.user = user
    // res.end("success")


    res.status(200).send(JSON.stringify(res.locals.credentials))


    // res.json({ 1: true })
  })


app.use("/find/:location_id/:nature_option",
  finderController.getNatureData,
  (req, res) => {
    res.status(200).send({ results: res.locals.results, date: res.locals.date });
  }
);



app.post("/favorites", favoriteController.checkFav, (req, res) => {
  res.status(200);
});

app.get("/favorites/:id", favoriteController.checkIfFavorite, (req, res) => {
  // res.send(res.locals.isFavorite);
  res.status(200).send(res.locals.isFavorite)
});

app.get("/signup", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../client/signup.html"));
});

// statically serve everything in the build folder on the route '/build'
app.use("/build", express.static(path.join(__dirname, "../build")));
// serve index.html on the route '/'
app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../index.html"));
});

app.listen(3000);


    // sess looks like this 
    //     {
    //     "sess": {
    //         "cookie": {
    //             "originalMaxAge": 120000,
    //             "expires": "2023-07-01T17:03:58.631Z",
    //             "secure": false,
    //             "httpOnly": false,
    //             "path": "/"
    //         },
    //         "user": "jasminee@gmail.com"
    //     }
    // }