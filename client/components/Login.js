import React, { useEffect } from "react"
import { GoogleLogin } from '@react-oauth/google';
function Login({ name, user, setUser, setName, setFavorites }) {

    useEffect(() => {
        fetch('/session')
            .then(response => response.json())
            .then(data => {
                if (data.user) {
                    setUser(data.user)
                    setFavorites(data.favorites)
                    setName(data.name)
                }
            })
    }, [])

    // for Google Login
    const responseMessage = (response) => {
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
            .then(response => response.json())
            .then(data => {
                setFavorites(data.favorites)
                setUser(data.user)
                setName(data.name)
            })
    };
    const errorMessage = (error) => {
        console.log(error);
    };

    if (name) {
        return (
            <div className='loggedin'>
                <span className="welcome">
                    Welcome {name}</span>
                <span className='logout'>
                    <a href='/logout'>Logout</a>
                </span>
            </div>
        )
    } else {

        return (
            <div className='login'>
                <span className="loginText">Log in with </span>
                <div className='googleLogin'>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            return responseMessage(credentialResponse);
                        }}
                        onError={(e) => {
                            errorMessage(e)
                        }}
                        type='icon'
                        shape='square'
                        size="small"
                    />
                </div>
            </div>
        )
    }

}

export default Login