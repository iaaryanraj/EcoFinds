# EcoFinds - Sustainable Second-Hand Marketplace

EcoFinds is a React-based web application that serves as a sustainable second-hand marketplace, allowing users to buy and sell pre-owned goods while promoting environmental consciousness and circular economy principles.

## Features

### Core Functionality
- **User Authentication**: Secure registration and login system
- **Product Management**: Create, read, update, and delete product listings
- **Product Browsing**: Browse available products with search and filtering capabilities
- **Shopping Cart**: Add products to cart and purchase functionality
- **Purchase History**: Track previously purchased items
- **User Dashboard**: Manage profile information

### Product Features
- Product listing with title, description, category, price, and image
- Category-based filtering (Electronics, Clothing, Books, Home & Garden, Sports, Toys, Automotive, Other)
- Keyword search functionality
- Product detail view
- Image placeholder support

### User Experience
- Responsive design for desktop and mobile
- Intuitive navigation
- Real-time cart updates
- Profile management
- Purchase tracking

## Technology Stack

- **Frontend**: React 19.1.1 with TypeScript
- **Routing**: React Router DOM
- **Styling**: CSS3 with custom responsive design
- **Storage**: Local Storage for data persistence
- **Build Tool**: React Scripts

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd EcoFinds
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (irreversible)

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.tsx      # Navigation header
│   └── ProductCard.tsx # Product display card
├── context/            # React context providers
│   ├── AuthContext.tsx # User authentication
│   └── ProductContext.tsx # Product management
├── pages/              # Main application pages
│   ├── LoginPage.tsx   # Authentication
│   ├── HomePage.tsx    # Product browsing
│   ├── AddProductPage.tsx # Product creation
│   ├── MyListingsPage.tsx # User's products
│   ├── ProductDetailPage.tsx # Product details
│   ├── UserDashboard.tsx # Profile management
│   ├── CartPage.tsx    # Shopping cart
│   └── PurchaseHistoryPage.tsx # Purchase history
├── types/              # TypeScript definitions
└── App.tsx            # Main application component
```

## Usage

### Getting Started
1. Register a new account or login with existing credentials
2. Browse available products on the homepage
3. Use search and category filters to find specific items
4. Click on products to view detailed information
5. Add items to your cart
6. Manage your own product listings

### Adding Products
1. Navigate to "Add New Product" from the homepage or listings page
2. Fill in product details (title, description, category, price)
3. Optionally add an image URL
4. Submit the listing

### Managing Listings
1. Go to "My Listings" to view your products
2. Edit or delete existing listings
3. Track which items are available or sold

### Shopping
1. Add items to your cart from product listings or detail pages
2. View and manage cart contents
3. Purchase all items in cart
4. View purchase history

## Data Storage

The application uses browser localStorage for data persistence:
- User accounts and authentication
- Product listings
- Shopping cart contents
- Purchase history

**Note**: Data is stored locally and will be lost if browser data is cleared.

## Design Philosophy

EcoFinds promotes sustainable consumption through:
- **Circular Economy**: Extending product lifecycles through reuse
- **Environmental Impact**: Reducing waste and new product demand
- **Community Building**: Connecting conscious consumers
- **Accessibility**: Easy-to-use platform for all users

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React team for the excellent framework
- Contributors to the open-source community
- Environmental advocates promoting sustainable practices

## Contact

For questions or support, please contact the development team.

---

**EcoFinds** - Empowering sustainable consumption through technology.
