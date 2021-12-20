import React, { useEffect, useState } from "react";
import axios from "axios";

const FriendsRequest = (props) => {
    const [received, setReceived] = useState();
    const [requestors, setRequestors] = useState();

    useEffect(() => { getReceivedRequests() },);

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
            console.log(requestorArray)
        } catch (error) {
            console.log(error);
        }
    }

    if(received === undefined || received === [])
        return(
            <h1>No sent requests sowwy</h1>
        )
    else{
        return(
            <div>
                <center>
                <p>You have {received.length} pending requests</p>
                    <p>Pending Requests:</p>
                    <button onClick={() => filterRequests(received)}>View Pending Requests</button>
                    {requestors &&
                        <div>
                            {requestors.map((names) => {
                                return (
                                    <div key={names}>
                                        <h3>{names}</h3>
                                        {/* <button name={names} onClick={}></button> */}
                                    </div>
                                )
                            })}
                        </div>
                    }
                </center>
            </div>
        );
    }

}


export default FriendsRequest;