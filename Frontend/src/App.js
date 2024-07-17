// App.js

// Import necessary modules and components
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Context for authentication
import Login from './Login'; // Login component
import ChangePassword from './ChangePassword'; // ChangePassword component
import Dashboard from './Dashboard'; // Dashboard component
import Signup from './Signup'; // Signup component
import PrivateRoute from './PrivateRoute'; // Component to protect routes

const App = () => {
  return (
    // Set up the Router for routing
    <Router>
      {/* Provide authentication context to the entire app */}
      <AuthProvider>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/change-password" element={<ChangePassword />} />
            
            {/* Protected route for Dashboard */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

