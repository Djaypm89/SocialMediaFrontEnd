import axios from "axios";
import React, { useState, useEffect} from "react";

const SearchBar = () => {
    const [users, setUsers] = useState();

    useEffect(() => { getAllUsers(); }, []);

    const getAllUsers = async () => {
        try {
            let response = await axios.get("http://localhost:5000/api/user");
            setUsers(response.data);
        } catch (error) {
            console.log("Couldn't Get All User's!");
        }
    }

    /* Sents a Friend Request to Selected User */
    const sentFriendRequest = async (event) => {
        let requestee = event.target.name;
        const jwt = localStorage.getItem('token');
        try {
            let response = await axios.post(`http://localhost:5000/api/users/request/${requestee}`, {}, 
                { headers: { 'x-auth-token': jwt} }
            );
            console.log(response);
        } catch (error) {
            
        }
    } 

    if(!users){
        return(
            <h1>No User's Found!</h1>
        );
    }else if(users){
        return(
            <div>
                <form>
                    <input></input>
                    <button type="submit">Search</button>
                </form>
                {users.map(user => {
                    return(
                        <div key={user._id}>
                            <h3>{user.name}</h3>
                            <button name={user._id} onClick={sentFriendRequest}>Add Friend</button>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default SearchBar;