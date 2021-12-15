/* import axios from "axios";
import React, { useState } from "react";
import Post from "../Post/Post";
import "./App.css";

// need 2 filter options (by user and by friends)
const Forum = (props) => {
    const [userId, setUserId] = useState("");

    useEffect(() => {getToken()}, []);
       
    const getToken = () => {
        const jwt = localStorage.getItem('token');
          try{
              let currentUser = jwtDecode(jwt);
              console.log(currentUser);
              setUserId(currentUser);
          }catch(error){
              console.log(error)
        }
    }

    const getMyPosts = async () => {
        let id = userId;
        try {
            let response = await axios.get(`http://localhost:5000/api/post/${id}`); 
            console.log(response)
        } catch (error) {
            console.log("Couldn't POST post to Database!");
        }
    }
        
      return (
        <div>
            <button onClick={getMyPosts}>Get Posts</button>
            
        </div>
      );
}   

export default Forum; */