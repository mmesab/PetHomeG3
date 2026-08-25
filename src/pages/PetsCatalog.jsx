import { petsMock } from '../mocks/pets.mock.js'
import PetCard from '../components/PetCard.jsx'
import PetFilters from '../components/PetFilters.jsx'

const PetsCatalog = () => {
  return (
    <section>
      <h1>Catálogo de mascotas</h1>
      <PetFilters />

      <div>
        {petsMock.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </section>
  )
}

export default PetsCatalog
