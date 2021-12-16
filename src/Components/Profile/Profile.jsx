import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Bio from "./Bio";

const Profile = (props)  => {
    const [currentUser, setCurrentUser] = useState({});
    const [name, setName] = useState("");
    const [src, setSrc] = useState("");
    
    useEffect(() => {
        getUserInfo();
    },[]);

    const getUserInfo = async () => {
        const jwt = localStorage.getItem('token');
        try {
            let user = jwtDecode(jwt);
            setCurrentUser(user);
            setName(user.name);
        } catch (error) {
            console.log("Couldn't Get User!");
        }
    }
    
    if(!currentUser){
        return(
            <div>
                <h1>You are not logged in!</h1>
            </div>
        );
    }else{
        return(
            <div>
                <header>
                    <h1>My Page</h1>
                    <h1>{name}</h1>
                </header>
                <main>
                    <span>
                        <img></img>
                        <Bio />
                    </span>
                    <span>
                        <button>View Posts</button>
                    </span>
                </main>
            </div>
        );
    }
}

export default Profile;