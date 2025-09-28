import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTouristSpots } from '../context/TouristSpotsContext';

const OfficerDashboard = () => {
  const navigate = useNavigate();
  const { spots, setSpots } = useTouristSpots();
  const [editId, setEditId] = useState(null);
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');

  // Only allow access if logged in
  if (localStorage.getItem('officerLoggedIn') !== 'true') {
    navigate('/officer-login');
    return null;
  }

  const handleEdit = (spot) => {
    setEditId(spot.id);
    setOpenTime(spot.openTime);
    setCloseTime(spot.closeTime);
  };

  const handleSave = (id) => {
    setSpots(prev => prev.map(s => s.id === id ? { ...s, openTime, closeTime } : s));
    setEditId(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('officerLoggedIn');
    navigate('/officer-login');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-emerald-700">Officer Dashboard</h2>
          <button onClick={handleLogout} className="text-red-500 font-semibold hover:underline">Logout</button>
        </div>
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-emerald-100">
              <th className="py-2 px-3">Spot</th>
              <th className="py-2 px-3">Open Time</th>
              <th className="py-2 px-3">Close Time</th>
              <th className="py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {spots.map(spot => (
              <tr key={spot.id} className="border-t">
                <td className="py-2 px-3 font-medium">{spot.name}</td>
                <td className="py-2 px-3">
                  {editId === spot.id ? (
                    <input type="time" value={openTime} onChange={e => setOpenTime(e.target.value)} className="border rounded px-2 py-1" />
                  ) : (
                    spot.openTime
                  )}
                </td>
                <td className="py-2 px-3">
                  {editId === spot.id ? (
                    <input type="time" value={closeTime} onChange={e => setCloseTime(e.target.value)} className="border rounded px-2 py-1" />
                  ) : (
                    spot.closeTime
                  )}
                </td>
                <td className="py-2 px-3">
                  {editId === spot.id ? (
                    <>
                      <button onClick={() => handleSave(spot.id)} className="bg-emerald-600 text-white px-3 py-1 rounded mr-2">Save</button>
                      <button onClick={() => setEditId(null)} className="bg-gray-300 px-3 py-1 rounded">Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleEdit(spot)} className="bg-emerald-500 text-white px-3 py-1 rounded">Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OfficerDashboard;
