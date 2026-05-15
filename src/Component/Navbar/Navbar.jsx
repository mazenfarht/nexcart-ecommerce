import React, { useContext } from "react";
import logo from "../../img/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";

export default function Navbar() {
  let { cartCount, userToken, logout } = useContext(StoreContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-dark bg-black">
      <div className="container-fluid d-flex align-items-center">
        {/* LEFT SIDE (LOGO + LINKS) */}
        <div className="d-flex align-items-center gap-4">
          {/* LOGO */}
          <NavLink className="navbar-brand m-0" to="/">
            <img src={logo} alt="Logo" />
          </NavLink>

          {/* LINKS */}
          {userToken && (
            <div className="d-none d-lg-flex align-items-center gap-3">
              <NavLink className="nav-link text-white" to="/home">
                Home
              </NavLink>

              <NavLink className="nav-link text-white" to="/products">
                Products
              </NavLink>

              <NavLink className="nav-link text-white" to="/">
                Categories
              </NavLink>
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="d-none d-lg-flex align-items-center gap-3 ms-auto">
          {userToken ? (
            <>
              {/* CART */}
              <Link
                className="btn text-white position-relative border-0 d-flex align-items-center"
                to="/cart"
              >
                Cart
                <i className="fa-solid fa-cart-shopping " />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                  {cartCount}
                </span>
              </Link>

              {/* WISHLIST */}
              <Link
                className="btn text-white position-relative border-0 d-flex align-items-center"
                to="/wishlist"
              >
                Wishlist
                <i className="fa-solid fa-heart "></i>
              </Link>

              {/* LOGOUT */}
              <button
                className="btn text-white border-0"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* LOGIN */}
              <NavLink className="nav-link text-white" to="/login">
                Login
              </NavLink>

              {/* REGISTER */}
              <NavLink className="nav-link text-white" to="/register">
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* MOBILE TOGGLER */}
        <button
          className="navbar-toggler d-lg-none ms-auto"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      {/* MOBILE OFFCANVAS */}
      <div
        className="offcanvas offcanvas-end bg-black text-white d-lg-none"
        id="mobileMenu"
      >
        <div className="offcanvas-header">
          <h5 className="text-white">Menu</h5>

          <button
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body d-flex flex-column gap-3">
          {userToken ? (
            <>
              {/* LINKS */}
              <NavLink
                className="nav-link text-white"
                to="/home"
                data-bs-dismiss="offcanvas"
              >
                Home
              </NavLink>

              <NavLink
                className="nav-link text-white"
                to="/products"
                data-bs-dismiss="offcanvas"
              >
                Products
              </NavLink>

              <NavLink
                className="nav-link text-white"
                to="/"
                data-bs-dismiss="offcanvas"
              >
                Categories
              </NavLink>

              <hr className="text-white" />

              {/* CART */}
              <Link
                className="btn text-white position-relative border-0 text-start"
                to="/cart"
                data-bs-dismiss="offcanvas"
              >
                Cart
                <i className="fa-solid fa-cart-shopping ms-2" />
                <span className="ms-2 badge bg-warning">{cartCount}</span>
              </Link>

              {/* WISHLIST */}
              <Link
                className="btn text-white position-relative border-0 text-start"
                to="/wishlist"
                data-bs-dismiss="offcanvas"
              >
                Wishlist
                <i className="fa-solid fa-heart ms-2"></i>
              </Link>

              {/* LOGOUT */}
              <button
                className="btn text-white border-0 text-start"
                onClick={handleLogout}
                data-bs-dismiss="offcanvas"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* LOGIN */}
              <NavLink
                className="nav-link text-white"
                to="/login"
                data-bs-dismiss="offcanvas"
              >
                Login
              </NavLink>

              {/* REGISTER */}
              <NavLink
                className="nav-link text-white"
                to="/register"
                data-bs-dismiss="offcanvas"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
