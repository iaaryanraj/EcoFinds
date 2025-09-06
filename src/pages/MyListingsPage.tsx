import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { Product, Category } from '../types';
import './MyListingsPage.css';

const categories: Category[] = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports',
  'Toys',
  'Automotive',
  'Other'
];

const MyListingsPage: React.FC = () => {
  const { myProducts, updateProduct, deleteProduct } = useProducts();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    imageUrl: ''
  });
  const navigate = useNavigate();

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price.toString(),
      imageUrl: product.imageUrl
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateProduct(editingProduct.id, {
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category as Category,
      price: parseFloat(formData.price),
      imageUrl: formData.imageUrl.trim() || '/placeholder-image.jpg'
    });

    setEditingProduct(null);
    setFormData({
      title: '',
      description: '',
      category: '',
      price: '',
      imageUrl: ''
    });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setFormData({
      title: '',
      description: '',
      category: '',
      price: '',
      imageUrl: ''
    });
  };

  return (
    <div className="my-listings-page">
      <Header />
      
      <main className="main-content">
        <div className="page-header">
          <h1>My Listings</h1>
          <button 
            className="add-product-btn"
            onClick={() => navigate('/add-product')}
          >
            + Add New Product
          </button>
        </div>

        {editingProduct && (
          <div className="edit-modal-overlay">
            <div className="edit-modal">
              <h2>Edit Product</h2>
              <form onSubmit={handleSaveEdit}>
                <div className="form-group">
                  <label htmlFor="edit-title">Product Title</label>
                  <input
                    type="text"
                    id="edit-title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-category">Category</label>
                  <select
                    id="edit-category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="edit-description">Description</label>
                  <textarea
                    id="edit-description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-price">Price ($)</label>
                  <input
                    type="number"
                    id="edit-price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-imageUrl">Image URL</label>
                  <input
                    type="url"
                    id="edit-imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" onClick={handleCancelEdit} className="cancel-btn">
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="listings-grid">
          {myProducts.length > 0 ? (
            myProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                showActions={true}
                onEdit={handleEdit}
                onDelete={deleteProduct}
              />
            ))
          ) : (
            <div className="no-listings">
              <p>You haven't listed any products yet.</p>
              <button 
                className="add-first-product"
                onClick={() => navigate('/add-product')}
              >
                Add Your First Product
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyListingsPage;
