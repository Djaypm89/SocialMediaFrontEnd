import React, { useState, useEffect} from "react";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import jwtDecode from "jwt-decode";
import Login from "./Components/Login";
import Register from "./Components/Register/Register";
import FriendsList from "./Components/FriendsList";
import Profile from "./Components/Profile";
import Forum from "./Components/Forum";

const App = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        getToken();
    },[]);

    const getToken = () => {
      const jwt = localStorage.getItem('token');
        try{
            let currentUser = jwtDecode(jwt);
            console.log(currentUser);
            setUser(currentUser);
        }catch(error){
            console.log(error)
          }
    }

    return(
        <Router>
            <div className="App">
                <NavBar user={user} />
              <Switch>
                <Route
                  path ='/'
                  exact
                  render = {props => {
                      if (!user){
                        return <Redirect to ="/login"/>
                    }}}
                />
                <Route path="/Login" component={Login} />
                <Route path="/FriendsList" component={FriendsList} />
                <Route path="/Profile" component={Profile} />
                <Route path="/Register" component={Register} />
                <Route path="/Forum" component={Forum} />
                <Route path="/Logout" component={Logout} />
              </Switch>
          </div>
        </Router>
    );
}

export default App;

/* 
    Pages:
        Profile Page
        
        Post Page
*/