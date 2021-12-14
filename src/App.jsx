import React, { useState, useEffect} from "react";
import jwtDecode from "jwt-decode";
import Login from "./Components/Login";

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
        <div>
            <Login />
        </div>
    );
}

export default App;