import React, { useEffect, useState } from "react";
import { Card } from 'react-bootstrap';
import jwtDecode from "jwt-decode";
import axios from "axios";
import './FriendList.css';

const FriendsList = (props) => {
    const [userId, setUserId] = useState();
    const [friends, setFriends] = useState();

    useEffect(() => { getUserFromToken() } );
    useEffect(() => { getUserById() }, [userId] );
    useEffect(() => { listOfFriends() }, [friends] );

    const getUserFromToken = async () => {
        const jwt = localStorage.getItem('token');
        try {
            let user = jwtDecode(jwt);
            setUserId(user._id)
        } catch (ex) {
            console.log(`User not found..${ex}`);
        }
    }

    const getUserById = async () => {
        let id = userId
        try {
            let response = await axios.get(`http://localhost:5000/api/user/${id}`);
            setFriends(response.data.friends)
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const listOfFriends = async () => {
        let list = friends
        let friendArray = []
        try{
            for(let i of list){
                let response = await axios.get(`http://localhost:5000/api/user/${i}`);
                friendArray.push(response.data);
            }
            setFriends(friendArray);
            console.log(friendArray)
        }catch(error){
            console.log(error);
        }
    }
    if(!friends)
        return(
            <h1>No friends sowwy</h1>
        )
    else{
        return(
            <div className="friend-card">
                <div className="friend-header">
                    <h1>Friends List:</h1>
                </div>
                {listOfFriends}
                {friends.map((friend => {
                    return (
                        <div key={friend._id} className="friend-card-body">
                            <h2>Name: {friend.name}</h2>
                            <h2>Bio:<h3>"{friend.bio}"</h3></h2>
                        </div>
                    )
                }))}
            </div>
        );
    }
}


export default FriendsList;