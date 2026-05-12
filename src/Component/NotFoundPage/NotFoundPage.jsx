import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: "100vh" }}
    >
      <h1 className="display-1 fw-bold text-danger">404</h1>

      <h3 className="mb-3">Page Not Found</h3>

      <p className="text-muted mb-4">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <Link to="/home" className="btn bg-main text-white px-4">
        Go Home
      </Link>
    </div>
  );
}
