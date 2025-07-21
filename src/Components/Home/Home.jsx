import { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import Navbar from "../Navbar/Navbar";
import Products from "../Products/Products";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  return (
    <>
      <Navbar />
      <Banner />
      <div className="product-card-container">
        <Products products={products} />
      </div>
    </>
  );
};

export default Home;
