import React, { useEffect, useState } from "react";
// import { Card } from 'react-bootstrap';
import jwtDecode from "jwt-decode";
import axios from "axios";

const FriendsList = (props) => {
    const [currentUser, setCurrentUser] = useState();
    const [userId, setUserId] = useState();
    const [friends, setFriends] = useState();

    useEffect(() => { getUserFromToken() } );
    useEffect(() => { getUserById() }, [userId] );

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
            setCurrentUser(response.data);
            setFriends(response.data.friends)
            console.log(response.data)
        } catch (error) {
            console.log(`Couldn't Retrieve Token! ${error}`);
        }
    }

    // const getUserById = async (friend) => {
    //     try {
    //         let response = await axios.get(`http://localhost:5000/api/user/${friend}`);
            
    //             response : friend
    
    //     } catch (error) {
    //         console.log(`Couldn't Retrieve Token! ${error}`);
    //     }
    // }


    // const listOfFriends = friends.map((friend, id) => {
    //     return (
    //         <div>
    //             <Card {friend.id}/>
    //         </div>
    //     )
        
    // }
    return(
        <div className="friend-wrapper">
            hi
        </div>
    );
    
}


export default FriendsList;