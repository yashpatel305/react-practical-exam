import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

export default function Navbar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top py-2 px-3">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-4" to="/" style={{ letterSpacing: "1px" }}>
          <div className="d-flex align-items-center fs-4 fw-bold ">
               Recipe<span className="text-success">Vault</span>
            </div>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto gap-2">
            <li className="nav-item">
              <Link className="nav-link px-3 rounded nav-hover" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3 rounded nav-hover" to="/recipes">
                Recipes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3 rounded nav-hover" to="/add">
                Add New Recipe
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3 rounded nav-hover" to="/about">
                About
              </Link>
            </li>
          </ul>
          {/* Right side (Auth controls) */}
          <ul className="navbar-nav ms-auto gap-2 align-items-center">
            {currentUser ? (
              <>
                <li className="nav-item">
                  <span className="navbar-text me-3 fw-semibold">
                    Welcome, {currentUser.displayName || currentUser.email}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm nav-hover"
                    style={{ transition: "background 0.2s, color 0.2s" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link px-3 rounded nav-hover" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3 rounded nav-hover" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}


