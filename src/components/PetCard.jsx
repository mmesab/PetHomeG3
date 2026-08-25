const PetCard = ({ pet, onSelect }) => {
  return (
    <article
      className="pet-card"
      onClick={() => onSelect && onSelect()}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onKeyDown={(e) => {
        if (onSelect && (e.key === 'Enter' || e.key === ' ')) onSelect()
      }}
    >
      <img src={pet.image} alt={pet.name} style={{ maxWidth: '256px' }} />
      <h3>{pet.name}</h3>
      <p>{pet.breed}</p>
      <p>{pet.age}</p>
    </article>
  )
}

export default PetCard
