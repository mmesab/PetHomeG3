import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ ok: true, favorites: [] })
})

router.post('/', (req, res) => {
  res.json({ ok: true, message: 'Favorito añadido' })
})

export default router
