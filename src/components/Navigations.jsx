import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = ({token, logout}) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [token]);

  

  return (
    <header className="navbar">
      <nav className="navbar-container">
        <Link to="/" className="nav-logo">Book Buddy</Link>
        
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>

          {token ? (
  <>
    <li><Link to="/account" className="nav-link">Account</Link></li>
    <li><button onClick={logout} className="nav-button">Logout</button></li>
  </>
) : (
  <>
    <li><Link to="/login" className="nav-link">Login</Link></li>
    <li><Link to="/register" className="nav-link">Register</Link></li>
  </>
)}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;