import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TouristSpotsProvider } from './context/TouristSpotsContext';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Explore from './pages/Explore';
import Roomstay from './pages/Roomstay';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminTourismManager from './pages/AdminTourismManager';
import OfficerTourismManager from './pages/OfficerTourismManager';
import OfficerLogin from './pages/OfficerLogin';
import OfficerDashboard from './pages/OfficerDashboard';

function App() {
  return (
    <AuthProvider>
      <TouristSpotsProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/roomstay" element={<Roomstay />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminTourismManager />} />
              <Route path="/officer" element={<OfficerTourismManager />} />
              <Route path="/officer-login" element={<OfficerLogin />} />
              <Route path="/officer-dashboard" element={<OfficerDashboard />} />
            </Routes>
          </div>
        </Router>
      </TouristSpotsProvider>
    </AuthProvider>
  );
}

export default App;

