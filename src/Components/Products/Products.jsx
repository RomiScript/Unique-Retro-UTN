import { useState, useEffect } from "react";
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => setProducts(data))
           

    }, []);

    return products.map(product => (
        <div className="card" key={product.id}>
            <h2>{product.name}</h2>
            <img src={product.img} alt={product.name} />
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quanty}</p>
            <button>Comprar</button>
        </div>
    ));


        
  return (
    <div>
      
    </div>
  )
}

export default Products
