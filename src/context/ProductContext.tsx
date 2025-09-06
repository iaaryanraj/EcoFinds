import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Purchase, ProductContextType } from '../types';
import { useAuth } from './AuthContext';

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

// Sample products to populate the marketplace
const sampleProducts: Product[] = [
  {
    id: '1',
    title: 'Vintage Blue Denim T-Shirt',
    description: 'Classic vintage blue denim t-shirt in excellent condition. Perfect for casual wear, made from 100% cotton. Size M.',
    category: 'Clothing',
    price: 15.99,
    imageUrl: 'https://cdn.pixabay.com/photo/2016/12/06/09/31/blank-1886008_1280.png',
    sellerId: 'sample1',
    createdAt: new Date('2024-01-15'),
    isAvailable: true
  },
  {
    id: '2',
    title: 'Organic Cotton White T-Shirt',
    description: 'Sustainable organic cotton white t-shirt. Eco-friendly and comfortable. Size L. Perfect for everyday wear.',
    category: 'Clothing',
    price: 12.50,
    imageUrl: 'https://cdn.pixabay.com/photo/2016/12/06/09/30/blank-1886001_1280.png',
    sellerId: 'sample2',
    createdAt: new Date('2024-01-20'),
    isAvailable: true
  },
  {
    id: '3',
    title: 'iPhone 12 Pro - Excellent Condition',
    description: 'iPhone 12 Pro 128GB in excellent condition. Screen protector and case included. Battery health 89%.',
    category: 'Electronics',
    price: 549.99,
    imageUrl: 'https://cdn.pixabay.com/photo/2020/10/20/08/40/iphone-5668707_1280.jpg',
    sellerId: 'sample3',
    createdAt: new Date('2024-02-01'),
    isAvailable: true
  },
  {
    id: '4',
    title: 'JavaScript Programming Book Set',
    description: 'Complete set of JavaScript programming books including ES6 features. Great for beginners and advanced developers.',
    category: 'Books',
    price: 35.00,
    imageUrl: 'https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_1280.jpg',
    sellerId: 'sample4',
    createdAt: new Date('2024-02-05'),
    isAvailable: true
  },
  {
    id: '5',
    title: 'Retro Gaming Console with Games',
    description: 'Classic retro gaming console with 20 built-in games. Perfect for nostalgia gaming sessions.',
    category: 'Electronics',
    price: 89.99,
    imageUrl: 'https://cdn.pixabay.com/photo/2018/05/10/11/34/concert-3387324_1280.jpg',
    sellerId: 'sample5',
    createdAt: new Date('2024-02-10'),
    isAvailable: true
  },
  {
    id: '6',
    title: 'Designer Red T-Shirt - Brand New',
    description: 'Designer red t-shirt with unique pattern. Never worn, tags still attached. Size S.',
    category: 'Clothing',
    price: 28.99,
    imageUrl: 'https://cdn.pixabay.com/photo/2016/12/06/09/30/blank-1886006_1280.png',
    sellerId: 'sample6',
    createdAt: new Date('2024-02-15'),
    isAvailable: true
  },
  {
    id: '7',
    title: 'Indoor Plant Collection',
    description: 'Beautiful collection of 3 indoor plants perfect for home decoration. Includes pots and care instructions.',
    category: 'Home & Garden',
    price: 42.00,
    imageUrl: 'https://cdn.pixabay.com/photo/2016/11/21/16/05/cactus-1846147_1280.jpg',
    sellerId: 'sample7',
    createdAt: new Date('2024-02-20'),
    isAvailable: true
  },
  {
    id: '8',
    title: 'Professional Tennis Racket',
    description: 'Professional-grade tennis racket used by intermediate players. Excellent grip and balance.',
    category: 'Sports',
    price: 125.00,
    imageUrl: 'https://cdn.pixabay.com/photo/2013/07/12/18/20/tennis-153271_1280.png',
    sellerId: 'sample8',
    createdAt: new Date('2024-02-25'),
    isAvailable: true
  }
];

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    // Load data from localStorage or initialize with sample data
    const savedProducts = localStorage.getItem('ecofinds_products');
    if (savedProducts) {
      const existingProducts = JSON.parse(savedProducts);
      // If no products exist, add sample products
      if (existingProducts.length === 0) {
        setProducts(sampleProducts);
        localStorage.setItem('ecofinds_products', JSON.stringify(sampleProducts));
      } else {
        setProducts(existingProducts);
      }
    } else {
      // Initialize with sample products
      setProducts(sampleProducts);
      localStorage.setItem('ecofinds_products', JSON.stringify(sampleProducts));
    }

    if (user) {
      const savedCart = localStorage.getItem(`ecofinds_cart_${user.id}`);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }

      const savedPurchases = localStorage.getItem(`ecofinds_purchases_${user.id}`);
      if (savedPurchases) {
        setPurchases(JSON.parse(savedPurchases));
      }
    }
  }, [user]);

  const myProducts = products.filter(product => user && product.sellerId === user.id);

  const addProduct = (productData: Omit<Product, 'id' | 'sellerId' | 'createdAt'>) => {
    if (!user) return;

    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      sellerId: user.id,
      createdAt: new Date(),
      isAvailable: true
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('ecofinds_products', JSON.stringify(updatedProducts));
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, ...updates } : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('ecofinds_products', JSON.stringify(updatedProducts));
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('ecofinds_products', JSON.stringify(updatedProducts));
  };

  const addToCart = (productId: string) => {
    if (!user) return;

    const product = products.find(p => p.id === productId);
    if (!product || !product.isAvailable) return;

    const existingItem = cart.find(item => item.productId === productId);
    let updatedCart: CartItem[];

    if (existingItem) {
      updatedCart = cart.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      const newCartItem: CartItem = {
        id: Date.now().toString(),
        productId,
        product,
        quantity: 1,
        addedAt: new Date()
      };
      updatedCart = [...cart, newCartItem];
    }

    setCart(updatedCart);
    localStorage.setItem(`ecofinds_cart_${user.id}`, JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId: string) => {
    if (!user) return;

    const updatedCart = cart.filter(item => item.productId !== productId);
    setCart(updatedCart);
    localStorage.setItem(`ecofinds_cart_${user.id}`, JSON.stringify(updatedCart));
  };

  const purchaseCart = () => {
    if (!user || cart.length === 0) return;

    const newPurchases = cart.map(item => ({
      id: Date.now().toString() + Math.random(),
      userId: user.id,
      productId: item.productId,
      product: item.product,
      purchaseDate: new Date(),
      totalAmount: item.product.price * item.quantity
    }));

    const updatedPurchases = [...purchases, ...newPurchases];
    setPurchases(updatedPurchases);
    localStorage.setItem(`ecofinds_purchases_${user.id}`, JSON.stringify(updatedPurchases));

    // Mark products as unavailable
    const cartProductIds = cart.map(item => item.productId);
    const updatedProducts = products.map(product =>
      cartProductIds.includes(product.id)
        ? { ...product, isAvailable: false }
        : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('ecofinds_products', JSON.stringify(updatedProducts));

    // Clear cart
    setCart([]);
    localStorage.removeItem(`ecofinds_cart_${user.id}`);
  };

  const searchProducts = (query: string): Product[] => {
    return products.filter(product =>
      product.isAvailable &&
      (product.title.toLowerCase().includes(query.toLowerCase()) ||
       product.description.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const filterByCategory = (category: string): Product[] => {
    return products.filter(product =>
      product.isAvailable && product.category === category
    );
  };

  const resetToSampleData = () => {
    setProducts(sampleProducts);
    localStorage.setItem('ecofinds_products', JSON.stringify(sampleProducts));
  };

  const value: ProductContextType = {
    products: products.filter(p => p.isAvailable),
    myProducts,
    cart,
    purchases,
    addProduct,
    updateProduct,
    deleteProduct,
    addToCart,
    removeFromCart,
    purchaseCart,
    searchProducts,
    filterByCategory,
    resetToSampleData
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
