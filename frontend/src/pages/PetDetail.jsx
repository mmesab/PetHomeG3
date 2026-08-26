import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockPets } from '../mocks/pets.mock';
import FavoriteButton from '../components/FavoriteButton';
import AdoptionForm from '../components/AdoptionForm';

export default function PetDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showAdoptionForm, setShowAdoptionForm] = useState(false);

    // Buscar mascota parseando el ID
    const pet = mockPets.find(p => p.id === Number(id)) || mockPets[0];

    // Protección extra por si el mock estuviera vacío
    if (!pet) {
        return <div style={{ padding: '24px' }}>Mascota no encontrada.</div>;
    }

    const handleAdoptionSuccess = (newAdoption) => {
        const existing = JSON.parse(localStorage.getItem('mock_adoptions') || '[]');
        localStorage.setItem('mock_adoptions', JSON.stringify([...existing, newAdoption]));

        alert('¡Solicitud enviada con éxito!');
        navigate('/adoptions');
    };

    return (
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h2>{pet.name} ({pet.species === 'DOG' ? 'Perro' : 'Gato'})</h2>

            {/* Imagen de la mascota */}
            <img
                src={pet.imageUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500'}
                alt={pet.name}
                style={{
                    width: '100%',
                    maxHeight: '400px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '20px'
                }}
            />

            {/* Botones de acción */}
            <div style={{ margin: '16px 0', display: 'flex', gap: '12px' }}>
                <FavoriteButton petId={pet.id} />
                {pet.status === 'AVAILABLE' ? (
                    <button
                        onClick={() => setShowAdoptionForm(true)}
                        style={{ background: '#007bff', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Quiero adoptarla
                    </button>
                ) : (
                    <button disabled style={{ background: '#ccc', color: '#666', padding: '8px 16px', border: 'none', borderRadius: '4px' }}>
                        No disponible ({pet.status})
                    </button>
                )}
            </div>

            {/* Ficha técnica */}
            <div style={{ lineHeight: '1.6' }}>
                <p><strong>Raza:</strong> {pet.breed}</p>
                <p><strong>Sexo:</strong> {pet.sex === 'FEMALE' ? 'Hembra' : 'Macho'}</p>
                <p><strong>Tamaño:</strong> {pet.size}</p>
                <p><strong>Ubicación:</strong> {pet.city}, {pet.region} ({pet.countryCode})</p>
                <p><strong>Estado:</strong> {pet.status}</p>
                <p><strong>Descripción:</strong> {pet.description}</p>
            </div>

            {/* Modal/Formulario de adopción */}
            {showAdoptionForm && (
                <AdoptionForm
                    pet={pet}
                    onClose={() => setShowAdoptionForm(false)}
                    onSubmitSuccess={handleAdoptionSuccess}
                />
            )}
        </div>
    );
}