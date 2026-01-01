import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Task Manager</div>
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </nav>
  );
}
