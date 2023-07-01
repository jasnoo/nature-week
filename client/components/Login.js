import React from "react"
import { GoogleLogin } from '@react-oauth/google';
function Login() {

    // for Google Login
    const responseMessage = (response) => {
        console.log('response:', { credential: response.credential });
        const credJson = JSON.stringify({ credential: response.credential })
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
            .then(data => console.log('data:', data))

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