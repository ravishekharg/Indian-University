import { Link } from "react-router-dom";

import Logo from "./Logo";
import { useAuth, logout } from "../hooks/useAuth";

function Navbar() {
  const { isAuthenticated, username } = useAuth();

  return (
    <div className="navbar">
      <Link to="/" className="navbar-brand">
        <Logo size={34} />
        <span className="navbar-wordmark">
          <span className="name">Indian University Platform</span>
          <span className="tagline">Administrative Console</span>
        </span>
      </Link>

      {isAuthenticated && (
        <div className="navbar-account">
          <span className="username">{username}</span>
          <button className="btn-ghost-light" onClick={logout}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
