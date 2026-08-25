import express from 'express'

const router = express.Router()

const pets = [
  { id: 1, name: 'Luna', type: 'dog', breed: 'Labrador', age: '2 años', image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a' },
  { id: 2, name: 'Milo', type: 'cat', breed: 'Gato europeo', age: '1 año', image: 'https://images.unsplash.com/photo-1511044568932-338cba0ad803' },
]

router.get('/', (req, res) => {
  res.json({ ok: true, pets })
})

router.get('/:id', (req, res) => {
  const pet = pets.find((item) => String(item.id) === String(req.params.id))

  if (!pet) {
    return res.status(404).json({ ok: false, message: 'Mascota no encontrada' })
  }

  return res.json({ ok: true, pet })
})

export default router
