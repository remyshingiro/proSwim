import React from 'react';
import { PageLayout } from '../components/PageLayout';

const Men = () => {
  const products = [
    {
      id: 1,
      name: 'Men\'s Swim Trunks',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb0c9f3?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 2,
      name: 'Men\'s Rash Guard',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1515886653613-0348d8d2e8c0?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 3,
      name: 'Men\'s Swim Goggles',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=60',
    },
  ];

  return (
    <PageLayout 
      title="Men's Collection"
      breadcrumbs={[{ to: '/', label: 'Home' }]}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                ${product.price.toFixed(2)}
              </p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default Men;
