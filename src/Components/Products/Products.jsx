import React from "react";
import { Link } from "react-router-dom";
import "./Products.css";

const Products = ({ products }) => {
  return (
    <div className="products-container">
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <div key={product.sku} className="product-card">
            <img src={product.img} alt={product.name} className="product-image" />
            <div className="product-info">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-price">${product.price.toLocaleString()}</p> 
              <p className="product-sku">SKU: {product.sku}</p>
              <p className="product-description">{product.description.substring(0, 60)}...</p> 
                <button className="detail-button">Ver detalles</button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="no-products">
          <p>No hay productos disponibles.</p>
        </div>
      )}
    </div>
  );
};

export default Products;
