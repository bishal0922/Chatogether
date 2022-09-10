//Provided by React
import React, { useContext, useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { auth } from '../firebase';

//we are creating the authcontext and it doesn't have anything
const AuthContext = React.createContext();

//and we pass that context to useContext react hook - function to grab context
export const UserAuth = () => useContext(AuthContext);

//using react children while renders all the jsx passed to it
export const AuthProvider = ({children}) => {
    //loading state useState hook and true at start
    const[loading, setLoading] = useState(true);
    //user Object useState hook and null at start
    const[user,setUser] = useState(null);
    //use/cal History hook to renaviagate 
    const history = useHistory();

    //useEffect is a react hook that runs when the component mounts
    //function that another function, and a dependency array/list when the dependency changes
    //grabbing the user from the firebase authentication and using react dom to push the application to the chats page
    useEffect(() => {
        //this is a listener that listens for any changes in the auth
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
            //renavigate to chats page only if there is a user -> if the conditional is not there only the chat component wiil be rendered
            if (user) history.push('/chats');
        });
    }, [user, history])

    const value = {user}

    return(
        <AuthContext.Provider value={value}>
            {/*if not loading then show the children*/}
            {!loading && children}
        </AuthContext.Provider>
    )
}

