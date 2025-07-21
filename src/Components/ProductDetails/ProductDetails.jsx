
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
 




const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
       const foundProduct = data.find(item => String(item.sku) === id);

        setProduct(foundProduct);
      });
  }, [id]);

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <img src={product.img} alt={product.name} />
      <p>Price: ${product.price}</p>
      <p>Quantity: {product.quanty}</p>
      <p>sku: {product.sku}</p>
      <p>{product.description}</p>
      <button className='product-detail-button'>Comprar</button>
    </div>
  );
};
export default ProductDetails;
