import axios from "axios";
import React, { useState, useEffect} from "react";
import jwtDecode from "jwt-decode";
import "./SearchBar.css";

const SearchBar = () => {
    const [userId, setUserId] = useState("");
    const [userInfo, setUserInfo] = useState();
    const [allUsers, setUsers] = useState();
    const [filtered, setFiltered] = useState();

    useEffect(() => { getUserId(); }, []);
    useEffect(() => { getAllUsers(); }, []);
    useEffect(() => { getUserInfo(); }, [userId]);
    useEffect(() => {filterUsers()}, [userInfo]);

    /* Gets Loggin User ID from Token */
    const getUserId = () => {
        const jwt = localStorage.getItem('token');
          try{
              let currentUser = jwtDecode(jwt);
              setUserId(currentUser._id);
          }catch(error){
              console.log(error)
            }
    }

    /* Gets User's Info from Database */
    const getUserInfo = async () => {
        let id = userId;
        try {
            let response = await axios.get(`http://localhost:5000/api/user/${id}`);
            setUserId(response.data._id);
            setUserInfo(response.data);
        } catch (error) {
            console.log("Couldn't Retrieve User Info!");
        }
    }

    /* FILTER HELPER FUNC:
    Checks User's for Current Loggin In User */
    const checkForUser = (user, id) => {
        if(user !== undefined & id !== undefined){
            let newListUsers = user.filter(user => {
                if(user._id === id){
                    return false;
                }else{
                    return true;
                }
            });
            return newListUsers;
        }
    }

    /* FILTER HELPER FUNC:
    Checks User's for Friends and Filters Them Out. */
    const checkForFriends = (user, friends) => {
        if(user !== undefined && friends !== undefined){
            let newListUsers = user.filter(user => {
                if(friends.includes(user._id)){
                    return false;
                }else{
                    return true;
                }
            });
            return newListUsers;
        }else{
            return [];
        }
    }

    /* Filters Through User's */
    const filterUsers = () => {
        let id = "";
        let user = [];
        let friends = [];
        let newUsers = [];
        if(userInfo === undefined){
            getUserInfo();
        }else if(userInfo){
            let id = userId;
            let user = allUsers;
            let friends = userInfo.friends;
            newUsers = checkForUser(user, id);
            newUsers = checkForFriends(newUsers, friends);
            setFiltered(newUsers);
        }
    }

    /* Gets All User's from Database */
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
            alert("Friend Request Sent");
        } catch (error) {
            console.log("Couldn't Send Friend Request!");
        }
    } 

    if(filtered === undefined || filtered === []){
        return(
            <div className="searchBar-cont-button">
                <button onClick={filterUsers}>Show All Users</button>
            </div>
        );
    }else if(filtered){
        return(
            <div className="searchBar">
                {filtered.map(user => {
                    return(
                        <div key={user._id} className="searchBar-cont">
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