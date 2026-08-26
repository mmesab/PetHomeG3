import { Link } from 'react-router-dom';

export default function PetCard({ pet }) {
    return (
        <div style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#fff',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <img
                src={pet.imageUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500'}
                alt={pet.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div style={{ padding: '16px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>{pet.name}</h3>
                        <span style={{
                            backgroundColor: pet.status === 'AVAILABLE' ? '#28a745' : '#ffc107',
                            color: '#fff',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '12px'
                        }}>
                            {pet.status === 'AVAILABLE' ? 'Disponible' : pet.status}
                        </span>
                    </div>
                    <p style={{ margin: '4px 0', color: '#666', fontSize: '14px' }}>
                        {pet.species === 'DOG' ? '🐕 Perro' : '🐈 Gato'} • {pet.breed}
                    </p>
                    <p style={{ margin: '4px 0', color: '#666', fontSize: '14px' }}>
                        📍 {pet.city}, {pet.region}
                    </p>
                </div>

                <Link
                    to={`/pets/${pet.id}`}
                    style={{
                        marginTop: '16px',
                        display: 'block',
                        textAlign: 'center',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        fontWeight: 'bold'
                    }}
                >
                    Ver Ficha
                </Link>
            </div>
        </div>
    );
}