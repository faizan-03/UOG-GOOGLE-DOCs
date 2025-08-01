import { useEffect, useState } from 'react';
import { getCurrentUser } from './store/authstore';
import { Routes, Route, Navigate } from 'react-router-dom';
import Starter from './pages/Starter';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Userboard from './pages/Userboard';

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser(); // from cookie
        setAuthUser(user);
      } catch (err) {
        setAuthUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route
        path="/"
        element={
          !authUser ? (
            <Starter setAuthUser={setAuthUser} />
          ) : authUser.role === 'admin' ? (
            <Navigate to="/admindashboard" />
          ) : (
            <Navigate to="/userdashboard" />
          )
        }
      />

      <Route
        path="/register"
        element={!authUser ? <Register /> : <Navigate to="/" />}
      />

      <Route
        path="/admindashboard"
        element={
          authUser?.role === 'admin' ? <Admin /> : <Navigate to="/" />
        }
      />

      <Route
        path="/userdashboard"
        element={
          authUser?.role === 'user' ? <Userboard /> : <Navigate to="/" />
        }
      />
    </Routes>
  );
}

export default App;