// ChangePassword.js

// Import necessary modules
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [email, setEmail] = useState(''); // State to hold email
  const [oldPassword, setOldPassword] = useState(''); // State to hold old password
  const [newPassword, setNewPassword] = useState(''); // State to hold new password
  const [confirmNewPassword, setConfirmNewPassword] = useState(''); // State to hold confirm new password

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if new passwords match
    if (newPassword !== confirmNewPassword) {
      alert('New passwords do not match.');
      return;
    }
    try {
      // Send a POST request to change password
      const response = await fetch('http://localhost:4000/changepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, oldPassword, newPassword }),
      });
      if (response.ok) {
        alert('Password changed successfully.');
      } else {
        // Handle error response
        alert('Password change failed. Please check your details.');
      }
    } catch (error) {
      // Handle network errors
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <h1 className="text-center text-2xl font-bold mb-4">Change Password</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="oldPassword">
            Old Password:
          </label>
          <input
            id="oldPassword"
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
            New Password:
          </label>
          <input
            id="newPassword"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmNewPassword">
            Confirm New Password:
          </label>
          <input
            id="confirmNewPassword"
            type="password"
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Change Password
          </button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Go back to{' '}
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-blue-500 hover:text-blue-700 font-bold"
            >
              login!
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
