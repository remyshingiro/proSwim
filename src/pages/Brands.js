import React from 'react';
import { PageLayout } from '../components/PageLayout';

const Brands = () => {
  const brands = [
    {
      id: 1,
      name: 'Speedo',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Speedo_logo.svg/1280px-Speedo_logo.svg.png',
      description: 'The world\'s leading swimwear brand, trusted by professional swimmers worldwide.'
    },
    {
      id: 2,
      name: 'Arena',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Arena_logo.svg/1280px-Arena_logo.svg.png',
      description: 'Innovative swimwear and equipment for competitive swimmers.'
    },
    {
      id: 3,
      name: 'TYR',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/TYR_Sport_Logo.svg/1280px-TYR_Sport_Logo.svg.png',
      description: 'Performance swimwear and gear designed for serious athletes.'
    },
    {
      id: 4,
      name: 'Mizuno',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Mizuno_logo.svg/1280px-Mizuno_logo.svg.png',
      description: 'High-quality sports equipment and swimwear with Japanese craftsmanship.'
    },
  ];

  return (
    <PageLayout 
      title="Our Brands"
      breadcrumbs={[{ to: '/', label: 'Home' }]}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Trusted by Swimmers Worldwide</h2>
        <p className="text-gray-600">We partner with the best brands in the industry to bring you top-quality swimming gear.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {brands.map((brand) => (
          <div key={brand.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="h-12 object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150x60?text=' + brand.name;
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{brand.name}</h3>
              <p className="text-gray-600 mb-4">{brand.description}</p>
              <a 
                href={`/brands/${brand.name.toLowerCase()}`}
                className="text-blue-600 hover:underline font-medium"
              >
                View {brand.name} Products →
              </a>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default Brands;
