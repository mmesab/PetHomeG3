import { useState } from 'react';

export default function AdoptionForm({ pet, onClose, onSubmitSuccess }) {
    const [notes, setNotes] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newAdoption = {
            id: Date.now(),
            petId: pet.id,
            petName: pet.name,
            petImage: pet.imageUrl,
            status: 'PENDING',
            notes: notes,
            createdAt: new Date().toLocaleDateString('es-ES')
        };

        onSubmitSuccess(newAdoption);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: '#fff',
                padding: '24px',
                borderRadius: '8px',
                maxWidth: '500px',
                width: '90%'
            }}>
                <h3 style={{ marginTop: 0 }}>Solicitud de adopción para {pet.name}</h3>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                            ¿Por qué te gustaría adoptar a esta mascota?
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            required
                            rows={4}
                            placeholder="Cuéntanos un poco sobre tu hogar, experiencia previa..."
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{ padding: '8px 16px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            style={{ padding: '8px 16px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            Enviar Solicitud
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}