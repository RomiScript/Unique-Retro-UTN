import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import './Register.css';

// Componente de registro de usuario
const Register = () => {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados para manejar errores, éxito y carga
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Manejo del submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Creo el usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Actualizo el displayName en Auth con nombre y apellido
      await updateProfile(user, {
        displayName: `${nombre} ${apellido}`,
      });

      // Guardo los datos del usuario en Firestore
      await setDoc(doc(db, "users", user.uid), {
        nombre,
        apellido,
        email,
        uid: user.uid,
        createdAt: new Date(),
      });

      setSuccess(true);
      // Redirijo al home después de 2 segundos
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      // Manejo de errores, muestro mensaje si el email ya está registrado
      setError(error.message.includes("email-already")
        ? "Este email ya está registrado"
        : "Error en el registro");
    } finally {
      setLoading(false);
    }
  };

  // Si el registro fue exitoso, muestro mensaje y spinner
  if (success) {
    return (
      <div className="auth-container">
        <div className="success-message">
          <h2>¡Registro exitoso! ✅</h2>
          <p>Redirigiendo a la página principal...</p>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  // Render del formulario de registro
  return (
    <div className="auth-container">
      <h2>Crear cuenta</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña (mínimo 6 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength="6"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>

      <p className="auth-link">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
};

export default Register;
