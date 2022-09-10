import React,{ useRef, useState, useEffect} from "react";
import { useHistory} from 'react-router-dom';
import { ChatEngine } from "react-chat-engine";
import {auth} from '../firebase';
import axios from 'axios';
//from "AuthContext.js" we are getting the user
import { UserAuth } from "../contexts/AuthContext";

const Chats = () => {
    const didMountRef = useRef(false);
    //calling it as a hook
    const history = useHistory();
    //populating user with the user from the AuthContext
    const {user} = UserAuth();
    const [loading, setLoading] = useState(true);

    //logout function async func that calls the firebase auth signout function
    const handleLogout = async () => {
        await auth.signOut();
        history.push('/');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        //blob is a binary large object
        //for now blob contains our image
        const data = await response.blob();
        //returning a file object -> an array with data inside, filename, and type
        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'});
    }

    //function that expects a callback and has a dependency array
    useEffect( () => {
        //if there is no user then push to the login page
      if (!didMountRef.current) {
      
        if (!user){
            history.push('/');
            return;
        }


        //if there is a user then show to the chats page
        axios.get(
            'https://api.chatengine.io/users/me', 
        {
            headers: {
                "project-id": "a78f88b4-1215-435c-9b02-fbb3a0246408",
                "user-name": user.email, //using the real user data coming from user and userAuth context
                "user-secret": user.uid, 
            }
        })

        .then(() => {
            setLoading = false;
            //setting the loading to false and chat engine will render
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email);
            //emails are unique usernames are not
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name);

                    axios.post('https://api.chatengine.io/users/',
                    formdata,
                    //object with headers
                    //has to be put in environemnt variables to be secure
                    {headers: {"private-key": "c1b775c3-2256-462f-85bc-ba27e8b6d446"}}
                    )
                    //if the user creation is successful
                    .then(() => setLoading(false))
                    .catch((error) => console.log(error));
                })
        })
    }
    }, [user, history]);

    //if no user or currently loading then show a string "Loading..."
    if (!user || loading) return 'Loading...';
    
    return(
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    HamiChat
                </div>

                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>

            <ChatEngine
                //100vh - 66px which is the height
                height="calc(100vh - 66px)"
                //not a safe way to show the project id
                projectID="a78f88b4-1215-435c-9b02-fbb3a0246408"
                userName={user.email}
                userSecret={user.uid}
                />
        </div>
    )
}

export default Chats;