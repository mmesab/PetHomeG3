import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CenterDetail = () => {
    const { id } = useParams();
    const [center, setCenter] = useState(null);
    const [centerPets, setCenterPets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulación de fetch a API backend /centers/:id
        const fetchCenterData = async () => {
            try {
                setLoading(true);
                // Reemplazar con llamada real fetch(`/api/centers/${id}`)
                const mockCenter = {
                    id,
                    name: "Refugio Esperanza",
                    location: "Madrid",
                    contact: "contacto@refugioesperanza.org",
                    description: "Dedicados al rescate y cuidado de animales abandonados."
                };
                const mockPets = [
                    { id: 101, name: "Luna", species: "Perro", status: "Disponible" },
                    { id: 102, name: "Milo", species: "Gato", status: "En proceso" }
                ];

                setCenter(mockCenter);
                setCenterPets(mockPets);
            } catch (error) {
                console.error("Error al cargar la información del centro:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCenterData();
    }, [id]);

    if (loading) return <div>Cargando información del refugio...</div>;
    if (!center) return <div>No se encontró el refugio.</div>;

    return (
        <div className="center-detail-container">
            <header className="center-header">
                <h1>{center.name}</h1>
                <p><strong>Ubicación:</strong> {center.location}</p>
                <p><strong>Contacto:</strong> {center.contact}</p>
                <p>{center.description}</p>
            </header>

            <hr />

            <section className="center-catalog">
                <h2>Catálogo de Animales en este Refugio</h2>
                <div className="pets-grid">
                    {centerPets.map((pet) => (
                        <div key={pet.id} className="pet-card">
                            <h3>{pet.name}</h3>
                            <p>Especie: {pet.species}</p>
                            <p>Estado: {pet.status}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CenterDetail;