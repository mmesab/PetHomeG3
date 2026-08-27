const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'
const USER_ID = 1

export const createAdoption = async (data, userId = USER_ID) => {
  const body = { ...data, userId }
  const res = await fetch(`${API_BASE}/api/adoptions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('Failed to create adoption')
  return await res.json()
}

export const getMyAdoptions = async (userId = USER_ID) => {
  const res = await fetch(`${API_BASE}/api/adoptions?userId=${userId}`)
  if (!res.ok) throw new Error('Failed to fetch adoptions')
  const body = await res.json()
  return body.adoptions || []
}

export const getAdoptionById = async (id) => {
  const res = await fetch(`/api/adoptions/${id}`)
  if (!res.ok) return null
  const body = await res.json()
  return body.adoption || null
}

export const cancelAdoption = async (id) => {
  const res = await fetch(`${API_BASE}/api/adoptions/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to cancel adoption')
  return await res.json()
}
