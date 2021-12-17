import axios from "axios";
import React, { useState } from "react";
import "./Register.css"

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
            setIsAdmin(true);
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
            window.location = '/Login';
        } catch (error) {
            console.log("Couldn't Register User");
        }
    }

    return(
        <div className="signUpContainer">
        <div className="card">
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <center>
                    <h3>Sign Up</h3>
                    </center>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" name="email" className="form-control" placeholder="Email" onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" name="name" className="form-control" placeholder="Username" onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" className="form-control" placeholder="********" onChange={handleChange} />
                    </div>
                    <div className="form-check">
                    <label className="form-check-label" htmlFor="flexCheckDefault">Admin</label>
                        <input type="checkbox" name="isAdmin" className="form-check-input" id="flexCheckDefault" onChange={handleChange}/>
                    </div>
                    <p className="forgot-password text-right">
                        Already registered <a href="/Login">sign in?</a>
                    <center>
                    <button type="submit" className="btn btn-dark">Sign Up</button>
                    </center>
                    </p>
                </form>
            </div>
        </div>
  </div>

    );
}

export default Register;