/* Imports */
import axios from "axios";
import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import Post from "../Post/Post";
import FriendsList from "../FriendsList/FriendsList";

const Forum = (props) => {
    /* State Hooks */
    const [userId, setUserId] = useState("");
    const [userPosts, setUserPosts] = useState([]);
    const [friendsList, setFriendsList] = useState([]);
    const [friendsPosts, setFriendsPosts] = useState([]);
    const [viewUserPost, setViewUserPost] = useState(false);
    const [viewFriendPost, setViewFriendPost] = useState(false);
    const [createPost, setCreatePost] = useState(false);

    /* Use Effects */
    useEffect(() => {getToken()}, []);
    useEffect(() => {getFriendsList()}, [userId]);
    
    /* Extracts the Current Logged in User's ID from the 
    Token Saved in Brower Storage and Saves the ID in State. */
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

    /* Retrieves the Current Logged in User's Post and 
    Saves it into State. */
    const getMyPosts = async () => {
        let id = userId;
        try {
            let response = await axios.get(`http://localhost:5000/api/post/${id}`); 
            setUserPosts(response.data);
        } catch (error) {
            console.log("Couldn't POST post to Database!");
        }
    }
    
    /* Retrieves the Current Logged in User's List of Friends from the Database and
    Saves to State. */
    const getFriendsList = async () => {
        let id = userId;
        try {
            let response = await axios.get(`http://localhost:5000/api/user/${id}`);
                setFriendsList(response.data.friends)
        }catch (error) {
            console.log("Couldn't retrive friends list");
        }
    }

    /* Iterates through the Friend's List's ID's from State and
    Makes Axios Requests to Retrieve Each Friend's Post. */
    const getFriendsPosts = async () => {
        let friendArray = friendsList;
        let postsArray = [];
        try {
            for(let id of friendArray) {
                let response = await axios.get(`http://localhost:5000/api/post/${id}`);
                postsArray = postsArray.concat(response.data);
            }
            setFriendsPosts(postsArray);
        }catch (error) {
            console.log("Couldn't retrive friends list");
        }
    }

    /* Sets viewUserPost to True and
    viewFriendPost to False and
    createPost to False*/
    const handleUserPost = () => {
        setViewUserPost(true);
        setViewFriendPost(false);
        setCreatePost(false);
        getMyPosts();
    }

    /* Sets viewUserPost to False and
    viewFriendPost to True and
    createPost to False */
    const handleFriendPost = () => {
        setViewFriendPost(true);
        setViewUserPost(false);
        setCreatePost(false);
        getFriendsPosts();
    }

    /* Sets createPost to True and 
    viewUserPost to False and
    viewFriendPost to False */
    const handleCreatePost = () => {
        setCreatePost(true);
        setViewFriendPost(false);
        setViewUserPost(false);
    }

    /* Likes the Post and Updates the Database. */
    const likePost = async (event) => {
        let id = event.target.name;
        let currentLikes = parseInt(event.target.value) + 1;
        try {
            let response = await axios.put(`http://localhost:5000/api/post/${id}`, { like: currentLikes });
            getMyPosts();
            getFriendsPosts();
        } catch (error) {
            console.log("Couldn't Update Likes!");
        }
    }

    /* Deletes User's Post */
    const deletePost = async (event) => {
        let postId = event.target.name;
        try {
            let response = await axios.delete(`http://localhost:5000/api/post/${postId}`);
            getMyPosts();
            alert("Post Deleted!");
        } catch (error) {
            console.log("Couldn't Delete User's Post!");
        }
    }

    if(viewUserPost){
        return(
            <div>
                <div>
                    <button onClick={handleUserPost}>View User's Posts</button>
                    <button onClick={handleFriendPost}>View Friend's Posts</button>
                    <button onClick={handleCreatePost}>Create Post</button>
                </div>
                {userPosts.map(post => {
                    return (
                        <div key={post._id}>
                            <h3>User: {post.name}</h3>
                            <h3>Post: {post.postBody}</h3>
                            <button name={post._id} value={post.like} onClick={likePost}>Likes: {post.like}</button>
                            <button name={post._id} onClick={deletePost}>Delete Post</button>
                        </div>
                    );
                })}
            </div>
        );
    }else if(viewFriendPost){
        return(
            <div>
                <div>
                    <button onClick={handleUserPost}>View User's Posts</button>
                    <button onClick={handleFriendPost}>View Friend's Posts</button>
                    <button onClick={handleCreatePost}>Create Post</button>
                </div>
                {friendsPosts.map(post => {
                    return (
                        <div key={post._id}>
                            <h3>User: {post.name}</h3>
                            <h3>Post: {post.postBody}</h3>
                            <button name={post._id} value={post.like} onClick={likePost}>Likes: {post.like}</button>
                        </div>
                    );
                })}
            </div>
        );
    }else if(createPost){
        return(
            <div>
                <div>
                    <button onClick={handleUserPost}>View User's Posts</button>
                    <button onClick={handleFriendPost}>View Friend's Posts</button>
                    <button onClick={handleCreatePost}>Create Post</button>
                </div>
                <Post />
            </div>
        );
    }else{
        return(
            <div>
                <div>
                    <button onClick={handleUserPost}>View User's Posts</button>
                    <button onClick={handleFriendPost}>View Friend's Posts</button>
                    <button onClick={handleCreatePost}>Create Post</button>
                </div>
            </div>
        );
    }
}   

export default Forum;