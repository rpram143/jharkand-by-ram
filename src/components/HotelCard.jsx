import React, { useState } from 'react';
import { Star, MapPin, Wifi, Car, Coffee, Waves } from 'lucide-react';

const HotelCard = ({ hotel }) => {
  const [showBooking, setShowBooking] = useState(false);
  const [roomType, setRoomType] = useState('2');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const getAmenityIcon = (amenity) => {
    if (amenity.toLowerCase().includes('wifi')) return <Wifi className="h-4 w-4" />;
    if (amenity.toLowerCase().includes('parking')) return <Car className="h-4 w-4" />;
    if (amenity.toLowerCase().includes('restaurant')) return <Coffee className="h-4 w-4" />;
    if (amenity.toLowerCase().includes('pool')) return <Waves className="h-4 w-4" />;
    return null;
  };

  // Room price logic
  const basePrice = hotel.price;
  const roomPrices = {
    '2': basePrice,
    '3': Math.round(basePrice * 1.4),
    '4': Math.round(basePrice * 1.8)
  };

  const handleBook = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setShowBooking(false);
      setBookingSuccess(false);
    }, 1800);
  };

  return (
    <>
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
              <div className="text-2xl font-bold text-emerald-600">₹{basePrice.toLocaleString()}</div>
              <div className="text-sm text-gray-500">per night (2 bed)</div>
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
          <button
            className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            onClick={() => setShowBooking(true)}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={() => setShowBooking(false)}
              aria-label="Close"
            >
              <span className="text-xl">×</span>
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Book Your Room</h2>
            <div className="mb-4">
              <label className="block font-medium mb-1">Room Type</label>
              <div className="flex gap-3">
                <label className="flex items-center gap-1">
                  <input type="radio" name="roomType" value="2" checked={roomType === '2'} onChange={() => setRoomType('2')} />
                  2 Bed (₹{roomPrices['2']})
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" name="roomType" value="3" checked={roomType === '3'} onChange={() => setRoomType('3')} />
                  3 Bed (₹{roomPrices['3']})
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" name="roomType" value="4" checked={roomType === '4'} onChange={() => setRoomType('4')} />
                  4 Bed (₹{roomPrices['4']})
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Payment Method</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
              >
                <option value="card">Credit/Debit Card</option>
                <option value="upi">Paytm / PhonePe / UPI</option>
              </select>
            </div>
            {paymentMethod === 'card' ? (
              <div className="space-y-3 mb-4">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Card Number"
                  maxLength={19}
                  value={cardDetails.number}
                  onChange={e => setCardDetails({ ...cardDetails, number: e.target.value })}
                />
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Name on Card"
                  value={cardDetails.name}
                  onChange={e => setCardDetails({ ...cardDetails, name: e.target.value })}
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={cardDetails.expiry}
                    onChange={e => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  />
                  <input
                    type="password"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="CVV"
                    maxLength={4}
                    value={cardDetails.cvv}
                    onChange={e => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  />
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Enter UPI ID (Paytm/PhonePe)"
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                />
              </div>
            )}
            <button
              className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-semibold mt-2"
              onClick={handleBook}
              disabled={bookingSuccess}
            >
              {bookingSuccess ? 'Booking Successful!' : `Pay ₹${roomPrices[roomType]}`}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HotelCard;

