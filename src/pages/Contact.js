import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitStatus({
        success: true,
        message: 'Thank you for your message! We\'ll get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ success: null, message: '' });
      }, 5000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <FiMapPin className="text-blue-500" size={24} />,
      title: 'Our Location',
      description: '123 Swimming Street, Kigali, Rwanda',
      link: 'https://maps.google.com',
      linkText: 'View on map'
    },
    {
      icon: <FiMail className="text-blue-500" size={24} />,
      title: 'Email Us',
      description: 'info@swimmingclub.rw',
      link: 'mailto:info@swimmingclub.rw',
      linkText: 'Send us an email'
    },
    {
      icon: <FiPhone className="text-blue-500" size={24} />,
      title: 'Call Us',
      description: '+250 700 000 000',
      link: 'tel:+250700000000',
      linkText: 'Call us now'
    },
    {
      icon: <FiClock className="text-blue-500" size={24} />,
      title: 'Working Hours',
      description: 'Mon - Fri: 9:00 - 18:00\nSat: 10:00 - 16:00\nSun: Closed',
      link: '',
      linkText: ''
    }
  ];

  return (
    <PageLayout 
      title="Contact Us"
      breadcrumbs={[{ to: '/', label: 'Home' }]}
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Send us a message</h2>
              <p className="text-gray-600 mb-6">
                Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
              </p>
              
              {submitStatus.message && (
                <div className={`mb-6 p-4 rounded-md ${submitStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {submitStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <FiSend className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="bg-gray-50 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                      <p className="mt-1 text-gray-600 whitespace-pre-line">{item.description}</p>
                      {item.link && (
                        <a 
                          href={item.link} 
                          className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800"
                        >
                          {item.linkText}
                          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((social) => (
                    <a 
                      key={social}
                      href={`https://${social.toLowerCase()}.com`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-500"
                    >
                      <span className="sr-only">{social}</span>
                      <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-200">
                        {social.charAt(0)}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Need help shopping?</h3>
                <p className="text-gray-600 mb-4">Our customer service team is here to help with any questions about our products or your order.</p>
                <a 
                  href="mailto:support@swimmingclub.rw" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Contact Support
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map */}
        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-96 w-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">Interactive Map Here</p>
            {/* In a real app, you would embed a Google Map or similar here */}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
