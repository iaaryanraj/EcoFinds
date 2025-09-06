import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useProducts } from '../context/ProductContext';
import { Category } from '../types';
import './AddProductPage.css';

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

const AddProductPage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    imageUrl: ''
  });
  const [error, setError] = useState('');
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.title.trim()) {
      setError('Product title is required');
      return;
    }
    if (!formData.description.trim()) {
      setError('Product description is required');
      return;
    }
    if (!formData.category) {
      setError('Please select a category');
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError('Please enter a valid price');
      return;
    }

    try {
      addProduct({
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category as Category,
        price: parseFloat(formData.price),
        imageUrl: formData.imageUrl.trim() || '/placeholder-image.jpg',
        isAvailable: true
      });

      navigate('/my-listings');
    } catch (err) {
      setError('Failed to add product. Please try again.');
    }
  };

  return (
    <div className="add-product-page">
      <Header />
      
      <main className="main-content">
        <div className="add-product-container">
          <div className="page-header">
            <button className="back-btn" onClick={() => navigate(-1)}>
              ← Back
            </button>
            <h1>Add New Product</h1>
          </div>

          <form className="add-product-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="title">Product Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter product title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your product..."
                rows={4}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price ($) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="imageUrl">Image URL (Optional)</label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="Enter image URL or leave blank for placeholder"
              />
              <small className="form-help">
                + Add Image (Placeholder) - You can add an image URL or leave blank for a placeholder image
              </small>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Submit Listing
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddProductPage;
