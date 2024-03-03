import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./css/nav.css";

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md">
        <button
          className="navbar-toggler me-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to={"/"} className="nav-link" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Services
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {this.props.machineTypes &&
                    this.props.machineTypes.map((machineType) => (
                      <li key={machineType}>
                        <Link
                          to={`/services/${machineType}`}
                          className="dropdown-item"
                        >
                          {machineType}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <Link to={"/parts"} className="nav-link">
                Parts
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/about"} className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/contact"} className="nav-link">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
