import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import ProductDetails from "./Components/ProductDetails/ProductDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
             <Route path="/product/:id" element={<ProductDetails />} />
          
        </Routes>
      </BrowserRouter>


      <footer>
        <p>© 2025 RomiScript, todos los derechos reservados.</p>
      </footer>
      
    </>
  );
}

export default App;

