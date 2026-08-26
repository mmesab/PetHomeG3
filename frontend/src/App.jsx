import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import PetsCatalog from './pages/PetsCatalog';
import PetDetail from './pages/PetDetail';
import MyAdoptions from './pages/MyAdoptions';
import CenterDetail from './pages/CenterDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

function Navigation({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav style={{ background: '#2c3e50', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <h1 style={{ color: '#fff', margin: 0, fontSize: '1.5rem' }}>🐾 PetHome</h1>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link to="/pets" style={{ color: '#ecf0f1', textDecoration: 'none', fontWeight: 'bold' }}>Catálogo</Link>
          {user && user.role === 'ADOPTANTE' && (
            <Link to="/adoptions" style={{ color: '#ecf0f1', textDecoration: 'none', fontWeight: 'bold' }}>Mis Solicitudes</Link>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        {user ? (
          <>
            <span style={{ color: '#ecf0f1', fontSize: '14px' }}>
              Hola, <strong>{user.name}</strong> ({user.role})
            </span>
            <button 
              onClick={handleLogoutClick} 
              style={{ backgroundColor: '#e74c3c', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: '#ecf0f1', textDecoration: 'none', fontWeight: 'bold' }}>Iniciar Sesión</Link>
            <Link to="/register" style={{ color: '#2ecc71', textDecoration: 'none', fontWeight: 'bold' }}>Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <BrowserRouter>
      <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        {/* Navegación Principal */}
        <Navigation user={user} onLogout={handleLogout} />

        {/* Definición de Rutas */}
        <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<PetsCatalog />} />
            <Route path="/pets" element={<PetsCatalog />} />
            <Route path="/pets/:id" element={<PetDetail />} />
            <Route path="/centers/:id" element={<CenterDetail />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas Protegidas (Solo Adoptantes) */}
            <Route element={<ProtectedRoute allowedRoles={['ADOPTANTE']} />}>
              <Route path="/adoptions" element={<MyAdoptions />} />
            </Route>

            {/* Ruta no autorizada / Fallback */}
            <Route path="/unauthorized" element={<h2>No tienes permisos para acceder a esta sección.</h2>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}