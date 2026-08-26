import { useState, useEffect } from 'react';

export default function FavoriteButton({ petId }) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('mock_favorites') || '[]');
        setIsFavorite(favorites.includes(petId));
    }, [petId]);

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('mock_favorites') || '[]');
        let updated;

        if (favorites.includes(petId)) {
            updated = favorites.filter(id => id !== petId);
        } else {
            updated = [...favorites, petId];
        }

        localStorage.setItem('mock_favorites', JSON.stringify(updated));
        setIsFavorite(!isFavorite);
    };

    return (
        <button
            onClick={toggleFavorite}
            style={{
                backgroundColor: isFavorite ? '#dc3545' : '#e9ecef',
                color: isFavorite ? '#fff' : '#495057',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
            }}
        >
            {isFavorite ? '❤️ En Favoritos' : '🤍 Añadir a Favoritos'}
        </button>
    );
}