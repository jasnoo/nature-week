const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const authController = {};

// when user logs in with google, front end receives credential info
// verifyCredentials will confirm validity of token
authController.verifyCredentials = (req, res, next) => {
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
    const result = verify(process.env.GOOGLE_OAUTH_CLIENT_ID, req.body.credential)
    result
        .then((data) => {
            res.locals.credentials = data
            res.locals.token = req.body.credential
            next();
        })
        .catch(e => next(e))

}



module.exports = authController;
