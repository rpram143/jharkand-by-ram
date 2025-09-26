import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTouristSpots } from '../context/TouristSpotsContext';

const OfficerTourismManager = () => {
  const { user } = useAuth();
  const { spots, setSpots } = useTouristSpots();
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({
    name: '',
    location: '',
    description: '',
    image: '',
    category: '',
    isOpen: true,
    assignedOfficer: ''
  });

  // Only show places assigned to this officer
  const assignedSpots = spots.filter(
    (spot) => spot.assignedOfficer === user?.email
  );

  const handleEdit = (idx) => {
    setEditIndex(idx);
    setForm(assignedSpots[idx]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // Find the index in the main spots array
      const globalIdx = spots.findIndex(
        (s) => s.id === assignedSpots[editIndex].id
      );
      if (globalIdx !== -1) {
        const updated = [...spots];
        updated[globalIdx] = { ...form, assignedOfficer: user.email };
        setSpots(updated);
      }
      setEditIndex(null);
      setForm({
        name: '',
        location: '',
        description: '',
        image: '',
        category: '',
        isOpen: true,
        assignedOfficer: ''
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6">Forest Officer: Manage Your Assigned Places</h2>
      <div className="bg-white rounded shadow p-4 mb-8">
        <h3 className="text-xl font-semibold mb-4">Your Assigned Places</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-2 py-1">Name</th>
                <th className="px-2 py-1">Location</th>
                <th className="px-2 py-1">Category</th>
                <th className="px-2 py-1">Open</th>
                <th className="px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignedSpots.map((spot, idx) => (
                <tr key={spot.id} className="border-t">
                  <td className="px-2 py-1">{spot.name}</td>
                  <td className="px-2 py-1">{spot.location}</td>
                  <td className="px-2 py-1">{spot.category}</td>
                  <td className="px-2 py-1">{spot.isOpen ? 'Yes' : 'No'}</td>
                  <td className="px-2 py-1">
                    <button className="text-blue-600 mr-2" onClick={() => handleEdit(idx)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {editIndex !== null && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8">
          <h3 className="text-lg font-bold mb-4">Edit Place</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" required />
            <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="border p-2 rounded" required />
            <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="border p-2 rounded" />
            <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="border p-2 rounded" />
          </div>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded w-full mt-4" rows={3} />
          <label className="block mt-2">
            <input type="checkbox" name="isOpen" checked={form.isOpen} onChange={handleChange} className="mr-2" />
            Open for Visitors
          </label>
          <button type="submit" className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded">
            Save Changes
          </button>
          <button type="button" className="ml-4 text-gray-600 underline" onClick={() => setEditIndex(null)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default OfficerTourismManager;
