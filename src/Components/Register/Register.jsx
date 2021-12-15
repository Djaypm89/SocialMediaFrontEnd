import axios from "axios";
import React, { useState } from "react";

const Register = (props) => {
    const [userEmail, setEmail] = useState("");
    const [userName, setName] = useState("");
    const [userPassword, setPassword] = useState("");
    const [userIsAdmin, setIsAdmin] = useState(true);

    const handleChange = (event) => {
        if(event.target.name === "email"){
            setEmail(event.target.value);
        }else if(event.target.name === "name"){
            setName(event.target.value);
        }else if(event.target.name === "password"){
            setPassword(event.target.value);
        }else if(event.target.name === "isAdmin"){
            setIsAdmin("checked");
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            email: userEmail,
            name: userName,
            password: userPassword,
            isAdmin: userIsAdmin
        }
        console.log(user);
        registerUser(user);
    }

    const registerUser = async (user) => {
        try {
            let response = await axios.post("http://localhost:5000/api/user/register", user);
            console.log(response);
        } catch (error) {
            console.log("Couldn't Register User");
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" name="email" onChange={handleChange}></input>
            <input type="text" name="name" onChange={handleChange}></input>
            <input type="text" name="password" onChange={handleChange}></input>
            <input type="checkbox" name="isAdmin"></input>
            <button type="submit">Submit</button>
        </form>
    );
}

export default Register;