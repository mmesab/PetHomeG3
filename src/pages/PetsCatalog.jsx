import { useEffect, useState, useRef } from 'react'
import PetCard from '../components/PetCard.jsx'
import PetFilters from '../components/PetFilters.jsx'
import Spinner from '../components/Spinner.jsx'
import { getPets } from '../services/petService.js'

const PetsCatalog = ({ onSelectPet }) => {
  const [pets, setPets] = useState([])
  const [filters, setFilters] = useState({ type: 'all', q: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true
    return () => { mounted.current = false }
  }, [])

  useEffect(() => {
    let cancelled = false
    const fetch = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getPets(filters)
        if (!cancelled && mounted.current) setPets(data)
      } catch (err) {
        if (!cancelled && mounted.current) setError(err)
      } finally {
        if (!cancelled && mounted.current) setLoading(false)
      }
    }

    const t = setTimeout(fetch, 250)
    return () => { cancelled = true; clearTimeout(t) }
  }, [filters])

  return (
    <section>
      <h1>Catálogo de mascotas</h1>

      <PetFilters value={filters} onChange={setFilters} />

      {loading && (
        <div style={{padding:24,textAlign:'center'}}><Spinner size={28} /> <div style={{marginTop:8}}>Cargando...</div></div>
      )}

      {error && (
        <div style={{padding:20,textAlign:'center'}}>
          <div>Error al cargar mascotas.</div>
          <button className="primary" onClick={() => setFilters({...filters})}>Reintentar</button>
        </div>
      )}

      {!loading && !error && pets.length === 0 && (
        <div style={{padding:20,textAlign:'center'}}>
          <div>No se encontraron mascotas.</div>
          <button className="primary" onClick={() => setFilters({ type: 'all', q: '' })} style={{marginTop:8}}>Ver todas</button>
        </div>
      )}

      <div className="pet-grid">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} onSelect={() => onSelectPet && onSelectPet(pet)} />
        ))}
      </div>
    </section>
  )
}

export default PetsCatalog
