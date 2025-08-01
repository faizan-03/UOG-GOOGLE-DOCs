import React from 'react';

const UsersTable = ({ users }) => {
  return (
    <div className="mt-8 overflow-x-auto">
      <div className="max-h-96 overflow-y-auto">
        <table className="min-w-full bg-white rounded-xl shadow-lg border border-gray-200">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-lg font-bold rounded-tl-xl">
                Name
              </th>
              <th className="py-4 px-6 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-lg font-bold rounded-tr-xl">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={2} className="py-8 px-6 text-center text-gray-400 text-lg">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors duration-200 ${
                    idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-blue-50`}
                >
                  <td className="py-4 px-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-lg">
                      {user.username?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-800">{user.username}</span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{user.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
