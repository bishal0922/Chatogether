import React from 'react';
//for our facebook and google login
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
//import firebase
import "firebase/app";
//import auth
import { auth } from "../firebase";
import firebase from 'firebase/app';

//making functional component
const Login = () => {
    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Welcome to HamiChat</h2>

                <div 
                    className="login-button google"
                    onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                >
                    <GoogleOutlined /> Sign In with Google
                </div>

                <br/><br/>

                <div 
                    className="login-button facebook"
                    onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}
                >
                    <FacebookOutlined /> Sign In with Facebook
                </div>

            </div>
        </div>
    );
}

export default Login;