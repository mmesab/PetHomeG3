import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

export default function Login({ onLoginSuccess }) {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = await API.post('/auth/login', credentials);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            if (onLoginSuccess) onLoginSuccess(data.user);

            if (data.user.role === 'CENTRO') {
                navigate('/center/dashboard');
            } else {
                navigate('/pets');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error al iniciar sesión');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>Iniciar Sesión</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                    type="email"
                    name="email"
                    placeholder="Correo Electrónico"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Entrar
                </button>
            </form>

            <p style={{ marginTop: '16px', fontSize: '14px' }}>
                ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
            </p>
        </div>
    );
}