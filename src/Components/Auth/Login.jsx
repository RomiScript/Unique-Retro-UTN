import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import './Login.css'; 

const Login = () => {
  // Acá guardo el email que el usuario pone
  const [email, setEmail] = useState("");
  // Acá la contraseña
  const [password, setPassword] = useState("");
  // Si hay algún error, lo muestro
  const [error, setError] = useState("");
  // Para mostrar el spinner cuando está cargando
  const [loading, setLoading] = useState(false);
  // Si el login fue exitoso, muestro el mensajito
  const [success, setSuccess] = useState(false);
  // Para navegar entre páginas
  const navigate = useNavigate();

  // Cuando el usuario manda el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Acá intento loguear al usuario con Firebase
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      // Lo mando al home después de un ratito
      setTimeout(() => navigate("/"), 1500); 
    } catch (error) {
      // Acá manejo los errores y muestro mensajes más copados
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

  // Si el login fue exitoso, muestro el mensajito de bienvenida
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

  // Acá está el formulario de login
  return (
    <div className="auth-container">
      <h2>Iniciar sesión</h2>
      {/* Si hay error, lo muestro acá */}
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          {/* Input para el email */}
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
          {/* Input para la contraseña */}
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* Link para recuperar la contraseña */}
          <Link to="/forgot-password" className="forgot-password">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {/* Botón para enviar el formulario */}
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

      {/* Link para ir a registrarse si no tiene cuenta */}
      <div className="auth-footer">
        <p>¿No tenés cuenta? <Link to="/register">Crea una aquí</Link></p>
      </div>
    </div>
  );
};

export default Login;
