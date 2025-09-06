import React from 'react';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCurrency } from '../context/CurrencyContext';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  showActions?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showActions = false, 
  onEdit, 
  onDelete 
}) => {
  const { addToCart } = useProducts();
  const { formatPrice } = useCurrency();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit?.(product);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDelete?.(product.id);
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image">
        <img src={product.imageUrl || '/placeholder-image.jpg'} alt={product.title} />
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">{formatPrice(product.price)}</p>
        <p className="product-category">{product.category}</p>
      </div>

      <div className="product-actions">
        {showActions ? (
          <div className="owner-actions">
            <button className="edit-btn" onClick={handleEdit}>
              Edit
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              Delete
            </button>
          </div>
        ) : (
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
