import React from 'react';
import { Link } from 'react-router-dom';

export const PageLayout = ({ children, title, breadcrumbs = [] }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-4">
            <Link to="/" className="text-gray-500 hover:text-blue-600">
              Home
            </Link>
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={item.to}>
                <span className="text-gray-300">/</span>
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-700 font-medium">{item.label}</span>
                ) : (
                  <Link to={item.to} className="text-blue-600 hover:underline">
                    {item.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        </div>
      </div>

      {/* Page Content */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
