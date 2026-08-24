import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PetDetail from './pages/PetDetail';
import MyAdoptions from './pages/MyAdoptions';

// Componente temporal si el Alumno A aún no termina PetsCatalog
function PetsCatalogMock() {
  return (
    <div style={{ padding: '24px' }}>
      <h2>Catálogo de Mascota (Vista previa)</h2>
      <p>Haz clic para probar la vista de detalle del Alumno B:</p>
      <Link to="/pets/1" style={{ fontSize: '18px', color: '#007bff' }}>
        👉 Ver Ficha de Luna (ID 1)
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Barra de navegación sencilla */}
      <nav style={{ padding: '16px', background: '#333', color: '#fff', display: 'flex', gap: '20px' }}>
        <Link to="/pets" style={{ color: '#fff', textDecoration: 'none' }}>Catálogo</Link>
        <Link to="/adoptions" style={{ color: '#fff', textDecoration: 'none' }}>Mis Solicitudes</Link>
      </nav>

      {/* Definición de Rutas */}
      <Routes>
        <Route path="/" element={<PetsCatalogMock />} />
        <Route path="/pets" element={<PetsCatalogMock />} />
        <Route path="/pets/:id" element={<PetDetail />} />
        <Route path="/adoptions" element={<MyAdoptions />} />
      </Routes>
    </BrowserRouter>
  );
}