import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { FiPackage, FiTruck, FiCheckCircle, FiClock } from 'react-icons/fi';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!orderId.trim() || !email.trim()) {
      setError('Please enter both order ID and email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock tracking data - in a real app, this would come from your backend
      const mockTrackingData = {
        orderId: orderId,
        status: 'shipped',
        estimatedDelivery: '2023-12-05',
        carrier: 'DHL Express',
        trackingNumber: '1234567890',
        items: [
          { id: 1, name: 'Pro Swim Goggles', quantity: 1, price: 24.99 },
          { id: 2, name: 'Swim Cap', quantity: 2, price: 9.99 },
        ],
        shippingAddress: '123 Main St, Kigali, Rwanda',
        orderDate: '2023-11-20',
        statusUpdates: [
          {
            status: 'ordered',
            date: '2023-11-20',
            description: 'Order placed',
            location: 'Kigali, Rwanda',
            completed: true
          },
          {
            status: 'processed',
            date: '2023-11-21',
            description: 'Order processed',
            location: 'Kigali, Rwanda',
            completed: true
          },
          {
            status: 'shipped',
            date: '2023-11-22',
            description: 'Shipped with DHL Express',
            location: 'Kigali, Rwanda',
            completed: true
          },
          {
            status: 'in-transit',
            date: '2023-11-23',
            description: 'In transit',
            location: 'Nairobi, Kenya',
            completed: false
          },
          {
            status: 'delivered',
            date: '2023-12-05',
            description: 'Estimated delivery',
            location: 'Your address',
            completed: false
          }
        ]
      };
      
      setTrackingInfo(mockTrackingData);
      setIsLoading(false);
    }, 1000);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ordered':
        return <FiPackage className="text-blue-500" />;
      case 'shipped':
        return <FiTruck className="text-blue-500" />;
      case 'delivered':
        return <FiCheckCircle className="text-green-500" />;
      default:
        return <FiClock className="text-gray-400" />;
    }
  };

  return (
    <PageLayout 
      title="Track Your Order"
      breadcrumbs={[{ to: '/', label: 'Home' }]}
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Track Your Order</h2>
          <p className="text-gray-600 mb-6">Enter your order ID and email address to track your order status.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">
                Order ID
              </label>
              <input
                type="text"
                id="orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. ORD123456"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
                required
              />
            </div>
            
            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Tracking...' : 'Track Order'}
            </button>
          </form>
        </div>

        {trackingInfo && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Order #{trackingInfo.orderId}</h3>
              <p className="text-sm text-gray-500">Placed on {new Date(trackingInfo.orderDate).toLocaleDateString()}</p>
              
              <div className="mt-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {getStatusIcon(trackingInfo.status)}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {trackingInfo.status === 'delivered' ? 'Delivered' : 'In Transit'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {trackingInfo.status === 'delivered' 
                        ? 'Your order has been delivered' 
                        : `Estimated delivery: ${new Date(trackingInfo.estimatedDelivery).toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-b border-gray-200">
              <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Tracking History</h4>
              <div className="mt-4 space-y-4">
                {trackingInfo.statusUpdates.map((update, index) => (
                  <div key={index} className="relative pb-4">
                    {index !== trackingInfo.statusUpdates.length - 1 && (
                      <div className="absolute left-3 top-4 -bottom-4 w-0.5 bg-gray-200" />
                    )}
                    <div className="relative flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white flex items-center justify-center">
                        <div className={`h-3 w-3 rounded-full ${update.completed ? 'bg-blue-500' : 'bg-gray-200'}`} />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{update.description}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(update.date).toLocaleDateString()} • {update.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-4">
              <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Order Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-900">Shipping Address</h5>
                  <p className="mt-1 text-sm text-gray-700">{trackingInfo.shippingAddress}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-900">Shipping Method</h5>
                  <p className="mt-1 text-sm text-gray-700">
                    {trackingInfo.carrier} • {trackingInfo.trackingNumber}
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <h5 className="text-sm font-medium text-gray-900 mb-2">Order Items</h5>
                <div className="space-y-2">
                  {trackingInfo.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-700">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="text-gray-900 font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between text-sm font-medium text-gray-900">
                  <span>Total</span>
                  <span>
                    ${trackingInfo.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default TrackOrder;
