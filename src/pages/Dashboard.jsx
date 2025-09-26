import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTouristSpots } from '../context/TouristSpotsContext';
import { Clock, MapPin, ToggleLeft, ToggleRight, Save, Users, Activity, TrendingUp } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const { spots, updateSpotStatus } = useTouristSpots();
  const [editingSpot, setEditingSpot] = useState(null);
  const [editForm, setEditForm] = useState({
    isOpen: false,
    openTime: '',
    closeTime: ''
  });

  if (!user || (user.role !== 'admin' && user.role !== 'forest_officer')) {
    return <Navigate to="/" replace />;
  }

  const handleEditClick = (spot) => {
    setEditingSpot(spot.id);
    setEditForm({
      isOpen: spot.isOpen,
      openTime: spot.openTime,
      closeTime: spot.closeTime
    });
  };

  const handleSave = (spotId) => {
    updateSpotStatus(spotId, editForm.isOpen, editForm.openTime, editForm.closeTime);
    setEditingSpot(null);
  };

  const handleCancel = () => {
    setEditingSpot(null);
    setEditForm({ isOpen: false, openTime: '', closeTime: '' });
  };

  const openSpots = spots.filter(spot => spot.isOpen).length;
  const closedSpots = spots.filter(spot => !spot.isOpen).length;
  const totalSpots = spots.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {user.role === 'admin' ? 'Admin Dashboard' : 'Forest Officer Dashboard'}
          </h1>
          <p className="text-gray-600 mt-2">
            Manage tourist destinations and their operating status
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Destinations</p>
                <p className="text-2xl font-semibold text-gray-900">{totalSpots}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Currently Open</p>
                <p className="text-2xl font-semibold text-gray-900">{openSpots}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <Users className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Currently Closed</p>
                <p className="text-2xl font-semibold text-gray-900">{closedSpots}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tourist Spots Management */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Tourist Destinations Management</h2>
            <p className="text-sm text-gray-600 mt-1">Update operating hours and status for each destination</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Operating Hours
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {spots.map((spot) => (
                  <tr key={spot.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img className="h-10 w-10 rounded-full object-cover" src={spot.image} alt={spot.name} />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{spot.name}</div>
                          <div className="text-sm text-gray-500">{spot.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                        {spot.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingSpot === spot.id ? (
                        <button
                          onClick={() => setEditForm({ ...editForm, isOpen: !editForm.isOpen })}
                          className="flex items-center space-x-2"
                        >
                          {editForm.isOpen ? (
                            <ToggleRight className="h-6 w-6 text-green-500" />
                          ) : (
                            <ToggleLeft className="h-6 w-6 text-gray-400" />
                          )}
                          <span className={`text-sm font-medium ${editForm.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                            {editForm.isOpen ? 'Open' : 'Closed'}
                          </span>
                        </button>
                      ) : (
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          spot.isOpen 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {spot.isOpen ? 'Open' : 'Closed'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {editingSpot === spot.id ? (
                        <div className="flex space-x-2">
                          <input
                            type="time"
                            value={editForm.openTime}
                            onChange={(e) => setEditForm({ ...editForm, openTime: e.target.value })}
                            className="text-xs border border-gray-300 rounded px-2 py-1"
                          />
                          <span className="text-gray-500">-</span>
                          <input
                            type="time"
                            value={editForm.closeTime}
                            onChange={(e) => setEditForm({ ...editForm, closeTime: e.target.value })}
                            className="text-xs border border-gray-300 rounded px-2 py-1"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          {spot.openTime} - {spot.closeTime}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingSpot === spot.id ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleSave(spot.id)}
                            className="text-green-600 hover:text-green-900 flex items-center space-x-1"
                          >
                            <Save className="h-4 w-4" />
                            <span>Save</span>
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEditClick(spot)}
                          className="text-emerald-600 hover:text-emerald-900"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

