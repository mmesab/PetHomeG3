import { useState } from 'react';

export default function FavoriteButton({ petId, initialIsFavorite = false }) {
    const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        // Simulación del evento de guardado
        console.log(`Pet ${petId} favorite state set to: ${!isFavorite}`);
    };

    return (
        <button
            onClick={toggleFavorite}
            style={{
                padding: '8px 16px',
                backgroundColor: isFavorite ? '#ff4d4f' : '#e0e0e0',
                color: isFavorite ? '#fff' : '#000',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            }}
        >
            {isFavorite ? '❤️ En Favoritos' : '🤍 Añadir a Favoritos'}
        </button>
    );
}