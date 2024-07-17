// Dashboard.js

// Import necessary modules
import React from 'react';
import { useLocation } from 'react-router-dom';

// Array of assessment objects
const assessments = [
  { id: 1, imgSrc: 'image.jpg' },
  { id: 2, imgSrc: 'image.jpg' },
  { id: 3, imgSrc: 'image.jpg' },
  { id: 4, imgSrc: 'image.jpg' },
  { id: 5, imgSrc: 'image.jpg' },
  { id: 6, imgSrc: 'image.jpg' },
  { id: 7, imgSrc: 'image.jpg' },
  { id: 8, imgSrc: 'image.jpg' },
];

const Dashboard = () => {
  const location = useLocation(); // Hook to get location object
  const { username } = location.state || {}; // Access username from location state

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <img src="/image.png" alt="Logo" className="mx-auto mb-4" />
        <h1 className="text-2xl font-bold">AROM Assessment</h1>
        <p className="text-lg">Patient Name: {username || 'Guest'}</p> {/* Display username here */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {assessments.map((assessment) => (
          <div key={assessment.id} className="flex flex-col items-center">
            <img
              src={assessment.imgSrc}
              alt={`Assessment ${assessment.id}`}
              className="w-full h-48 object-cover mb-2"
            />
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full">
              Start Assessment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
