import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      setTimeout(() => navigate("/"), 1500); // Redirige al home en de 1.5 segundos
    } catch (error) {
      // Mensajes de error más piolas 🐰
      switch(error.code) {
        case 'auth/user-not-found':
          setError("Usuario no registrado");
          break;
        case 'auth/wrong-password':
          setError("Contraseña incorrecta");
          break;
        case 'auth/too-many-requests':
          setError("Demasiados intentos. Intenta más tarde");
          break;
        default:
          setError("Error al iniciar sesión");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-container">
        <div className="success-message">
          <h2>¡Bienvenido de vuelta! 👋</h2>
          <p>Redirigiendo a la página principal...</p>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <h2>Iniciar sesión</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="tucorreo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Link to="/forgot-password" className="forgot-password">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={loading ? 'loading' : ''}
        >
          {loading ? (
            <>
              <span className="spinner-btn"></span>
              Procesando...
            </>
          ) : (
            'Ingresar'
          )}
        </button>
      </form>

      <div className="auth-footer">
        <p>¿No tienes cuenta? <Link to="/register">Crea una aquí</Link></p>
      </div>
    </div>
  );
};

export default Login;