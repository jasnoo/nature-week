const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();
// const { useSyncExternalStore } = require("react");


const authController = {};


// when user logs in with google, front end receives credential info
// verifyCredentials will confirm validity of token
authController.verifyCredentials = (req, res, next) => {

    console.log('entering authController')
    async function verify(client_id, jwtToken) {
        const client = new OAuth2Client(client_id);
        // Call the verifyIdToken to verify and decode
        const ticket = await client.verifyIdToken({
            idToken: jwtToken,
            audience: client_id,
        });
        // Get the JSON with all the user info
        const payload = ticket.getPayload();
        // This is a JSON object that contains all the user info
        return payload;
    }

    // console.log('process.env.GOOGLE_OAUTH_CLIENT_ID', process.env.GOOGLE_OAUTH_CLIENT_ID)
    console.log('req.body.credential', req.body.credential)
    const result = verify(process.env.GOOGLE_OAUTH_CLIENT_ID, req.body.credential)
    result
        .then((data) => {
            console.log('verify promise result:', data)
            res.locals.credentials = data
            next();
        })
        .catch(e => next(e))

}



module.exports = authController;
