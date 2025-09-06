export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  sellerId: string;
  createdAt: Date;
  isAvailable: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  addedAt: Date;
}

export interface Purchase {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  purchaseDate: Date;
  totalAmount: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

export interface ProductContextType {
  products: Product[];
  myProducts: Product[];
  cart: CartItem[];
  purchases: Purchase[];
  addProduct: (product: Omit<Product, 'id' | 'sellerId' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  purchaseCart: () => void;
  searchProducts: (query: string) => Product[];
  filterByCategory: (category: string) => Product[];
  resetToSampleData: () => void;
}

export type Category = 
  | 'Electronics'
  | 'Clothing'
  | 'Books'
  | 'Home & Garden'
  | 'Sports'
  | 'Toys'
  | 'Automotive'
  | 'Other';
