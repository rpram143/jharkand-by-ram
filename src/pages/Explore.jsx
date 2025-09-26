import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Grid3x3 as Grid3X3, List, CheckCircle, XCircle } from 'lucide-react';
import { useTouristSpots } from '../context/TouristSpotsContext';
import TouristSpotCard from '../components/TouristSpotCard';

const Explore = () => {
  const { spots } = useTouristSpots();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = 'All';
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid');

  const categories = ['All', ...Array.from(new Set(spots.map(spot => spot.category)))];

  const filteredSpots = useMemo(() => {
    return spots.filter(spot => {
      const matchesSearch = searchQuery === '' || 
        spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spot.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spot.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || spot.category === selectedCategory;
      
      const matchesStatus = statusFilter === 'All' ||
        (statusFilter === 'Open' && spot.isOpen) ||
        (statusFilter === 'Closed' && !spot.isOpen);
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [spots, searchQuery, selectedCategory, statusFilter]);

  const openCount = filteredSpots.filter(spot => spot.isOpen).length;
  const closedCount = filteredSpots.filter(spot => !spot.isOpen).length;
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-4">Explore Jharkhand</h1>
          <p className="text-xl text-emerald-100">
            Discover {spots.length} amazing destinations across the state
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Quick Filters (removed Traditional as requested) */}

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="All">All Status</option>
                <option value="Open">Open Now</option>
                <option value="Closed">Closed</option>
              </select>
              
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
                >
                  <Grid3X3 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-gray-900 mb-2">{filteredSpots.length}</div>
            <div className="text-gray-600">Total Destinations</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div className="text-3xl font-bold text-green-600">{openCount}</div>
            </div>
            <div className="text-gray-600">Currently Open</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <XCircle className="h-6 w-6 text-red-600" />
              <div className="text-3xl font-bold text-red-600">{closedCount}</div>
            </div>
            <div className="text-gray-600">Currently Closed</div>
          </div>
        </div>

        {/* Results */}
        {filteredSpots.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl text-gray-300 mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No destinations found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredSpots.map(spot => (
              <TouristSpotCard key={spot.id} spot={spot} />
            ))}
          </div>
        )}

        
      </div>
    </div>
  );
};

export default Explore;

