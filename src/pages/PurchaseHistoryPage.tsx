import React from 'react';
import Header from '../components/Header';
import { useProducts } from '../context/ProductContext';
import { useCurrency } from '../context/CurrencyContext';
import './PurchaseHistoryPage.css';

const PurchaseHistoryPage: React.FC = () => {
  const { purchases } = useProducts();
  const { formatPrice } = useCurrency();

  // Sort purchases by date (newest first)
  const sortedPurchases = [...purchases].sort((a, b) => 
    new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
  );

  const totalSpent = purchases.reduce((total, purchase) => total + purchase.totalAmount, 0);

  return (
    <div className="purchase-history-page">
      <Header />
      
      <main className="main-content">
        <div className="purchase-history-container">
          <div className="page-header">
            <h1>Purchase History</h1>
            <div className="purchase-stats">
              <p>{purchases.length} total purchases</p>
              <p>Total spent: {formatPrice(totalSpent)}</p>
            </div>
          </div>

          {sortedPurchases.length === 0 ? (
            <div className="no-purchases">
              <p>You haven't made any purchases yet.</p>
              <a href="/" className="start-shopping">
                Start Shopping
              </a>
            </div>
          ) : (
            <div className="purchases-list">
              {sortedPurchases.map(purchase => (
                <div key={purchase.id} className="purchase-item">
                  <div className="purchase-image">
                    <img 
                      src={purchase.product.imageUrl || '/placeholder-image.jpg'} 
                      alt={purchase.product.title}
                    />
                  </div>
                  
                  <div className="purchase-details">
                    <h3>{purchase.product.title}</h3>
                    <p className="purchase-category">{purchase.product.category}</p>
                    <p className="purchase-description">{purchase.product.description}</p>
                  </div>
                  
                  <div className="purchase-info">
                    <p className="purchase-price">{formatPrice(purchase.totalAmount)}</p>
                    <p className="purchase-date">
                      Purchased: {new Date(purchase.purchaseDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PurchaseHistoryPage;
