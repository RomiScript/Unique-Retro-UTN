import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams(); // id = SKU del producto
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // 1. Consulta Firestore para buscar el producto por SKU
        const productsRef = collection(db, 'products');
        const q = query(productsRef, where('sku', '==', id));
        const querySnapshot = await getDocs(q);

        // 2. Verifica si encontró resultados
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setProduct({
            id: doc.id,
            ...doc.data()
          });
        } else {
          setError(`No se encontró el producto con SKU: ${id}`);
        }
      } catch (err) {
        console.error("Error al cargar producto:", err);
        setError("Error al cargar los datos del producto");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const generatePlaceholder = (productName) => {
    const placeholders = [
      `Este ${productName} es una pieza única de nuestra colección retro.`,
      `Diseño vintage: ${productName} combina funcionalidad y estilo retro.`,
      `Edición limitada: ${productName} ha sido verificado para garantizar autenticidad.`,
      `Exclusivo: Solo disponemos de unidades limitadas de ${productName}.`
    ];
    return placeholders[Math.floor(Math.random() * placeholders.length)];
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Cargando detalles del producto...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <h2>{error || 'Producto no disponible'}</h2>
        <Link to="/" className="back-button">
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <div className="product-image-section">
        <img 
          src={product.img} 
          alt={product.name} 
          className="product-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x400?text=Imagen+no+disponible';
          }}
        />
      </div>

      <div className="product-info-section">
        <h1 className="product-title">{product.name}</h1>
        
        <div className="price-section">
          <span className="price">${product.price.toLocaleString('es-AR')}</span>
          <span className="sku">SKU: {product.sku}</span>
        </div>

        <div className="description-section">
          <h3>Descripción</h3>
          <p>{product.description}</p>
        </div>

        <div className="technical-details">
          <h3>Detalles técnicos</h3>
          <ul>
            <li><strong>Material:</strong> {product.material || 'Varios componentes'}</li>
            <li><strong>Dimensiones:</strong> {product.dimensions || '30x20x15 cm'}</li>
            <li><strong>Garantía:</strong> {product.warranty || '1 año'}</li>
          </ul>
        </div>

        <div className="exclusive-details">
          <h3>Sobre este producto</h3>
          <p>{generatePlaceholder(product.name)}</p>
        </div>

        <div className="action-buttons">
          <button className="add-to-cart">Añadir al carrito</button>
          <Link to="/" className="back-link">
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
