import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import "../styles/auth.css";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user" // fixed role
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Account created successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={submit}>
        <h2>Create an Account</h2>

        <label>Full Name</label>
        <input
          type="text"
          placeholder="Full Name"
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <label>Email Address</label>
        <input
          type="email"
          placeholder="Email Address"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <label>Password</label>
        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button type="submit">Sign Up</button>

        <p className="switch-text">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </form>
    </div>
  );
}
