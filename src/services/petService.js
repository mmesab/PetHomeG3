import { petsMock } from '../mocks/pets.mock.js'

// Simulate a backend service for pets using the local mock data.
// Accepts a `filters` object: { type, q }
export const getPets = async (filters = {}) => {
  const { type, q } = filters
  // simulate latency
  await new Promise((res) => setTimeout(res, 450))

  let data = petsMock.slice()
  if (type && type !== 'all') {
    data = data.filter((p) => p.type === type)
  }
  if (q) {
    const term = q.toLowerCase()
    data = data.filter((p) => (p.name + ' ' + p.breed).toLowerCase().includes(term))
  }

  return data
}

export const getPetById = async (id) => {
  await new Promise((res) => setTimeout(res, 200))
  return petsMock.find((p) => String(p.id) === String(id)) || null
}
