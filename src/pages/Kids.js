import React from 'react';
import { PageLayout } from '../components/PageLayout';

const Kids = () => {
  const products = [
    {
      id: 1,
      name: "Kids' Swimsuit Set",
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1595950653106-6d9cd48834d6?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 2,
      name: "Kids' Swim Trunks",
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 3,
      name: "Kids' Swim Vest",
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1519494203044-1d0a0f5082b4?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 4,
      name: "Kids' Swim Goggles",
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1505740423-1d2b918644d4?w=500&auto=format&fit=crop&q=60',
    },
  ];

  return (
    <PageLayout 
      title="Kids' Collection"
      breadcrumbs={[{ to: '/', label: 'Home' }]}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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

export default Kids;
