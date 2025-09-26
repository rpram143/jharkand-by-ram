import React, { useState } from 'react';
import { useTouristSpots } from '../context/TouristSpotsContext';

const initialForm = {
  name: '',
  location: '',
  description: '',
  image: '',
  category: '',
  isOpen: true,
  assignedOfficer: '',
};

const AdminTourismManager = () => {
  const { spots, setSpots } = useTouristSpots();
  const [form, setForm] = useState(initialForm);
  const [editIndex, setEditIndex] = useState(null);

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
      // Edit existing
      const updated = [...spots];
      updated[editIndex] = { ...form, id: updated[editIndex].id };
      setSpots(updated);
      setEditIndex(null);
    } else {
      // Add new
      setSpots([
        ...spots,
        { ...form, id: Date.now().toString() },
      ]);
    }
    setForm(initialForm);
  };

  const handleEdit = (idx) => {
    setForm(spots[idx]);
    setEditIndex(idx);
  };

  const handleDelete = (idx) => {
    if (window.confirm('Delete this place?')) {
      const updated = spots.filter((_, i) => i !== idx);
      setSpots(updated);
      if (editIndex === idx) setForm(initialForm);
    }
  };

  // Demo forest officers
  const officers = [
    { name: 'Officer 1', email: 'officer1@forest.com' },
    { name: 'Officer 2', email: 'officer2@forest.com' },
    { name: 'Officer 3', email: 'officer3@forest.com' },
    { name: 'Officer 4', email: 'officer4@forest.com' },
    { name: 'Officer 5', email: 'officer5@forest.com' },
  ];

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6">Admin: Manage Tourism Places</h2>

      {/* Forest Officers List */}
      <div className="bg-white rounded shadow p-4 mb-8">
        <h3 className="text-xl font-semibold mb-4">Forest Officers</h3>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1">Name</th>
              <th className="px-2 py-1">Email</th>
              <th className="px-2 py-1">Assigned Places</th>
            </tr>
          </thead>
          <tbody>
            {officers.map((officer) => (
              <tr key={officer.email} className="border-t">
                <td className="px-2 py-1">{officer.name}</td>
                <td className="px-2 py-1">{officer.email}</td>
                <td className="px-2 py-1">
                  {spots.filter(s => s.assignedOfficer === officer.email).map(s => s.name).join(', ') || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" required />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="border p-2 rounded" required />
          <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="border p-2 rounded" />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="border p-2 rounded" />
          <input name="assignedOfficer" value={form.assignedOfficer} onChange={handleChange} placeholder="Assigned Officer Email" className="border p-2 rounded col-span-2" />
        </div>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded w-full mt-4" rows={3} />
        <label className="block mt-2">
          <input type="checkbox" name="isOpen" checked={form.isOpen} onChange={handleChange} className="mr-2" />
          Open for Visitors
        </label>
        <button type="submit" className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded">
          {editIndex !== null ? 'Update Place' : 'Add Place'}
        </button>
        {editIndex !== null && (
          <button type="button" className="ml-4 text-gray-600 underline" onClick={() => { setForm(initialForm); setEditIndex(null); }}>
            Cancel Edit
          </button>
        )}
      </form>
      <div className="bg-white rounded shadow p-4">
        <h3 className="text-xl font-semibold mb-4">Existing Places</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-2 py-1">Name</th>
                <th className="px-2 py-1">Location</th>
                <th className="px-2 py-1">Category</th>
                <th className="px-2 py-1">Open</th>
                <th className="px-2 py-1">Actions</th>
                <th className="px-2 py-1">Assigned Officer</th>
              </tr>
            </thead>
            <tbody>
              {spots.map((spot, idx) => (
                <tr key={spot.id} className="border-t">
                  <td className="px-2 py-1">{spot.name}</td>
                  <td className="px-2 py-1">{spot.location}</td>
                  <td className="px-2 py-1">{spot.category}</td>
                  <td className="px-2 py-1">{spot.isOpen ? 'Yes' : 'No'}</td>
                  <td className="px-2 py-1">{spot.assignedOfficer || '-'}</td>
                  <td className="px-2 py-1">
                    <button className="text-blue-600 mr-2" onClick={() => handleEdit(idx)}>Edit</button>
                    <button className="text-red-600" onClick={() => handleDelete(idx)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTourismManager;
