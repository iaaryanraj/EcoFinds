import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useProducts } from '../context/ProductContext';
import { useCurrency } from '../context/CurrencyContext';
import './ProductDetailPage.css';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart } = useProducts();
  const { formatPrice } = useCurrency();
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="product-detail-page">
        <Header />
        <main className="main-content">
          <div className="not-found">
            <h2>Product Not Found</h2>
            <p>The product you're looking for doesn't exist or has been removed.</p>
            <button onClick={() => navigate('/')} className="back-home-btn">
              Back to Home
            </button>
          </div>
        </main>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product.id);
    // Show success message or navigate to cart
    alert('Product added to cart!');
  };

  return (
    <div className="product-detail-page">
      <Header />
      
      <main className="main-content">
        <div className="product-detail-container">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>

          <div className="product-detail-content">
            <div className="product-image-section">
              <img 
                src={product.imageUrl || '/placeholder-image.jpg'} 
                alt={product.title}
                className="product-image-large"
              />
            </div>

            <div className="product-info-section">
              <h1 className="product-title">{product.title}</h1>
              <p className="product-price">{formatPrice(product.price)}</p>
              <p className="product-category">Category: {product.category}</p>
              
              <div className="product-description">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>

              <div className="product-meta">
                <p>Posted: {new Date(product.createdAt).toLocaleDateString()}</p>
                <p>Status: {product.isAvailable ? 'Available' : 'Sold'}</p>
              </div>

              {product.isAvailable && (
                <div className="product-actions">
                  <button 
                    className="add-to-cart-btn-large"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                </div>
              )}

              {!product.isAvailable && (
                <div className="sold-notice">
                  <p>This item has been sold</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;
