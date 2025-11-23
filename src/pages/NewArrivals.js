import React from 'react';
import { PageLayout } from '../components/PageLayout';

const NewArrivals = () => {
  const products = [
    {
      id: 1,
      name: "Premium Swim Goggles Pro",
      price: 34.99,
      originalPrice: 44.99,
      image: 'https://images.unsplash.com/photo-1505740423-1d2b918644d4?w=500&auto=format&fit=crop&q=60',
      isNew: true,
    },
    {
      id: 2,
      name: "Elite Competition Swim Cap",
      price: 19.99,
      originalPrice: 24.99,
      image: 'https://images.unsplash.com/photo-1526403228403-6d7a0a7f8a0c?w=500&auto=format&fit=crop&q=60',
      isNew: true,
    },
    {
      id: 3,
      name: "Training Fins Pro",
      price: 49.99,
      originalPrice: 59.99,
      image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=500&auto=format&fit=crop&q=60',
      isNew: true,
    },
    {
      id: 4,
      name: "Performance Swim Trunks",
      price: 39.99,
      originalPrice: 49.99,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb0c9f3?w=500&auto=format&fit=crop&q=60',
      isNew: true,
    },
  ];

  return (
    <PageLayout 
      title="New Arrivals"
      breadcrumbs={[{ to: '/', label: 'Home' }]}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Latest Products</h2>
        <p className="text-gray-600">Discover our newest collection of swimming gear and accessories.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
            {product.isNew && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                NEW
              </div>
            )}
            {product.originalPrice > product.price && (
              <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                SALE
              </div>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
              <div className="mt-1 flex items-center">
                {product.originalPrice > product.price ? (
                  <>
                    <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <span className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                )}
              </div>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default NewArrivals;
