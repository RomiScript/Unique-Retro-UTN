import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../Navbar/Navbar";
import Products from "../Products/Products";
import Banner from "../../Components/Banner/Banner";

import { db } from "../../firebase/config";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData.slice(0, 4));
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <Navbar />
      <Banner />
      <h2 className="home-title">Productos Destacados</h2>
      <Products products={products} />
    </div>
  );
};

export default Home;