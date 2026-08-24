import { useState } from 'react';

export default function AdoptionForm({ pet, onClose, onSubmitSuccess }) {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) {
            setError('El mensaje para el centro no puede estar vacío.');
            return;
        }

        const mockNewAdoption = {
            id: Date.now(),
            petId: pet.id,
            petName: pet.name,
            centerName: pet.centerName || 'Centro de adopción',
            message: message,
            status: 'PENDING',
            createdAt: new Date().toISOString()
        };

        onSubmitSuccess(mockNewAdoption);
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', background: '#f9f9f9', marginTop: '16px' }}>
            <h3>Solicitud de adopción para {pet.name}</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', marginBottom: '6px' }}>Mensaje para el centro:</label>
                    <textarea
                        rows="4"
                        style={{ width: '100%', padding: '8px' }}
                        placeholder="Cuenta un poco sobre tu hogar y por qué quieres adoptarla..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="submit" style={{ background: '#28a745', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '4px' }}>
                        Enviar solicitud
                    </button>
                    <button type="button" onClick={onClose} style={{ background: '#6c757d', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '4px' }}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}