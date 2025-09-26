import React, { useState } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { hotels } from '../data/hotels';
import HotelCard from '../components/HotelCard';

const Roomstay = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [sortBy, setSortBy] = useState('rating');

  const priceRanges = [
    { label: 'All', value: 'All' },
    { label: '₹200 - ₹1,000', value: '200-1000' },
    { label: '₹1,000 - ₹3,000', value: '1000-3000' },
    { label: '₹3,000 - ₹5,000', value: '3000-5000' },
    { label: 'Above ₹5,000', value: '5000+' }
  ];

  const ratingOptions = [
    { label: 'All Ratings', value: 'All' },
    { label: '4+ Stars', value: '4+' },
    { label: '4.2+ Stars', value: '4.2+' }
  ];

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = searchQuery === '' || 
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.nearbySpots.some(spot => spot.toLowerCase().includes(searchQuery.toLowerCase()));
    
  let matchesPrice = true;
  if (priceRange === '200-1000') matchesPrice = hotel.price >= 200 && hotel.price <= 1000;
  else if (priceRange === '1000-3000') matchesPrice = hotel.price > 1000 && hotel.price <= 3000;
  else if (priceRange === '3000-5000') matchesPrice = hotel.price > 3000 && hotel.price <= 5000;
  else if (priceRange === '5000+') matchesPrice = hotel.price > 5000;
    
    let matchesRating = true;
    if (ratingFilter === '4+') matchesRating = hotel.rating >= 4.0;
    else if (ratingFilter === '4.2+') matchesRating = hotel.rating >= 4.2;
    
    return matchesSearch && matchesPrice && matchesRating;
  });

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-4">Find Your Perfect Stay</h1>
          <p className="text-xl text-blue-100">
            Discover comfortable accommodations near Jharkhand's top destinations
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search hotels or nearby attractions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
              
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {ratingOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {sortedHotels.length} hotels found
            </h2>
            <div className="text-gray-600">
              Sorted by {sortBy === 'rating' ? 'highest rated' : sortBy === 'price-low' ? 'price (low to high)' : 'price (high to low)'}
            </div>
          </div>
        </div>

        {/* Hotels Grid */}
        {sortedHotels.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl text-gray-300 mb-4">🏨</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hotels found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedHotels.map(hotel => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}
      </div>

      {/* Booking Info */}
      <div className="bg-blue-600 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Help with Your Booking?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Our travel experts are here to help you find the perfect accommodation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Contact Support
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors">
              View Booking Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roomstay;

