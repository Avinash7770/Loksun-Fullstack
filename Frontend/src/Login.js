// Login.js

// Import necessary modules
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
  const navigate = useNavigate(); // Hook for navigation
  const { login } = useAuth(); // Get login function from AuthContext
  const [username, setUsername] = useState(''); // State to hold username
  const [password, setPassword] = useState(''); // State to hold password

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to login
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const { token } = await response.json(); // Get token from response
        login({ username }); // Call login function with username
        navigate('/dashboard', { state: { username } }); // Navigate to dashboard and pass username as state
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <h1 className="text-center text-2xl font-bold mb-4">Login</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username:
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="text-blue-500 hover:text-blue-700 font-bold"
            >
              Sign Up
            </button>
          </p>
          <p className="text-gray-700">
            {' '}
            <button
              type="button"
              onClick={() => navigate('/change-password')}
              className="text-blue-500 hover:text-blue-700 font-bold"
            >
              Change Password
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
