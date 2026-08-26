import { useState, useEffect } from 'react';
import API from '../services/api';
import AdoptionStatusBadge from '../components/AdoptionStatusBadge';

export default function CenterDashboard() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCenterRequests();
    }, []);

    const fetchCenterRequests = async () => {
        try {
            setLoading(true);
            const { data } = await API.get('/center/adoptions');
            setRequests(data);
        } catch (err) {
            // Fallback para pruebas locales si la API aún no devuelve datos reales
            const mockRequests = JSON.parse(localStorage.getItem('mock_adoptions') || '[]');
            setRequests(mockRequests);
            if (err.response) {
                setError('No se pudieron cargar las solicitudes desde el servidor.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            await API.patch(`/center/adoptions/${id}`, { status: newStatus });
            
            setRequests(prev => prev.map(req => 
                req.id === id ? { ...req, status: newStatus } : req
            ));
        } catch (err) {
            // Fallback local en localStorage para pruebas sin backend
            setRequests(prev => {
                const updated = prev.map(req => req.id === id ? { ...req, status: newStatus } : req);
                localStorage.setItem('mock_adoptions', JSON.stringify(updated));
                return updated;
            });
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '40px' }}>Cargando solicitudes...</div>;

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Panel de Control - Gestión de Solicitudes</h2>

            {error && (
                <div style={{ backgroundColor: '#fff3cd', color: '#856404', padding: '10px 15px', borderRadius: '6px', marginBottom: '16px' }}>
                    {error} (Mostrando datos locales)
                </div>
            )}

            {requests.length === 0 ? (
                <p>No hay solicitudes de adopción pendientes por gestionar.</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {requests.map(req => (
                        <div key={req.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            padding: '16px',
                            backgroundColor: '#fff',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}>
                            <div>
                                <h3 style={{ margin: '0 0 6px 0', color: '#2c3e50' }}>{req.petName || 'Mascota'}</h3>
                                <p style={{ margin: '2px 0', fontSize: '14px', color: '#555' }}>
                                    <strong>Solicitante:</strong> {req.userName || 'Adoptante'} ({req.userEmail || 'Sin email'})
                                </p>
                                <p style={{ margin: '2px 0', fontSize: '14px', color: '#777' }}>
                                    <strong>Notas:</strong> "{req.notes || 'Sin notas adicionales'}"
                                </p>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <AdoptionStatusBadge status={req.status || 'PENDING'} />

                                {(req.status === 'PENDING' || !req.status) && (
                                    <>
                                        <button
                                            onClick={() => handleUpdateStatus(req.id, 'APPROVED')}
                                            style={{
                                                backgroundColor: '#28a745',
                                                color: '#fff',
                                                border: 'none',
                                                padding: '8px 12px',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            Aprobar
                                        </button>
                                        <button
                                            onClick={() => handleUpdateStatus(req.id, 'REJECTED')}
                                            style={{
                                                backgroundColor: '#dc3545',
                                                color: '#fff',
                                                border: 'none',
                                                padding: '8px 12px',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            Rechazar
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}