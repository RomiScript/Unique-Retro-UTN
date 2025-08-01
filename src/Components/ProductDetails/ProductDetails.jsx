import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import './ProductDetails.css';

const ProductDetails = () => {
  // Uso el hook para obtener el parámetro ID de la URL
  const { id } = useParams(); 
  // Estado para guardar el producto que traigo de Firebase
  const [product, setProduct] = useState(null);
  // Estado para manejar la carga
  const [loading, setLoading] = useState(true);
  // Estado para manejar errores
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función asíncrona para buscar el producto por SKU
    const fetchProduct = async () => {
      try {
        // Armo la referencia a la colección 'products'
        const productsRef = collection(db, 'products');
        // Hago la consulta filtrando por SKU
        const q = query(productsRef, where('sku', '==', id));
        const querySnapshot = await getDocs(q);

        // Si encuentro el producto, lo guardo en el estado
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setProduct({
            id: doc.id,
            ...doc.data()
          });
        } else {
          // Si no lo encuentro, muestro un error
          setError(`No se encontró el producto con SKU: ${id}`);
        }
      } catch (err) {
        // Si hay un error en la consulta, lo muestro
        console.error("Error al cargar producto:", err);
        setError("Error al cargar los datos del producto");
      } finally {
        // Cuando termina la consulta, saco el loading
        setLoading(false);
      }
    };

    // Llamo a la función para buscar el producto
    fetchProduct();
  }, [id]);

  // Genero un texto placeholder para la sección "Sobre este producto"
  const generatePlaceholder = (productName) => {
    const placeholders = [
      `Este ${productName} es una pieza única de nuestra colección retro.`,
      `Diseño vintage: ${productName} combina funcionalidad y estilo retro.`,
      `Edición limitada: ${productName} ha sido verificado para garantizar autenticidad.`,
      `Exclusivo: Solo disponemos de unidades limitadas de ${productName}.`
    ];
    // Elijo uno al azar
    return placeholders[Math.floor(Math.random() * placeholders.length)];
  };

  // Si está cargando, muestro pantalla de carga
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Cargando detalles del producto...</p>
      </div>
    );
  }

  // Si hay error o no encontré el producto, muestro mensaje y botón para volver
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

  // Renderizo los detalles del producto
  return (
    <div className="product-details-container">
      <div className="product-image-section">
        {/* Muestro la imagen del producto, si falla uso un placeholder */}
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
        {/* Título del producto */}
        <h1 className="product-title">{product.name}</h1>
        
        {/* Precio y SKU */}
        <div className="price-section">
          <span className="price">${product.price.toLocaleString('es-AR')}</span>
          <span className="sku">SKU: {product.sku}</span>
        </div>

        {/* Descripción del producto */}
        <div className="description-section">
          <h3>Descripción</h3>
          <p>{product.description}</p>
        </div>

        {/* Detalles técnicos */}
        <div className="technical-details">
          <h3>Detalles técnicos</h3>
          <ul>
            <li><strong>Material:</strong> {product.material || 'Varios componentes'}</li>
            <li><strong>Dimensiones:</strong> {product.dimensions || '30x20x15 cm'}</li>
            <li><strong>Garantía:</strong> {product.warranty || '1 año'}</li>
          </ul>
        </div>

        {/* Sección exclusiva con texto generado */}
        <div className="exclusive-details">
          <h3>Sobre este producto</h3>
          <p>{generatePlaceholder(product.name)}</p>
        </div>

        {/* Botones de acción */}
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
