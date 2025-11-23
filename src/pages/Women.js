import React from 'react';
import { PageLayout } from '../components/PageLayout';

const Women = () => {
  const products = [
    {
      id: 1,
      name: "Women's One-Piece Swimsuit",
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 2,
      name: "Women's Bikini Set",
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 3,
      name: "Women's Swim Cover-Up",
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 4,
      name: "Women's Swim Cap",
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1515886653613-0348d8d2e8c0?w=500&auto=format&fit=crop&q=60',
    },
  ];

  return (
    <PageLayout 
      title="Women's Collection"
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

export default Women;
