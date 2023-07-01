const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();
// const { useSyncExternalStore } = require("react");


const authController = {};

authController.verifyCredentials = (req, res, next) => {

    console.log('entering authController')
    async function verify(client_id, jwtToken) {

        const client = new OAuth2Client(client_id);

        // Call the verifyIdToken to
        // varify and decode it
        const ticket = await client.verifyIdToken({
            idToken: jwtToken,
            audience: client_id,
        });

        // Get the JSON with all the user info
        const payload = ticket.getPayload();

        // This is a JSON object that contains
        // all the user info
        return payload;
    }

    // console.log('process.env.GOOGLE_OAUTH_CLIENT_ID', process.env.GOOGLE_OAUTH_CLIENT_ID)
    // console.log('req.body.credential', req.body.credential)
    const result = verify(process.env.GOOGLE_OAUTH_CLIENT_ID, req.body.credential)
    result
        .then((data) => {
            console.log('data:', data)
            // console.log(result)
            // console.log(result.email)
            // res.locals.credentials = result
            next();
        })
        .catch(e => next(e))




}

// Promise {
//   {
//     iss: 'https://accounts.google.com',
//     nbf: 1688221348,
//     aud: '727164836167-p5b5ueoai2inlchn5hbgkp10t6b357fr.apps.googleusercontent.com',
//     sub: '111670754909911422807',
//     email: 'jasminee@gmail.com',
//     email_verified: true,
//     azp: '727164836167-p5b5ueoai2inlchn5hbgkp10t6b357fr.apps.googleusercontent.com',
//     name: 'Jasmine Noor',
//     picture: 'https://lh3.googleusercontent.com/a/AAcHTtfJZgZVkHreXqs7pGeQqfZvs3MdGyGYVJlFL6JtV7QYgQE=s96-c',
//     given_name: 'Jasmine',
//     family_name: 'Noor',
//     iat: 1688221648,
//     exp: 1688225248,
//     jti: '69962b84e4af386dc4913e8a107f4b5edf89a578'
//   },
//   [Symbol(async_id_symbol)]: 276,
//   [Symbol(trigger_async_id_symbol)]: 272
// }

module.exports = authController;
