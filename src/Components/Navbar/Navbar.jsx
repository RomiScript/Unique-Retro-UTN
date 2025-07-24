import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">📻 Unique Retro</Link> {/* Logo con texto */}
      </div>
      <div className="navbar-links">
        <Link to="/login" className="nav-link">Iniciar sesión</Link>
        <Link to="/register" className="nav-link">Registrarse</Link>
        <Link to="/cart" className="nav-link">🛒</Link> {/* Carrito decorativo por ahora */}
      </div>
    </nav>
  );
}

export default Navbar;
