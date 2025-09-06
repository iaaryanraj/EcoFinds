import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CurrencyProvider } from './context/CurrencyContext';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AddProductPage from './pages/AddProductPage';
import MyListingsPage from './pages/MyListingsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import UserDashboard from './pages/UserDashboard';
import CartPage from './pages/CartPage';
import PurchaseHistoryPage from './pages/PurchaseHistoryPage';
import './App.css';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return !user ? <>{children}</> : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <ProductProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/login" element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                } />
                <Route path="/" element={
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                } />
                <Route path="/add-product" element={
                  <PrivateRoute>
                    <AddProductPage />
                  </PrivateRoute>
                } />
                <Route path="/my-listings" element={
                  <PrivateRoute>
                    <MyListingsPage />
                  </PrivateRoute>
                } />
                <Route path="/product/:id" element={
                  <PrivateRoute>
                    <ProductDetailPage />
                  </PrivateRoute>
                } />
                <Route path="/dashboard" element={
                  <PrivateRoute>
                    <UserDashboard />
                  </PrivateRoute>
                } />
                <Route path="/cart" element={
                  <PrivateRoute>
                    <CartPage />
                  </PrivateRoute>
                } />
                <Route path="/purchases" element={
                  <PrivateRoute>
                    <PurchaseHistoryPage />
                  </PrivateRoute>
                } />
              </Routes>
            </div>
          </Router>
        </ProductProvider>
      </CurrencyProvider>
    </AuthProvider>
  );
}

export default App;
