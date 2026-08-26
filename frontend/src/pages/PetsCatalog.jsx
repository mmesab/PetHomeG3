import { useState } from 'react';
import { mockPets } from '../mocks/pets.mock';
import PetCard from '../components/PetCard';
import PetFilters from '../components/PetFilters';

export default function PetsCatalog() {
    const [filters, setFilters] = useState({
        species: '',
        status: ''
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    // Filtrado visual local para el Día 1
    const filteredPets = mockPets.filter(pet => {
        const matchesSpecies = !filters.species || pet.species === filters.species;
        const matchesStatus = !filters.status || pet.status === filters.status;
        return matchesSpecies && matchesStatus;
    });

    return (
        <div>
            <h2 style={{ color: '#2c3e50', marginBottom: '16px' }}>Mascotas en Adopción</h2>

            {/* Componente Filtros */}
            <PetFilters filters={filters} onFilterChange={handleFilterChange} />

            {/* Grid del Catálogo */}
            {filteredPets.length === 0 ? (
                <p>No se encontraron mascotas con los filtros seleccionados.</p>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '20px'
                }}>
                    {filteredPets.map(pet => (
                        <PetCard key={pet.id} pet={pet} />
                    ))}
                </div>
            )}
        </div>
    );
}