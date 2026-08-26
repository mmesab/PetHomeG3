import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MyAdoptions() {
    const [adoptions, setAdoptions] = useState([]);
    const [selectedAdoptionId, setSelectedAdoptionId] = useState(null);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('mock_adoptions') || '[]');
        setAdoptions(saved);
    }, []);

    // Abrir el modal guardando la ID seleccionada
    const handleOpenCancelModal = (id) => {
        setSelectedAdoptionId(id);
    };

    // Cerrar el modal sin realizar cambios
    const handleCloseModal = () => {
        setSelectedAdoptionId(null);
    };

    // Confirmar la cancelación de la solicitud
    const handleConfirmCancel = () => {
        const updatedAdoptions = adoptions.filter(item => item.id !== selectedAdoptionId);
        
        // Actualizar el estado y el localStorage
        setAdoptions(updatedAdoptions);
        localStorage.setItem('mock_adoptions', JSON.stringify(updatedAdoptions));
        
        // Resetear el modal
        setSelectedAdoptionId(null);
    };

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
                                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%' }}
                            />
                            <div style={{ flexGrow: 1 }}>
                                <h3 style={{ margin: '0 0 4px 0' }}>{item.petName}</h3>
                                <p style={{ margin: '2px 0', fontSize: '14px', color: '#666' }}>Fecha: {item.createdAt}</p>
                                <p style={{ margin: '2px 0', fontSize: '14px', fontStyle: 'italic' }}>"{item.notes}"</p>
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

                            {/* Botón de Cancelación */}
                            <button
                                onClick={() => handleOpenCancelModal(item.id)}
                                style={{
                                    backgroundColor: '#dc3545',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '8px 12px',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '13px',
                                    fontWeight: '500'
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal de Confirmación */}
            {selectedAdoptionId !== null && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: '#fff',
                        padding: '24px',
                        borderRadius: '8px',
                        maxWidth: '400px',
                        width: '90%',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}>
                        <h3 style={{ marginTop: 0, color: '#2c3e50' }}>Confirmar Cancelación</h3>
                        <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.5' }}>
                            ¿Estás seguro de que deseas cancelar esta solicitud de adopción? Esta acción no se puede deshacer.
                        </p>
                        
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                            <button
                                onClick={handleCloseModal}
                                style={{
                                    backgroundColor: '#6c757d',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Volver
                            </button>
                            <button
                                onClick={handleConfirmCancel}
                                style={{
                                    backgroundColor: '#dc3545',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
                                }}
                            >
                                Confirmar Cancelación
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}