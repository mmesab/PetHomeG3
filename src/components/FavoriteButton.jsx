import { useState } from 'react'
import { addFavorite, removeFavorite } from '../services/favoriteService.js'

const FavoriteButton = ({ petId, initial = false }) => {
  const [isFav, setIsFav] = useState(initial)
  const [loading, setLoading] = useState(false)

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
    } catch (e) {
      // ignore for now
    } finally {
      setLoading(false)
    }
  }

  return (
    <button className={`favorite-btn ${isFav ? 'active' : ''}`} onClick={toggle} disabled={loading} type="button">
      {loading ? '...' : isFav ? 'Favorito ❤️' : 'Guardar como favorito'}
    </button>
  )
}

export default FavoriteButton
