import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiHeart, FiMenu, FiX, FiStar, FiChevronDown, FiFilter } from 'react-icons/fi';

// Import pages
import Home from './pages/Home';
import Men from './pages/Men';
import Women from './pages/Women';
import Kids from './pages/Kids';
import NewArrivals from './pages/NewArrivals';
import Sale from './pages/Sale';
import Brands from './pages/Brands';
import TrackOrder from './pages/TrackOrder';
import Contact from './pages/Contact';
import StoreLocator from './pages/StoreLocator';
import PageNotFound from './pages/PageNotFound';

const products = [
  {
    id: 1,
    name: "Pro Swim Goggles",
    description: "High-quality goggles with anti-fog and UV protection.",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.8,
    reviewCount: 124,
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    category: "Accessories",
    colors: ["#2563eb", "#1e40af", "#1e1b4b"],
    sizes: ["S/M", "L/XL"],
    isNew: true,
    isOnSale: true,
  },
  {
    id: 2,
    name: "Elite Competition Swim Cap",
    description: "Professional-grade silicone cap for competitive swimmers.",
    price: 14.99,
    originalPrice: 19.99,
    rating: 4.6,
    reviewCount: 89,
    imageUrl: "https://images.unsplash.com/photo-1526403228403-6d7a0a7f8a0c?auto=format&fit=crop&w=800&q=80",
    category: "Accessories",
    colors: ["#dc2626", "#1e40af", "#000000"],
    sizes: ["One Size"],
    isNew: false,
    isOnSale: true,
  },
  {
    id: 3,
    name: "Training Fins",
    description: "Improve your swim technique with these professional training fins.",
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.7,
    reviewCount: 156,
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=80",
    category: "Training Gear",
    colors: ["#16a34a", "#1e40af"],
    sizes: ["S/M", "L/XL", "XXL"],
    isNew: true,
    isOnSale: false,
  },
  {
    id: 4,
    name: "Competition Swim Brief",
    description: "High-performance brief for competitive swimming.",
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.9,
    reviewCount: 210,
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    category: "Swimwear",
    colors: ["#000000", "#1e40af", "#dc2626"],
    sizes: ["28", "30", "32", "34"],
    isNew: false,
    isOnSale: true,
  },
  {
    id: 5,
    name: "Pull Buoy",
    description: "Essential training tool for improving upper body strength and technique.",
    price: 12.99,
    originalPrice: 17.99,
    rating: 4.5,
    reviewCount: 78,
    imageUrl: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=80",
    category: "Training Gear",
    colors: ["#1e40af", "#dc2626"],
    sizes: ["Standard"],
    isNew: false,
    isOnSale: false,
  },
  {
    id: 6,
    name: "Swim Parka",
    description: "Stay warm and dry between races with this premium swim parka.",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviewCount: 142,
    imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704c?auto=format&fit=crop&w=800&q=80",
    category: "Apparel",
    colors: ["#1e1b4b", "#000000"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isOnSale: true,
  },
];

const categories = [
  { name: "All Categories", count: products.length },
  { name: "Swimwear", count: products.filter(p => p.category === "Swimwear").length },
  { name: "Training Gear", count: products.filter(p => p.category === "Training Gear").length },
  { name: "Accessories", count: products.filter(p => p.category === "Accessories").length },
  { name: "Apparel", count: products.filter(p => p.category === "Apparel").length },
];

const sizes = ["S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "S/M", "L/XL", "One Size", "Standard"];

// Navigation component
const Navigation = ({ mobile = false }) => {
  const location = useLocation();
  const navItems = [
    { to: '/men', label: 'Men' },
    { to: '/women', label: 'Women' },
    { to: '/kids', label: 'Kids' },
    { to: '/new-arrivals', label: 'New Arrivals' },
    { to: '/sale', label: 'Sale' },
    { to: '/brands', label: 'Brands' },
  ];

  const baseClasses = mobile 
    ? 'block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100'
    : 'px-3 py-2 font-medium hover:text-blue-600';
  
  const activeClasses = mobile 
    ? 'bg-blue-50 text-blue-700' 
    : 'text-blue-600 border-b-2 border-blue-600';

  return (
    <>
      {navItems.map((item) => {
        const isActive = location.pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`${baseClasses} ${isActive ? activeClasses : 'text-gray-700'}`}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
};

// Main App component
function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products
    .filter(product => selectedCategory === "All Categories" || product.category === selectedCategory)
    .filter(product => product.price >= priceRange[0] && product.price <= priceRange[1])
    .filter(product => selectedSizes.length === 0 || product.sizes.some(size => selectedSizes.includes(size)))
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-low-high") return a.price - b.price;
      if (sortBy === "price-high-low") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured (default)
    });

  const toggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>Free shipping on orders over $50</div>
          <div className="hidden md:flex space-x-4">
            <Link to="/track-order" className="hover:underline">Track Order</Link>
            <Link to="/contact" className="hover:underline">Contact Us</Link>
            <Link to="/store-locator" className="hover:underline">Store Locator</Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                className="md:hidden p-2 -ml-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
              <Link to="/" className="text-2xl font-bold text-blue-900">SwimmingClubRwanda</Link>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              <Navigation />
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-64 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch className="absolute right-3 top-2.5 text-gray-400" />
              </div>
              <button className="p-2 text-gray-700 hover:text-blue-600">
                <FiUser size={20} />
              </button>
              <button className="p-2 text-gray-700 hover:text-blue-600">
                <FiHeart size={20} />
              </button>
              <button className="p-2 text-gray-700 hover:text-blue-600 relative">
                <FiShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute right-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Navigation mobile />
            </div>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/store-locator" element={<StoreLocator />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h2 className="font-bold text-lg mb-4 flex items-center">
                <FiFilter className="mr-2" /> Filters
              </h2>
              
              <div className="mb-6">
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.name} className="flex items-center">
                      <input
                        type="radio"
                        id={`cat-${category.name}`}
                        name="category"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        checked={selectedCategory === category.name}
                        onChange={() => setSelectedCategory(category.name)}
                      />
                      <label htmlFor={`cat-${category.name}`} className="ml-3 text-sm text-gray-700">
                        {category.name} <span className="text-gray-400">({category.count})</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="150"
                    step="5"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`px-3 py-1 text-sm rounded-full border ${
                        selectedSizes.includes(size)
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                      }`}
                      onClick={() => toggleSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md text-sm font-medium transition-colors"
                onClick={() => {
                  setSelectedCategory("All Categories");
                  setPriceRange([0, 150]);
                  setSelectedSizes([]);
                }}
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <p className="text-gray-600 mb-4 sm:mb-0">
                Showing <span className="font-medium">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'item' : 'items'}
              </p>
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-sm text-gray-600">Sort by:</label>
                <select
                  id="sort"
                  className="border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                <button 
                  className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  onClick={() => {
                    setSelectedCategory("All Categories");
                    setPriceRange([0, 150]);
                    setSelectedSizes([]);
                    setSearchQuery("");
                  }}
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="relative">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-64 object-cover"
                      />
                      {product.isOnSale && (
                        <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                          SALE
                        </div>
                      )}
                      {product.isNew && (
                        <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                          NEW
                        </div>
                      )}
                      <button className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                        <FiHeart className="text-gray-600" />
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center mb-1">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <FiStar 
                              key={i} 
                              fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                              className="w-4 h-4"
                            />
                          ))}
                        </div>
                        <span className="ml-1 text-xs text-gray-500">({product.reviewCount})</span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-gray-900">{formatPrice(product.price)}</span>
                          {product.originalPrice > product.price && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                          Add to Cart
                        </button>
                      </div>
                      <div className="mt-3 flex items-center text-xs text-gray-500">
                        <span className="mr-2">Sizes:</span>
                        <div className="flex space-x-1">
                          {product.sizes.map((size, i) => (
                            <span key={i} className="px-1.5 py-0.5 border border-gray-200 rounded">
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Newsletter Section */}
      <section className="bg-gray-50 py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated</h2>
          <p className="text-gray-600 mb-6">Subscribe to our newsletter for the latest products and exclusive offers</p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-r-md font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-medium mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Men's Swimwear</a></li>
                <li><a href="#" className="hover:text-white">Women's Swimwear</a></li>
                <li><a href="#" className="hover:text-white">Kids' Swimwear</a></li>
                <li><a href="#" className="hover:text-white">Accessories</a></li>
                <li><a href="#" className="hover:text-white">Training Gear</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
                <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-white">Size Guide</a></li>
                <li><a href="#" className="hover:text-white">Track Order</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">About Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Our Story</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Store Locator</a></li>
                <li><a href="#" className="hover:text-white">Wholesale</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Connect With Us</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.415-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.415-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
              <p className="text-sm">Sign up for our newsletter</p>
              <div className="mt-2 flex">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 px-3 py-2 border border-gray-700 bg-gray-800 text-white text-sm rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-r-md text-sm">
                  Sign up
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-gray-400 text-center">
            <p>&copy; 2025 SwimmingClubRwanda. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
