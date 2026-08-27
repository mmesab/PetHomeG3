const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'
const USER_ID = 1

export const getFavorites = async (userId = USER_ID) => {
  const res = await fetch(`${API_BASE}/api/favorites?userId=${userId}`)
  if (!res.ok) throw new Error('Failed to fetch favorites')
  const body = await res.json()
  return body.favorites || []
}

export const addFavorite = async (petId, userId = USER_ID) => {
  const res = await fetch(`${API_BASE}/api/favorites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, petId }),
  })
  if (!res.ok) throw new Error('Failed to add favorite')
  return await res.json()
}

export const removeFavorite = async (petId, userId = USER_ID) => {
  const res = await fetch(`${API_BASE}/api/favorites/${petId}?userId=${userId}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to remove favorite')
  return await res.json()
}
