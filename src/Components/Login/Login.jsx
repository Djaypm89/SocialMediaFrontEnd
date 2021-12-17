import React, { useState } from "react";
import axios from "axios";
import './Login.css'

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
            localStorage.setItem('token', response.data);
            window.location = '/Forum';
        } catch (error) {
            console.log(`Couldn't Retrieve Token! ${error}`);
        }
    }

    return(
        <div className="loginContainer">
            <div className="card mb-3">
                <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <center>
                    <h3>Login</h3>
                    </center>
                    <div className="form-group">
                    <label>Email </label><br></br>
                    <input type="text" name="email" onChange={handleEmail}/>
                    </div>
                    <div className="form-group">
                    <label>Password </label><br></br>
                    <input type="password" name="password" onChange={handlePassword}/>
                    </div>
                    <center>
                    <button type="submit">Submit</button>
                    </center>
                </form>
                </div>
            </div>
        </div>
    );
}



export default Login;