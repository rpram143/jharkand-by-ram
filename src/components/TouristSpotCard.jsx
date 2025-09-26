import React from 'react';
import { Clock, Star, MapPin, CheckCircle, XCircle } from 'lucide-react';

const TouristSpotCard = ({ spot }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={spot.image}
          alt={spot.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
            spot.isOpen 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {spot.isOpen ? (
              <>
                <CheckCircle className="h-4 w-4" />
                <span>Open</span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4" />
                <span>Closed</span>
              </>
            )}
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <span className={`bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-medium`}>
            {spot.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">{spot.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">{spot.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{spot.location}</span>
        </div>
        
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{spot.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">{spot.openTime} - {spot.closeTime}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {spot.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
              {feature}
            </span>
          ))}
          {spot.features.length > 3 && (
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
              +{spot.features.length - 3} more
            </span>
          )}
        </div>
        
        <button className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
          View Details
        </button>
      </div>
    </div>
  );
};

export default TouristSpotCard;

