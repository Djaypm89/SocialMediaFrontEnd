import React, { useState } from "react";
import axios from "axios";

const Login = (props) => {
    const [currentEmail, setEmail] = useState("");
    const [currentPassword, setPassword] = useState("");

    const handleEmail = (event) => {
        setEmail(event.target.value);
        console.log(currentEmail);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
        console.log(currentPassword);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            'email': currentEmail,
            'password': currentPassword
        }
        console.log("Submit Success!");
        console.log(user);
        loginUser(user);
    } 

    const loginUser = async (user) => {
        try {
            let response = await axios.post("http://localhost:5000/api/user/login", user);
            console.log(response)
            localStorage.setItem('token', response.data);
            console.log(localStorage)
            // window.location('/');
            return localStorage;

        } catch (error) {
            console.log("Couldn't Retrieve Token!");
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="email" 
                onChange={handleEmail}>
            </input>
            <input 
                type="password" 
                name="password" 
                onChange={handlePassword}>
            </input>
            <button type="submit">Submit</button>
        </form>
    );
}

export default Login;