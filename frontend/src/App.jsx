import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ThreeBackground from './components/ThreeBackground';
import ThemeToggle from './components/ThemeToggle';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import './styles/index.css';

// Protected Route Component
const ProtectedRoute = ({ children, withLayout = true }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="auth-container">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return withLayout ? <Layout>{children}</Layout> : children;
};

// Public Route - redirect to home if already logged in
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="auth-container">Loading...</div>;
  }
  
  return isAuthenticated ? <Navigate to="/home" /> : children;
};

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <ThreeBackground />
            <ThemeToggle />
            <Login />
          </PublicRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <ThreeBackground />
            <ThemeToggle />
            <Register />
          </PublicRoute>
        } 
      />
      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
