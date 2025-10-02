// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { emailSignUp } from "../components/authService";

export default function Signup() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await emailSignUp(email, pwd);
      nav("/recipes", { replace: true });
    } catch (e) {
      setErr(e.message || "Signup failed");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "48px auto" }}>
      <h1>Create Account</h1>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required value={pwd} onChange={(e) => setPwd(e.target.value)} />
        {err ? <p style={{ color: "crimson" }}>{err}</p> : null}
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
