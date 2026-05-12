import React from "react";
import logo from "../../img/logo.svg";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-black">
      <div className="container-fluid">
        {/* Logo */}
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="Logo" />
        </NavLink>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link active" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Categories
              </NavLink>
            </li>
          </ul>

          {/* Right */}
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">
            <li className="nav-item">
              <NavLink
                className="btn text-white position-relative border-0 d-flex align-items-center"
                to="/"
              >
                Cart
                <i className="fa-solid fa-cart-shopping ms-2" />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                  10
                </span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
