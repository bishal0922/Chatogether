import React from "react"
//using react context

//import switch component and route component
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { AuthProvider } from "../contexts/AuthContext"
//this is the login component
import Login from "./Login"
//this is the chats component which comes after login
import Chats from "./Chats"

function App() {
  return (
    <div style={{fontfamily: 'Avenir'}}>
      <Router>
        <AuthProvider>
          <Switch>
            {/*On path"/" render the component LOGIN*/}
            <Route path="/chats" component={Chats} />
            <Route path="/" component={Login} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
