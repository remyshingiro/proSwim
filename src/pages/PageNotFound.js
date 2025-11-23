import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/PageLayout';
import { FiArrowLeft, FiHome, FiSearch, FiShoppingCart } from 'react-icons/fi';

const PageNotFound = () => {
  return (
    <PageLayout 
      title="Page Not Found"
      breadcrumbs={[{ to: '/', label: 'Home' }]}
    >
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h1 className="text-6xl font-extrabold text-gray-900 sm:text-7xl">
          404
        </h1>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Page not found
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Sorry, we couldn't find the page you're looking for. The page may have been moved or doesn't exist.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiHome className="mr-2" />
            Go back home
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiSearch className="mr-2" />
            Browse products
          </Link>
        </div>
        
        <div className="mt-12">
          <h3 className="text-sm font-medium text-gray-900">Popular pages</h3>
          <ul className="mt-4 space-y-3">
            {[
              { name: 'Men', to: '/men' },
              { name: 'Women', to: '/women' },
              { name: 'Kids', to: '/kids' },
              { name: 'New Arrivals', to: '/new-arrivals' },
              { name: 'Sale', to: '/sale' },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  to={item.to}
                  className="text-base text-blue-600 hover:text-blue-500 flex items-center justify-center sm:justify-start"
                >
                  <FiArrowLeft className="mr-2 h-4 w-4" />
                  {item.name} Collection
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h3 className="text-sm font-medium text-gray-900">Still can't find what you're looking for?</h3>
          <p className="mt-2 text-base text-gray-600">
            Contact our customer support team for assistance.
          </p>
          <div className="mt-4">
            <Link
              to="/contact"
              className="inline-flex items-center text-base font-medium text-blue-600 hover:text-blue-500"
            >
              Contact Support
              <svg className="ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PageNotFound;
