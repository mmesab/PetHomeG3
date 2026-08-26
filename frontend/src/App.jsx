import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PetsCatalog from './pages/PetsCatalog';
import PetDetail from './pages/PetDetail';
import MyAdoptions from './pages/MyAdoptions';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        {/* Navegación Principal */}
        <nav style={{ background: '#2c3e50', padding: '1rem 2rem', display: 'flex', gap: '20px', alignItems: 'center' }}>
          <h1 style={{ color: '#fff', margin: 0, fontSize: '1.5rem' }}>🐾 PetHome</h1>
          <div style={{ display: 'flex', gap: '15px' }}>
            <Link to="/pets" style={{ color: '#ecf0f1', textDecoration: 'none', fontWeight: 'bold' }}>Catálogo</Link>
            <Link to="/adoptions" style={{ color: '#ecf0f1', textDecoration: 'none', fontWeight: 'bold' }}>Mis Solicitudes</Link>
          </div>
        </nav>

        {/* Definición de Rutas */}
        <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          <Routes>
            <Route path="/" element={<PetsCatalog />} />
            <Route path="/pets" element={<PetsCatalog />} />
            <Route path="/pets/:id" element={<PetDetail />} />
            <Route path="/adoptions" element={<MyAdoptions />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}