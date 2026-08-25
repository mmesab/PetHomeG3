const PetCard = ({ pet }) => {
  return (
    <article className="pet-card">
      <img src={pet.image} alt={pet.name} style={{ maxWidth: '256px' }} />
      <h3>{pet.name}</h3>
      <p>{pet.breed}</p>
      <p>{pet.age}</p>
    </article>
  )
}

export default PetCard
