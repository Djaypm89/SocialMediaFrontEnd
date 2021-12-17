import React from "react";
import { Link } from "react-router-dom";
import './NavBar.css'

const NavBar = ({user}) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light"> 
      <a class="navbar-brand" href="/">
        <img id="logo" alt="Logo" src="../gg.jpg" width="175" height="100" />
    </a>
        <div className="container-fluid">
            {!user.email &&
            <Link className="navbar-brand" to={"/"}>gamer Garden </Link>
            }
            {user.email &&
            <Link className="navbar-brand" to={"/Forum"}>gamer Garden</Link>
            }
            <ul className="navbar-nav me-auto">
            {user.email &&
                <div >
                    <li className="nav-item">
                        <Link className="nav-link" to={"/Forum"}>Forum</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/Profile"}>Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/FriendsList"}>FriendsList</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/Logout"}>Log Out</Link>
                    </li>
                </div>}
            {!user.email &&
                <div>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/Login"}>Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/Register"}>Register</Link>
                    </li>
                </div>} 
            </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;