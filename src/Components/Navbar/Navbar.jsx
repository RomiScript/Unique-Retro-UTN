import './Navbar.css';
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="nav-container"> 
      <nav className="navbar">
         <Link to="/login">Login</Link> | <Link to="/register">Registro</Link>
        <h1 className="navbar-logo">📻</h1>
        <h2 className="navbar-cart">🛒</h2>
      </nav>
    </div>
  )
}

export default Navbar
