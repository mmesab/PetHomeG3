import { useState, useEffect } from 'react';

export default function MyAdoptions() {
    const [adoptions, setAdoptions] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('mock_adoptions') || '[]');
        setAdoptions(saved);
    }, []);

    return (
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Mis solicitudes de adopción</h2>
            {adoptions.length === 0 ? (
                <p>Aún no has realizado ninguna solicitud.</p>
            ) : (
                adoptions.map(item => (
                    <div key={item.id} style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px', marginBottom: '12px' }}>
                        <h3>Mascota: {item.petName}</h3>
                        <p><strong>Centro:</strong> {item.centerName}</p>
                        <p><strong>Estado:</strong> <span style={{ background: '#fff3cd', padding: '2px 8px', borderRadius: '4px' }}>{item.status}</span></p>
                        <p><strong>Mensaje:</strong> {item.message}</p>
                        <small>Fecha: {new Date(item.createdAt).toLocaleDateString()}</small>
                    </div>
                ))
            )}
        </div>
    );
}