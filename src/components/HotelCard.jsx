import React from 'react';
import { Star, MapPin, Wifi, Car, Coffee, Waves } from 'lucide-react';

const HotelCard = ({ hotel }) => {
  const getAmenityIcon = (amenity) => {
    if (amenity.toLowerCase().includes('wifi')) return <Wifi className="h-4 w-4" />;
    if (amenity.toLowerCase().includes('parking')) return <Car className="h-4 w-4" />;
    if (amenity.toLowerCase().includes('restaurant')) return <Coffee className="h-4 w-4" />;
    if (amenity.toLowerCase().includes('pool')) return <Waves className="h-4 w-4" />;
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <div className="bg-white px-3 py-1 rounded-full shadow-md">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-900">{hotel.rating}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-600">₹{hotel.price.toLocaleString()}</div>
            <div className="text-sm text-gray-500">per night</div>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{hotel.location}</span>
        </div>
        
        <div className="mb-4">
          <div className="text-sm text-gray-700 mb-1">Nearby Attractions:</div>
          <div className="flex flex-wrap gap-1">
            {hotel.nearbySpots.slice(0, 2).map((spot, index) => (
              <span key={index} className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs">
                {spot}
              </span>
            ))}
            {hotel.nearbySpots.length > 2 && (
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                +{hotel.nearbySpots.length - 2} more
              </span>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 4).map((amenity, index) => (
            <div key={index} className="flex items-center space-x-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
              {getAmenityIcon(amenity)}
              <span>{amenity}</span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            {hotel.rooms} rooms available
          </div>
        </div>
        
        <button className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default HotelCard;

