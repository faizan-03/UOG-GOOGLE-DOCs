import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserStats from './UserStats';
import UploadDocument from './UploadDocument';
import UsersTable from './UsersTable';
import { logoutUser } from "../../store/authstore"; // Adjust path if needed
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { API_URL } from "../../store/authstore"; // Adjust the import path as necessary

const AdminContainer = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await logoutUser();
    navigate("/", { replace: true });
    window.location.reload();
    toast.success("Logged out");
  } catch (err) {
    toast.error("Logout failed");
  }
};

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/admin/users`, {
          withCredentials: true,
        });
        setTotalUsers(res.data.count);
        setUsers(res.data.users);
      } catch (err) {
        console.error('Failed to fetch admin stats', err);
      }
    };

    fetchStats();
  }, []);

  return (
      <div className="relative max-w-6xl mx-auto p-6 space-y-8">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className=" cursor-pointer absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded font-semibold transition"
      >
        Logout
      </button>
      <h1 className="text-3xl font-bold text-center text-gray-800">📊 Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UserStats totalUsers={totalUsers} />
        <UploadDocument />
      </div>

      <div className="mt-4">
        <h2 className=" text-center text-2xl font-semibold text-gray-800 mb-2">👤 Registered Users</h2>
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default AdminContainer;
