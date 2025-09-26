import React, { useState } from 'react';
import { Clock, Star, MapPin, CheckCircle, XCircle, X } from 'lucide-react';
import { hotels } from '../data/hotels';
import HotelCard from './HotelCard';

const TouristSpotCard = ({ spot }) => {
  const [showModal, setShowModal] = useState(false);
  const [showHotels, setShowHotels] = useState(false);

  // This will be used by parent to pass hotels if needed
  // For now, we just trigger showHotels in the modal

  return (
    <>
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
          <button
            className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            onClick={() => setShowModal(true)}
          >
            View Details
          </button>
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-0 relative animate-fadeIn flex flex-col md:flex-row">
            <div className="flex-1 p-8 min-w-[320px] relative">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 z-10"
                onClick={() => { setShowModal(false); setShowHotels(false); }}
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
              <img
                src={spot.image}
                alt={spot.name}
                className="w-full h-56 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{spot.name}</h2>
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="h-4 w-4 text-emerald-600" />
                <span className="text-gray-700">{spot.location}</span>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-gray-700 font-medium">{spot.rating} / 5</span>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">{spot.openTime} - {spot.closeTime} ({spot.isOpen ? 'Open' : 'Closed'})</span>
              </div>
              <p className="text-gray-800 mb-4">{spot.description}</p>
              <div className="mb-4">
                <div className="font-semibold text-gray-800 mb-1">Highlights:</div>
                <div className="flex flex-wrap gap-2">
                  {spot.features.map((feature, idx) => (
                    <span key={idx} className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <button
                className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-semibold mt-2"
                onClick={() => setShowHotels(true)}
              >
                Check Rooms Nearby
              </button>
            </div>
            {/* Right side: Hotels */}
            <div className="w-full md:w-[380px] border-t md:border-t-0 md:border-l border-gray-200 bg-gray-50 p-6 overflow-y-auto max-h-[90vh] min-h-[320px] flex flex-col">
              <div className="font-bold text-lg text-emerald-700 mb-2 text-center">Nearby Hotels</div>
              {showHotels ? (
                (() => {
                  const filteredHotels = hotels.filter(hotel =>
                    hotel.nearbySpots.some(
                      spotName => spotName.toLowerCase() === spot.name.toLowerCase()
                    )
                  );
                  if (filteredHotels.length === 0) {
                    return <div className="text-gray-500 text-center">No hotels found near this spot.</div>;
                  }
                  return (
                    <div className="space-y-4">
                      {filteredHotels.map(hotel => (
                        <HotelCard key={hotel.id} hotel={hotel} />
                      ))}
                    </div>
                  );
                })()
              ) : (
                <div className="text-gray-400 text-center mt-8">Click 'Check Rooms Nearby' to view hotels.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TouristSpotCard;

