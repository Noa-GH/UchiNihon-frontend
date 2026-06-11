import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import SavedHomes from './pages/SavedHomes/SavedHomes';
import './App.css';
import Header from './components/Header/Header';

// Main application component that sets up routing and authentication context
// Wires up three layers:
// 1. BrowserRouter - for client-side routing (now in main.tsx, wrapping everything)
// 2. AuthProvider - for managing authentication state across the app
// 3. Routes - defining accessible pages and protected routes

// QueryClientProvider lives in main.tsx above App, so all pages can use react-query for data fetching and caching without needing to wrap each page individually.

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/saved"
            element={
              <ProtectedRoute>
                <SavedHomes />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
