import React, { useState, useEffect } from "react";
import axios from "axios";

const Bio = (props) => {
    const [bio, setBio] = useState("Hello World");
    const [editable, setEditable] = useState(false);

    //Save User Input to bio state
    const handleChange = (event) => {
        console.log(bio);
        setBio(event.target.value);
    }

    //Toggles whether or not Bio is Editable:
    const toggleEdit = () => {
        let toggle = !editable;
        setEditable(toggle);
    }

     //Updates the 
     const submitBio = async () => {
        let newBio = bio
        let userId = props.currentUser;
        try {
            let response = await axios.put(`http://localhost:5000/api/user/bio/${userId}`, { bio: bio});
            console.log(response.data);
        } catch (error) {
            console.log("Couldn't Update User Bio");
        }
    }

    if(!editable){
        return(
            <div>
                <textarea readOnly={editable} onChange={handleChange}>{bio}</textarea>
                <button onClick={toggleEdit}>Edit Bio</button>
                <button onClick={submitBio}>Save Changes</button>
            </div>
        );
    }else{
        return(
            <div>
                <textarea readOnly={editable} onChange={handleChangle}>{bio}</textarea>
                <button onClick={toggleEdit}>Edit Bio</button>
            </div>
        );
    }
}

export default Bio;