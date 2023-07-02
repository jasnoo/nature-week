import React from "react"
import { GoogleLogin } from '@react-oauth/google';
function Login({ user, setUser, setFavorites }) {

    // for Google Login
    const responseMessage = (response) => {
        const credJson = JSON.stringify({ credential: response.credential })
        console.log(credJson)
        fetch('/login', {
            method: "post",
            mode: "cors",
            body: credJson,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            // .then(data => console.log('data:', data))
            .then(data => {
                setFavorites(data.favorites)
                setUser(data.user)
            })



    };
    const errorMessage = (error) => {
        console.log(error);
    };



    return (
        <div className='googleLogin'>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    return responseMessage(credentialResponse);
                }}
                onError={(e) => {
                    errorMessage(e)
                }}
                useOneTap
            />
        </div>
    )
}

export default Login