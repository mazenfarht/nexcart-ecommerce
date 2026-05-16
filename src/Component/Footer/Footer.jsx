import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.svg";
import "./FooterStyle.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row gy-5">
          {/* ================= LEFT SIDE ================= */}
          <div className="col-lg-4">
            {/* LOGO / BRAND */}
            <h2 className="footer-logo">
              <img src={logo} alt="" />
            </h2>

            {/* DESCRIPTION */}
            <p className="footer-text">
              Modern e-commerce platform built for fast shopping, secure
              payments, and a smooth user experience on all devices.
            </p>

            {/* SOCIAL LINKS */}
            <div className="footer-socials">
              <a href="/">
                <i className="fa-brands fa-facebook-f"></i>
              </a>

              <a href="/">
                <i className="fa-brands fa-instagram"></i>
              </a>

              <a href="/">
                <i className="fa-brands fa-twitter"></i>
              </a>

              <a href="/">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div className="col-6 col-lg-2">
            <h5 className="footer-title">Quick Links</h5>

            <ul className="footer-links">
              <li>
                <Link to="/home">Home</Link>
              </li>

              <li>
                <Link to="/products">Products</Link>
              </li>

              <li>
                <Link to="/">Categories</Link>
              </li>

              <li>
                <Link to="/cart">Cart</Link>
              </li>
            </ul>
          </div>

          {/* ================= SUPPORT ================= */}
          <div className="col-6 col-lg-2">
            <h5 className="footer-title">Support</h5>

            <ul className="footer-links">
              <li>
                <Link to="/">Help Center</Link>
              </li>

              <li>
                <Link to="/">Privacy Policy</Link>
              </li>

              <li>
                <Link to="/">Terms & Conditions</Link>
              </li>

              <li>
                <Link to="/">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* ================= NEWSLETTER ================= */}
          <div className="col-lg-4">
            <h5 className="footer-title">Newsletter</h5>

            <p className="footer-text">
              Subscribe to get special offers, free giveaways, and latest
              updates.
            </p>

            {/* INPUT + BUTTON */}
            <form className="footer-form">
              <input type="email" placeholder="Enter your email" />

              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        {/* ================= BOTTOM FOOTER ================= */}
        <div className="footer-bottom">
          <p>© 2026 NexCart. All Rights Reserved.</p>

          {/* PAYMENT METHODS */}
          <div className="footer-payments">
            <i className="fa-brands fa-cc-visa"></i>

            <i className="fa-brands fa-cc-mastercard"></i>

            <i className="fa-brands fa-paypal"></i>

            <i className="fa-brands fa-apple-pay"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}
