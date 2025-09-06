import React from 'react';
import Header from '../components/Header';
import { useProducts } from '../context/ProductContext';
import { useCurrency } from '../context/CurrencyContext';
import './CartPage.css';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, purchaseCart } = useProducts();
  const { formatPrice } = useCurrency();

  const totalAmount = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  const handlePurchase = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    if (window.confirm(`Are you sure you want to purchase all items for ${formatPrice(totalAmount)}?`)) {
      purchaseCart();
      alert('Purchase successful! Check your purchase history.');
    }
  };

  return (
    <div className="cart-page">
      <Header />
      
      <main className="main-content">
        <div className="cart-container">
          <div className="cart-header">
            <h1>Shopping Cart</h1>
            <p>{cart.length} item(s) in cart</p>
          </div>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <a href="/" className="continue-shopping">
                Continue Shopping
              </a>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img 
                        src={item.product.imageUrl || '/placeholder-image.jpg'} 
                        alt={item.product.title}
                      />
                    </div>
                    
                    <div className="item-details">
                      <h3>{item.product.title}</h3>
                      <p className="item-category">{item.product.category}</p>
                      <p className="item-description">{item.product.description}</p>
                    </div>
                    
                    <div className="item-price">
                      <p className="price">{formatPrice(item.product.price)}</p>
                      <p className="quantity">Qty: {item.quantity}</p>
                    </div>
                    
                    <div className="item-total">
                      <p className="total">{formatPrice(item.product.price * item.quantity)}</p>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.productId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-details">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                  <div className="summary-row total-row">
                    <span>Total:</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                </div>
                
                <button 
                  className="purchase-btn"
                  onClick={handlePurchase}
                >
                  Purchase All Items
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default CartPage;
