import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

const FriendsRequest = (props) => {
    const [userId, setUserId] = useState();
    const [received, setReceived] = useState();
    const [sent, setSent] = useState();

    useEffect(() => { getUserFromToken() } );
    useEffect(() => { getReceivedRequests() }, [userId] );
    useEffect(() => { getSentRequests() }, [userId] );

    const getUserFromToken = async () => {
        const jwt = localStorage.getItem('token');
        try {
            let user = jwtDecode(jwt);
            setUserId(user._id)
        } catch (ex) {
            console.log(`User not found..${ex}`);
        }
    }

    const getReceivedRequests = async () => {
        const jwt = localStorage.getItem('token');
        try {
            let response = await axios.get(`http://localhost:5000/api/users/request/recieved/`, { test: "Blank"}, { headers: { 'x-auth-token': jwt}});
            if (response.data.status === 'PENDING')
                setReceived(response.data)
                console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getSentRequests = async () => {
        const jwt = localStorage.getItem('token');
        try {
            let response = await axios.get(`http://localhost:5000/api/users/request/sent/`, { headers: { 'x-auth-token': jwt}});
            if (response.data.status === 'PENDING' || 'ACCEPTED')
                setSent(response.data)
                console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    if(!received || !sent)
        return(
            <h1>No requests sowwy</h1>
        )
    else{
        return(
            <div className="request-card">
                <center>
                <h1>Pending Requests:</h1>
                </center>
            </div>
        );
    }
}


export default FriendsRequest;