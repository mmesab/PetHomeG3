import { useState } from 'react';
import { mockPets } from '../mocks/pets.mock';
import PetCard from '../components/PetCard';
import PetFilters from '../components/PetFilters';

export default function PetsCatalog() {
    const [filters, setFilters] = useState({
        species: '',
        province: '',
        status: ''
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    // Conexión y filtrado por especie, provincia y estado
    const filteredPets = mockPets.filter(pet => {
        const matchesSpecies = !filters.species || pet.species.toLowerCase() === filters.species.toLowerCase();
        const matchesProvince = !filters.province || pet.province.toLowerCase() === filters.province.toLowerCase();
        const matchesStatus = !filters.status || pet.status.toLowerCase() === filters.status.toLowerCase();

        return matchesSpecies && matchesProvince && matchesStatus;
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