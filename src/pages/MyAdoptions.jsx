import { useEffect, useState } from 'react'
import { getMyAdoptions, cancelAdoption } from '../services/adoptionService.js'

const MyAdoptions = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const data = await getMyAdoptions()
    setItems(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleCancel = async (id) => {
    await cancelAdoption(id)
    load()
  }

  return (
    <section>
      <h1>Mis adopciones</h1>
      {loading && <p>Cargando...</p>}
      {!loading && items.length === 0 && <p>No tienes adopciones registradas.</p>}
      <ul className="adoptions-list">
        {items.map((a) => (
          <li key={a.id} className="adoption-item">
            <div>
              <strong>{a.petName || 'Mascota'}</strong>
              <div className="muted">{a.status || 'Pendiente'}</div>
            </div>
            <div>
              <button className="danger" onClick={() => handleCancel(a.id)}>Cancelar</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default MyAdoptions
