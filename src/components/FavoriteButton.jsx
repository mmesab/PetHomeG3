import { useState } from 'react'
import { addFavorite, removeFavorite } from '../services/favoriteService.js'

const FavoriteButton = ({ petId, initial = false }) => {
  const [isFav, setIsFav] = useState(initial)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const toggle = async () => {
    if (loading) return
    setLoading(true)
    try {
      if (isFav) {
        await removeFavorite(petId)
        setIsFav(false)
      } else {
        await addFavorite(petId)
        setIsFav(true)
      }
      setError(null)
    } catch (e) {
      console.error(e)
      setError('Error al actualizar favorito')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button className={`favorite-btn ${isFav ? 'active' : ''}`} onClick={toggle} disabled={loading} type="button">
        {loading ? '...' : isFav ? 'Favorito ❤️' : 'Guardar como favorito'}
      </button>
      {error && <div style={{color:'#b91c1c',marginTop:6}}>{error}</div>}
    </>
  )
}

export default FavoriteButton
