import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({user}) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
            {!user.email &&
            <Link className="navbar-brand" to={"/"}>Social Media Placeholder</Link>
            }
            {user.email &&
            <Link className="navbar-brand" to={"/Forum"}>Social Media Placeholder</Link>
            }
          <div className="collapse navbar-collapse" id="navbarColor03">
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
                </div>
            }
            {!user.email &&
                <div>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/Login"}>Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/Register"}>Register</Link>
                    </li>
                </div>
            }   
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;