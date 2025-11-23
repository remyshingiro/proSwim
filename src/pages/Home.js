import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/PageLayout';

const Home = () => {
  return (
    <PageLayout title="Welcome to SwimmingClubRwanda">
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Discover Our Latest Collection
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Find the perfect swimming gear for your next aquatic adventure. 
          We offer high-quality products for swimmers of all levels.
        </p>
        <Link
          to="/new-arrivals"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          Shop New Arrivals
        </Link>
      </div>
      
      {/* Featured Categories */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { name: 'Men', to: '/men', image: 'https://images.unsplash.com/photo-1515886653613-0348d8d2e8c0?w=500&auto=format&fit=crop&q=60' },
          { name: 'Women', to: '/women', image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&auto=format&fit=crop&q=60' },
          { name: 'Kids', to: '/kids', image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=500&auto=format&fit=crop&q=60' },
        ].map((category) => (
          <Link
            key={category.name}
            to={category.to}
            className="relative rounded-lg overflow-hidden group"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-white">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
};

export default Home;
