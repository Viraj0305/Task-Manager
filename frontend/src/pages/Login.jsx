import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import "../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);

      // ✅ store token + role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // ✅ redirect based on role
      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={submit}>
        <h2>Sign In</h2>

        <label>Email Address</label>
        <input
          type="email"
          placeholder="Email Address"
          required
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <label>Password</label>
        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button type="submit">Login</button>

        <p className="switch-text">
          Don’t have an account? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
