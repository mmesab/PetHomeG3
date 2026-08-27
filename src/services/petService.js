// Fetch-based pet service pointing to backend API

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export const getPets = async (filters = {}) => {
  const params = new URLSearchParams()
  if (filters.type) params.set('type', filters.type)
  if (filters.q) params.set('q', filters.q)

  const res = await fetch(`${API_BASE}/api/pets?${params.toString()}`)
  if (!res.ok) throw new Error('Failed to fetch pets')
  const body = await res.json()
  return body.pets || []
}

export const getPetById = async (id) => {
  const res = await fetch(`${API_BASE}/api/pets/${id}`)
  if (!res.ok) return null
  const body = await res.json()
  return body.pet || null
}
