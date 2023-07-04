const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const finderController = require("../server/controllers/finderController.js");
const favoriteController = require("../server/controllers/favoriteController.js");
const userController = require("../server/controllers/userController.js");
const sessionController = require("../server/controllers/sessionController.js");
const authController = require("../server/controllers/authController.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const RedisStore = require("connect-redis").default
const session = require('express-session');
const redis = require('redis');
require('dotenv').config();


const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))


const redisClient = redis.createClient()
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
      maxAge: 1000 * 60 * 2 // session max age in miliseconds -
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


app.use("/session", sessionController.getSession, userController.getUserFavorites, (req, res) => {
  const sess = req.session;
  if (sess.user) {
    res.status(200).send({ user: sess.user, favorites: res.locals.favorites, name: res.locals.name })
  } else {
    res.status(200).send({ user: null, })
  }
});


app.use("/login", authController.verifyCredentials, userController.getUser, (req, res) => {
  const sess = req.session;
  const user = res.locals.credentials.email
  sess.user = res.locals.credentials.email
  sess.name = res.locals.credentials.given_name
  sess.token = res.locals.token

  const returnObj = {
    favorites: res.locals.favorites,
    user: res.locals.credentials.email,
    name: res.locals.credentials.given_name
  }

  res.status(200).send(JSON.stringify(returnObj))
})


app.use("/find/:location_id/:nature_option",
  finderController.getNatureData,
  (req, res) => {
    res.status(200).send({ results: res.locals.results, date: res.locals.date });
  }
);

app.post("/favorites/add", sessionController.getSession, favoriteController.addFavorite, (req, res) => {
  console.log('res.locals in add', res.locals)
  if (res.locals.user) {
    res.status(200).json(res.locals.userFavorites);
  }
  else res.status(200).json([]);

});

app.post("/favorites/remove", sessionController.getSession, favoriteController.removeFavorite, (req, res) => {
  if (res.locals.user) {
    res.status(200).json(res.locals.userFavorites);
  }
  else res.status(200).json([]);

});

app.get("/signup", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../client/signup.html"));
});

app.use("/build", express.static(path.join(__dirname, "../build")));

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../index.html"));
});

app.listen(3000);





// app.get("/", (req, res) => {
//   console.log('entering main get request')

//   const sess = req.session;
//   if (sess.user) {
//     console.log('username found')
//     res.status(200).send(sess.user)

//   } else {
//     console.log('no username')
//     res.status(200).send('no username')

//     // res.end('<a href=' + '/logout' + '>Click here to log in</a >')

//   }
// });


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