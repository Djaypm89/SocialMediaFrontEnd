import axios from "axios";
import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import Post from "../Post/Post";
import FriendsList from "../FriendsList/FriendsList";


// need 2 filter options (by user and by friends)
const Forum = (props) => {
    const [userId, setUserId] = useState("");
    const [userPosts, setUserPosts] = useState([]);
    const [friendsList, setFriendsList] = useState([]);
    const [postsList, setPostsList] = useState([]);

    useEffect(() => {getToken()}, []);
    useEffect(() => {getFriendsList()}, [userId]);
    useEffect(() => {getFriendsPosts()}, [friendsList]);
       
    const getToken = () => {
        const jwt = localStorage.getItem('token');
          try{
              let currentUser = jwtDecode(jwt);
              console.log(currentUser);
              setUserId(currentUser._id);
          }catch(error){
              console.log(error)
        }
    }

    const getMyPosts = async () => {
        let id = userId;
        try {
            let response = await axios.get(`http://localhost:5000/api/post/${id}`); 
                setUserPosts(response.data)
            console.log(response)
        } catch (error) {
            console.log("Couldn't POST post to Database!");
        }
    }
        
    const getFriendsList = async () => {
        let id = userId;
        try {
            let response = await axios.get(`http://localhost:5000/api/user/${id}`);
                setFriendsList(response.data.friends)
                console.log(response.data.friends)
        }catch (error) {
            console.log("Couldn't retrive friends list");
        }
    }

    const getFriendsPosts = async () => {
        let friendArray = friendsList;
        let postsArray = [];
        try {
            for(let i of friendArray) {
                let response = await axios.get(`http://localhost:5000/api/post/${i}`);
                postsArray.push(response.data);

            }
            setPostsList(postsArray);

        }catch (error) {
            console.log("Couldn't retrive friends list");
        }
    }

      return (
        <div>
            <button onClick={getMyPosts}>Get Posts</button>
            <Post />
            <button>Get Friends Posts</button>
            {userPosts.map(post => {
                return (
                    <h1>
                        {post.postBody}
                    </h1>
                    
                );
            })   }
            
        </div>
      );
}   

export default Forum;