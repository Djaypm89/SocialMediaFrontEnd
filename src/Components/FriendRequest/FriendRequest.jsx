import React, { useEffect, useState } from "react";
import axios from "axios";
import './FriendRequest.css'

const FriendsRequest = (props) => {
    const [received, setReceived] = useState();
    const [requestors, setRequestors] = useState();

    useEffect(() => {
        getReceivedRequests(); 
    }, 
    [received]);

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
                    filteredList.push(req.requestor)
                )
            }
            )
        }else{
            console.log("no dice")
        }
        getUserById(filteredList)
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
                                        <button>Respond to Request</button>
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