import React, { useEffect } from "react"
import { GoogleLogin } from '@react-oauth/google';
function Login({ name, user, setUser, setName, setFavorites }) {



    useEffect(() => {
        fetch('/session')
            .then(response => response.json())
            .then(data => {
                console.log('data from sessions resp:', data)
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
            .then((response) => response.json())
            // .then(data => console.log('data:', data))
            .then(data => {
                console.log('data from google resp:', data)
                setFavorites(data.favorites)
                setUser(data.user)
                setName(data.name)
            })



    };
    const errorMessage = (error) => {
        console.log(error);
    };

    if (name) {
        return <div className="welcomeBack">Welcome back {name}</div>
    } else {

        return (
            <div className='login'>
                <span className="loginText">Log in With </span>
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
                    // type="rectangular"
                    // width='100'
                    />
                </div>
            </div>
        )
    }

}

export default Login