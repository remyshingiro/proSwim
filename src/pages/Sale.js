import React from 'react';
import { PageLayout } from '../components/PageLayout';

const Sale = () => {
  const products = [
    {
      id: 1,
      name: "Classic Swim Goggles",
      price: 19.99,
      originalPrice: 29.99,
      discount: '33%',
      image: 'https://images.unsplash.com/photo-1505740423-1d2b918644d4?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 2,
      name: "Training Fins",
      price: 34.99,
      originalPrice: 49.99,
      discount: '30%',
      image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 3,
      name: "Swim Cap Set",
      price: 12.99,
      originalPrice: 19.99,
      discount: '35%',
      image: 'https://images.unsplash.com/photo-1526403228403-6d7a0a7f8a0c?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 4,
      name: "Beach Towel",
      price: 24.99,
      originalPrice: 34.99,
      discount: '29%',
      image: 'https://images.unsplash.com/photo-1576566598028-4147f3842f27?w=500&auto=format&fit=crop&q=60',
    },
  ];

  return (
    <PageLayout 
      title="Sale"
      breadcrumbs={[{ to: '/', label: 'Home' }]}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">End of Season Sale</h2>
        <p className="text-gray-600">Huge discounts on selected items. Limited time offer!</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {product.discount} OFF
            </div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
              <div className="mt-1">
                <span className="text-lg font-bold text-red-600">${product.price.toFixed(2)}</span>
                <span className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                <span className="ml-2 text-sm font-medium text-red-500">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
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

export default Sale;
