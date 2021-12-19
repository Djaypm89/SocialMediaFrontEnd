import axios from "axios";
import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import "./Post.css";

const Post = (props) => {
    const [post, setPost] = useState("");
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    // 1. runs as soon as page is rendered
    useEffect(() => {getToken()}, []);

    // 2. provides userId and postBody from the JWT 
    const getToken = () => {
        const jwt = localStorage.getItem('token');
          try{
              let currentUser = jwtDecode(jwt);
              console.log(currentUser);
              setUserId(currentUser._id);
              setUserName(currentUser.name);
          }catch(error){
              console.log(error)
            }
      }
// 3. onChange triggered upon user input in post field (in return), then set up to state line 4 setPost
    const onChange = (event) => {
        console.log(event.target.value);
        setPost(event.target.value);
    }
// 4. this is triggered upon submit, that then runs postPost
    const handlePost = (event) => {
        event.preventDefault();
        postPost();
        alert("Post Created!");
       
    }
// 5. runs axios which pulls userId and postBody from state above, and sends to backEnd. 
    const postPost = async () => {
        let id = userId;
        let postBody = post;
        let name = userName;
        let time = Date.now();
        try {
            let response = await axios.post('http://localhost:5000/api/post', 
                { 
                    userId: id,
                    name: name,
                    postBody: postBody,
                    timeStamp: time
                }
            );
        } catch (error) {
            console.log("Couldn't POST post to Database!");
        }
    }
    
    
    return (
        <div className="post" className="post-cont">
            <form onSubmit={handlePost}>
                <label>
                    Add Post: 
                    <input type="text" onChange={onChange} />
                </label>
                <button type="submit">Submit</button>
           </form>
        </div>
    );
}

export default Post;