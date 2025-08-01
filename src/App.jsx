// Importo los componentes y librerías necesarias para el enrutamiento
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";

// Componente principal de la app
function App() {
  return (
    <>
      {/* Acá armo el enrutador para manejar las distintas páginas */}
      <BrowserRouter>
        <Routes>
          {/* Ruta para la página principal */}
          <Route path="/" element={<Home />} />
          {/* Ruta para los detalles de producto, con parámetro dinámico */}
          <Route path="/product/:id" element={<ProductDetails />} />
          {/* Ruta para el login */}
          <Route path="/login" element={<Login />} />
          {/* Ruta para el registro */}
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      {/* Footer con copyright por si me quieren robar 🤣🤣 */}
      <footer className="footer">
        <p>© 2025 RomiScript, todos los derechos reservados.</p>
      </footer>
    </>
  );
}

export default App;
