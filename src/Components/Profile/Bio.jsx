import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "./Bio.css";

const Bio = (props) => {
    const [userId, setUserId] = useState("");
    const [bio, setBio] = useState("");
    const [editable, setEditable] = useState(true);

    useEffect(() => { getUserInfo() });
    useEffect(() => { getBio() }, [userId]);
    
    const getUserInfo = async () => {
        const jwt = localStorage.getItem('token');
        try {
            let user = jwtDecode(jwt);
            console.log("Fetching User ID!");
            let id = user._id;
            setUserId(id);
        } catch (error) {
            console.log("Couldn't Get User!");
        }
    }

    //GET Request to update State Bio with User's Bio in Database.
    const getBio = async () => {
        let id = userId;
        console.log("Getting Bio!");
        try {
            let response = await axios.get(`http://localhost:5000/api/user/info/${id}`);
            setBio(response.data.bio);
            console.log(response);
        } catch (error) {
            console.log("Couldn't get User's Bio!");
        }
    }

    //Save User Input to bio state
    const handleChange = (event) => {
        console.log(bio);
        setBio(event.target.value);
    }

    //Toggles whether or not Bio is Editable:
    const toggleEdit = () => {
        let toggle = !editable;
        setEditable(toggle);
        if (toggle)
        window.location = '/Profile';
    }

     //Updates the User's Bio in the Database
     const submitBio = async () => {
        let newBio = bio
        let id = userId;
        console.log("Updating Database with Bio!");
        try {
            let response = await axios.put(`http://localhost:5000/api/user/bio/${id}`, { bio: newBio });
            console.log(response);
            window.location = '/Profile';
        } catch (error) {
            console.log("Couldn't Update User Bio");
        }
    }

    if(!editable){
        return(
            <div className="bio-cont">
                <textarea readOnly={editable} onChange={handleChange} value={bio}></textarea>
                <div className="bio-button2">
                    <button onClick={() => toggleEdit()}>Exit</button>
                    <button onClick={() => submitBio()}>Save Changes</button>
                </div>
            </div>
        );
    }else{
        return(
            <div className="bio-cont">
                <textarea readOnly={editable} onChange={handleChange} value={bio}></textarea>
                <div className="bio-button">
                    <button onClick={toggleEdit}>Edit Bio</button>
                </div>
            </div>
        );
    }
}

export default Bio;