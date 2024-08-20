import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  // Retrieve user data from localStorage
  const email = localStorage.getItem("email");
  const userId = localStorage.getItem("userid");
  const username = localStorage.getItem("username");
  const firstname = localStorage.getItem("firstname");
  const lastname = localStorage.getItem("lastname");

  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            GovHelp
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/complaints">
                  Complain/Query
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/complainttracker">
                  Complaint Tracker
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/PastQueries">
                  Previous Queries
                </Link>
              </li>
            </ul>
            <li
              className="nav-item dropdown dropstart"
              style={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingRight: "10px ",
              }}
            >
              <a
                className="nav-link dropdown-toggle"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Profile
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/">
                    {userId ? `User ID: ${userId}` : "User ID"}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    {username ? `Username: ${username}` : "Username"}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    {firstname && lastname
                      ? `Name: ${firstname} ${lastname}`
                      : "Name"}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    {email ? `Email: ${email}` : "Email"}
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="/" style={{color:'blue'}}>
                    LOG OUT
                  </a>
                </li>
                
              </ul>
            </li>
          </div>
        </div>
      </nav>
    </div>
  );
}
