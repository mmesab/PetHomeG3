import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MyAdoptions() {
    const [adoptions, setAdoptions] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('mock_adoptions') || '[]');
        setAdoptions(saved);
    }, []);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h2>Mis Solicitudes de Adopción</h2>

            {adoptions.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <p>Aún no has enviado ninguna solicitud de adopción.</p>
                    <Link to="/pets" style={{ color: '#007bff', fontWeight: 'bold' }}>Explorar catálogo</Link>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {adoptions.map(item => (
                        <div key={item.id} style={{
                            display: 'flex',
                            gap: '16px',
                            border: '1px solid #e0e0e0',
                            padding: '16px',
                            borderRadius: '8px',
                            backgroundColor: '#fff',
                            alignItems: 'center'
                        }}>
                            <img
                                src={item.petImage || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500'}
                                alt={item.petName}
                                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                            />
                            <div style={{ flexGrow: 1 }}>
                                <h3 style={{ margin: '0 0 4px 0' }}>{item.petName}</h3>
                                <p style={{ margin: '2px 0', fontSize: '14px', color: '#666' }}>Fecha: {item.createdAt}</p>
                                <p style={{ margin: '2px 0', fontSize: '14px', italic: 'true' }}>"{item.notes}"</p>
                            </div>
                            <span style={{
                                backgroundColor: item.status === 'PENDING' ? '#ffc107' : '#28a745',
                                color: '#212529',
                                padding: '4px 12px',
                                borderRadius: '12px',
                                fontSize: '12px',
                                fontWeight: 'bold'
                            }}>
                                {item.status === 'PENDING' ? 'Pendiente' : item.status}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}