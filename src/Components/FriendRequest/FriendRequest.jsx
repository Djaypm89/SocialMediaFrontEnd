import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import './FriendRequest.css'

const FriendsRequest = (props) => {
    const [userId, setUserId] = useState();
    const [received, setReceived] = useState();
    const [requestors, setRequestors] = useState();

    useEffect(() => { getUserFromToken() }, [] );
    useEffect(() => {getReceivedRequests()},[userId]);

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
            let response = await axios.get(`http://localhost:5000/api/users/request/recieved/`, { headers: { 'x-auth-token': jwt}});
                setReceived(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const filterRequests = (request) => {
        let filteredList = []
        if (request) {
            request.filter( function(req){
                req.status.includes("PENDING")
                return (
                    filteredList.push(req.requestor),
                    getUserById(filteredList)
                )
            }
            )
        }else{
            console.log("no dice")
        }
    }

    const getUserById = async (request) => {
        let requestorArray = []
        try {
            for(let i of request){
                let response = await axios.get(`http://localhost:5000/api/user/${i}`);
                requestorArray.push(response.data.name);
            }
            setRequestors(requestorArray)
        } catch (error) {
            console.log(error);
        }
    }

    if(received === undefined || received === []){
        return(
            <div className="card-requests-heading">
                <p>You have 0 pending requests</p>
            </div>
        )
    }else if(received){
        return(
            <div className="card-requests">
                <div className="card-requests-heading">
                <p>You have {received.length} pending requests</p>
                </div>
                    {filterRequests(received)}
                    {requestors &&
                        <div>
                            {requestors.map((names) => {
                                return (
                                    <div key={names} className="card-requests-body">
                                        <h3>{names}</h3>
                                        <button>Accept</button>
                                        <button>Reject</button>
                                    </div>
                                )
                            })}
                        </div>
                    }
             </div>
        );
    }

}


export default FriendsRequest;