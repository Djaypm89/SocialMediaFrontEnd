import React, { useState, useEffect} from "react";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import jwtDecode from "jwt-decode";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register";
import NavBar from "./Components/NavBar/NavBar.jsx";
import Logout from "./Components/Logout/Logout.jsx";
import Profile from "./Components/Profile/Profile";
import Forum from "./Components/Forum/Forum.jsx";
import FriendsList from "./Components/FriendsList/FriendsList.jsx";

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
                      if (!user.email){
                        return <Redirect to ="/login"/>
                    }}}
                />
                <Route path="/Login" component={Login} />
                <Route path="/Profile" component={Profile} />
                <Route path="/FriendsList" component={FriendsList} />
                <Route path="/Register" component={Register} />
                <Route path="/Forum" component={Forum} />
                <Route path="/Logout" component={Logout} />
              </Switch>
          </div>
        </Router>
    );
}

export default App;