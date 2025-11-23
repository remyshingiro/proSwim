import React, { useState, useEffect } from 'react';
import { PageLayout } from '../components/PageLayout';
import { FiMapPin, FiPhone, FiClock, FiChevronDown, FiSearch, FiNavigation } from 'react-icons/fi';

const StoreLocator = () => {
  const [selectedStore, setSelectedStore] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState('');

  // Mock store data
  const stores = [
    {
      id: 1,
      name: 'SwimmingClub Kigali City',
      address: 'KN 4 Ave, Kigali, Rwanda',
      phone: '+250 788 123 456',
      email: 'kigali@swimmingclub.rw',
      hours: {
        monday: '9:00 AM - 8:00 PM',
        tuesday: '9:00 AM - 8:00 PM',
        wednesday: '9:00 AM - 8:00 PM',
        thursday: '9:00 AM - 8:00 PM',
        friday: '9:00 AM - 9:00 PM',
        saturday: '10:00 AM - 7:00 PM',
        sunday: '11:00 AM - 5:00 PM',
      },
      coordinates: { lat: -1.9536, lng: 30.0603 },
      region: 'kigali',
      features: ['Free Parking', 'Swim Lessons', 'Locker Rooms', 'Swim Gear'],
    },
    {
      id: 2,
      name: 'SwimmingClub Gisenyi',
      address: 'Ave de la Paix, Gisenyi, Rwanda',
      phone: '+250 788 654 321',
      email: 'gisenyi@swimmingclub.rw',
      hours: {
        monday: '8:00 AM - 7:00 PM',
        tuesday: '8:00 AM - 7:00 PM',
        wednesday: '8:00 AM - 7:00 PM',
        thursday: '8:00 AM - 7:00 PM',
        friday: '8:00 AM - 8:00 PM',
        saturday: '9:00 AM - 6:00 PM',
        sunday: '10:00 AM - 4:00 PM',
      },
      coordinates: { lat: -1.7001, lng: 29.2575 },
      region: 'west',
      features: ['Lake View', 'Swim Lessons', 'Beach Access', 'Café'],
    },
    {
      id: 3,
      name: 'SwimmingClub Huye',
      address: 'University Ave, Huye, Rwanda',
      phone: '+250 788 987 654',
      email: 'huye@swimmingclub.rw',
      hours: {
        monday: '8:30 AM - 7:30 PM',
        tuesday: '8:30 AM - 7:30 PM',
        wednesday: '8:30 AM - 7:30 PM',
        thursday: '8:30 AM - 7:30 PM',
        friday: '8:30 AM - 8:00 PM',
        saturday: '9:00 AM - 6:00 PM',
        sunday: 'Closed',
      },
      coordinates: { lat: -2.6079, lng: 29.7501 },
      region: 'south',
      features: ['Student Discounts', 'Locker Rooms', 'Swim Team'],
    },
    {
      id: 4,
      name: 'SwimmingClub Musanze',
      address: 'Volcanoes St, Musanze, Rwanda',
      phone: '+250 788 321 654',
      email: 'musanze@swimmingclub.rw',
      hours: {
        monday: '8:00 AM - 7:00 PM',
        tuesday: '8:00 AM - 7:00 PM',
        wednesday: '8:00 AM - 7:00 PM',
        thursday: '8:00 AM - 7:00 PM',
        friday: '8:00 AM - 8:00 PM',
        saturday: '9:00 AM - 6:00 PM',
        sunday: '10:00 AM - 4:00 PM',
      },
      coordinates: { lat: -1.4998, lng: 29.6344 },
      region: 'north',
      features: ['Mountain View', 'Heated Pool', 'Sauna', 'Swim Gear'],
    },
  ];

  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'kigali', name: 'Kigali' },
    { id: 'north', name: 'Northern Province' },
    { id: 'south', name: 'Southern Province' },
    { id: 'east', name: 'Eastern Province' },
    { id: 'west', name: 'Western Province' },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('Unable to retrieve your location. Please enable location services.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
    }

    return () => clearTimeout(timer);
  }, []);

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || store.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const getDistanceFromUser = (storeCoords) => {
    if (!userLocation) return null;
    
    // Simple distance calculation (Haversine formula would be better for production)
    const latDiff = Math.abs(userLocation.lat - storeCoords.lat);
    const lngDiff = Math.abs(userLocation.lng - storeCoords.lng);
    const distance = Math.sqrt(Math.pow(latDiff, 2) + Math.pow(lngDiff, 2));
    
    // Convert to kilometers (very rough approximation)
    return (distance * 111).toFixed(1);
  };

  const getDirections = (store) => {
    // In a real app, this would open Google Maps or Apple Maps with directions
    const url = `https://www.google.com/maps/dir/?api=1&destination=${store.coordinates.lat},${store.coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <PageLayout 
      title="Find a Store"
      breadcrumbs={[{ to: '/', label: 'Home' }]}
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Stores</h2>
            <p className="text-gray-600">Find a SwimmingClub store near you</p>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by city or address"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  {regions.map(region => (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FiChevronDown className="text-gray-400" />
                </div>
              </div>
              
              {userLocation && (
                <button
                  onClick={() => {
                    // In a real app, this would find the nearest store
                    const nearestStore = [...stores].sort((a, b) => {
                      const distA = getDistanceFromUser(a.coordinates);
                      const distB = getDistanceFromUser(b.coordinates);
                      return distA - distB;
                    })[0];
                    setSelectedStore(nearestStore);
                  }}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiNavigation className="mr-2" />
                  Find Nearest Store
                </button>
              )}
            </div>
            
            {locationError && (
              <div className="mt-4 text-sm text-red-600">
                {locationError}
              </div>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row h-[600px]">
            {/* Store List */}
            <div className="w-full md:w-1/3 border-r border-gray-200 overflow-y-auto">
              {isLoading ? (
                <div className="p-6 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : filteredStores.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {filteredStores.map(store => {
                    const distance = userLocation ? getDistanceFromUser(store.coordinates) : null;
                    return (
                      <li 
                        key={store.id}
                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${selectedStore?.id === store.id ? 'bg-blue-50' : ''}`}
                        onClick={() => setSelectedStore(store)}
                      >
                        <h3 className="text-lg font-medium text-gray-900">{store.name}</h3>
                        <p className="mt-1 text-sm text-gray-600 flex items-center">
                          <FiMapPin className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                          {store.address}
                        </p>
                        {distance && (
                          <p className="mt-1 text-sm text-gray-500">
                            {distance} km away
                          </p>
                        )}
                        <div className="mt-2 flex flex-wrap gap-1">
                          {store.features.map((feature, index) => (
                            <span 
                              key={index} 
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No stores found matching your criteria.
                </div>
              )}
            </div>
            
            {/* Map and Store Details */}
            <div className="w-full md:w-2/3 bg-gray-100 relative">
              {selectedStore ? (
                <>
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">Interactive Map (Store: {selectedStore.name})</p>
                    {/* In a real app, you would render a map here with the selected store's location */}
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{selectedStore.name}</h3>
                        <p className="mt-1 text-sm text-gray-600 flex items-start">
                          <FiMapPin className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400 mt-0.5" />
                          {selectedStore.address}
                        </p>
                        <p className="mt-2 text-sm text-gray-600 flex items-center">
                          <FiPhone className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                          {selectedStore.phone}
                        </p>
                        <p className="mt-1 text-sm text-gray-600">
                          <a href={`mailto:${selectedStore.email}`} className="hover:text-blue-600">
                            {selectedStore.email}
                          </a>
                        </p>
                      </div>
                      <button
                        onClick={() => getDirections(selectedStore)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <FiNavigation className="mr-2 h-4 w-4" />
                        Directions
                      </button>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Store Hours</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {Object.entries(selectedStore.hours).map(([day, hours]) => (
                          <div key={day} className="flex justify-between">
                            <span className="font-medium text-gray-700 capitalize">{day}:</span>
                            <span className="text-gray-600">{hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Store Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedStore.features.map((feature, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Select a store to view details
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Don't see a store near you?</h2>
            <p className="text-gray-600 mb-4">
              We're always looking to expand our network of stores. Let us know where you'd like to see a SwimmingClub store next!
            </p>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Suggest a Location
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default StoreLocator;
