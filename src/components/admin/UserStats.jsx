import React from 'react';

const UserStats = ({ totalUsers }) => (
  <div className="bg-gradient-to-r from-blue-300 to-blue-100 rounded-2xl p-8 shadow-lg flex flex-col items-center justify-center min-w-[260px] min-h-[180px] transition-all duration-200 hover:shadow-xl border border-gray-100">
    <div className="flex items-center mb-4">
      <span className="text-4xl mr-3">👥</span>
      <h2 className="text-xl font-bold text-gray-700 whitespace-nowrap">Total Registered Users</h2>
    </div>
    <p className="text-5xl text-blue-700 font-extrabold">{totalUsers}</p>
  </div>
);

export default UserStats;
