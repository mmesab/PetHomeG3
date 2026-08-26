import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'ADOPTANTE'
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await API.post('/auth/register', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al registrar la cuenta');
        }

        
    };

    

    return (
        <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>Registro de Usuario</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre completo o del Centro"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Correo Electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <select name="role" value={formData.role} onChange={handleChange} style={{ padding: '8px' }}>
                    <option value="ADOPTANTE">Quiero adoptar (Adoptante)</option>
                    <option value="CENTRO">Soy un centro / refugio</option>
                </select>

                <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Registrarse
                </button>
            </form>

            <p style={{ marginTop: '16px', fontSize: '14px' }}>
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
        </div>
    );
}