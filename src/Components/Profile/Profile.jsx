import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import Bio from "./Bio";
import "./Profile.css";
// import FilesUploadComponent from "../ImgUpload/files-upload-component";

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
            <div className="profile">
                <header className="profile-header">
                    <h1>{name}'s Profile</h1>
                </header>
                <main className="profile-main">
                    <span>
                        <Bio />
                    </span>
                    <span className="friend-button">
                        <Link to={"/FriendsRequest"} className="link">
                            <button>
                                View Friend Requests
                            </button>
                        </Link>
                    </span>
                    {/* <span>
                        <FilesUploadComponent />
                    </span> */}
                </main>
            </div>
        );
    }
}

export default Profile;