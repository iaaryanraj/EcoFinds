import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { Product, Category } from '../types';
import { Link } from 'react-router-dom';
import './HomePage.css';

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

const HomePage: React.FC = () => {
  const { products, searchProducts, filterByCategory, resetToSampleData } = useProducts();
  const [displayProducts, setDisplayProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    setDisplayProducts(products);
  }, [products]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const results = searchProducts(searchQuery.trim());
      setDisplayProducts(results);
      setSelectedCategory('');
    } else {
      setDisplayProducts(products);
    }
  };

  const handleCategoryFilter = (category: string) => {
    if (category === selectedCategory) {
      // If same category clicked, show all products
      setSelectedCategory('');
      setDisplayProducts(products);
    } else {
      setSelectedCategory(category);
      const filtered = filterByCategory(category);
      setDisplayProducts(filtered);
      setSearchQuery('');
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setDisplayProducts(products);
  };

  return (
    <div className="home-page">
      <Header />
      
      <main className="main-content">
        <div className="search-section">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              Search
            </button>
            <button 
              type="button" 
              className="reset-btn" 
              onClick={() => {
                resetToSampleData();
                window.location.reload();
              }}
              style={{
                marginLeft: '10px',
                padding: '8px 16px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Refresh Products
            </button>
          </form>
        </div>

        <div className="filter-section">
          <h3>Categories</h3>
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </button>
            ))}
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>

        <div className="products-header">
          <h2>
            {selectedCategory ? `${selectedCategory} Products` : 
             searchQuery ? `Search Results for "${searchQuery}"` : 
             'All Products'}
          </h2>
          <Link to="/add-product" className="add-product-btn">
            + Add New Product
          </Link>
        </div>

        <div className="products-grid">
          {displayProducts.length > 0 ? (
            displayProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="no-products">
              <p>No products found.</p>
              {!searchQuery && !selectedCategory && (
                <Link to="/add-product" className="add-first-product">
                  Be the first to add a product!
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
