// src/App.jsx
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ViewerDashboard from "./pages/ViewerDashboard";

import "./styles.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/">Streamly</Link>
      </div>
      <nav className="nav-links">
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
        {user && (
          <>
            {user.role === "ADMIN" && <Link to="/admin">Admin</Link>}
            {user.role === "USER" && <Link to="/user">User</Link>}
            {user.role === "VIEWER" && <Link to="/viewer">Viewer</Link>}
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/user"
              element={
                <PrivateRoute allowedRoles={["USER"]}>
                  <UserDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute allowedRoles={["ADMIN"]}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/viewer"
              element={
                <PrivateRoute allowedRoles={["VIEWER"]}>
                  <ViewerDashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
