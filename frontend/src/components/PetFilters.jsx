export default function PetFilters({ filters, onFilterChange }) {
    return (
        <div style={{
            backgroundColor: '#fff',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '24px',
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
            {/* Filtro por especie */}
            <div style={{ flex: '1', minWidth: '150px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 'bold' }}>Especie:</label>
                <select
                    name="species"
                    value={filters.species}
                    onChange={onFilterChange}
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                    <option value="">Todas</option>
                    <option value="DOG">Perro</option>
                    <option value="CAT">Gato</option>
                </select>
            </div>

            {/* Filtro por estado */}
            <div style={{ flex: '1', minWidth: '150px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 'bold' }}>Estado:</label>
                <select
                    name="status"
                    value={filters.status}
                    onChange={onFilterChange}
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                    <option value="">Todos</option>
                    <option value="AVAILABLE">Disponible</option>
                    <option value="IN_PROCESS">En Proceso</option>
                    <option value="ADOPTED">Adoptado</option>
                </select>
            </div>
        </div>
    );
}