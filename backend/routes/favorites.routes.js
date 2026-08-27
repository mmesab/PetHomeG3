import express from 'express'
import { query } from '../database/index.js'

const router = express.Router()

// list favorites (optionally by user via ?userId=)
router.get('/', async (req, res) => {
  const { userId } = req.query
  try {
    if (userId) {
      const result = await query('SELECT f.*, p.* FROM favorites f JOIN pets p ON p.id = f.pet_id WHERE f.user_id = $1', [userId])
      return res.json({ ok: true, favorites: result.rows })
    }
    const result = await query('SELECT * FROM favorites')
    res.json({ ok: true, favorites: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, message: 'Error al obtener favoritos' })
  }
})

router.post('/', async (req, res) => {
  const { userId, petId } = req.body
  try {
    await query('INSERT INTO favorites (user_id, pet_id) VALUES ($1,$2) ON CONFLICT DO NOTHING', [userId, petId])
    res.json({ ok: true, message: 'Favorito añadido' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, message: 'Error al añadir favorito' })
  }
})

router.delete('/:petId', async (req, res) => {
  const { petId } = req.params
  const { userId } = req.query
  try {
    await query('DELETE FROM favorites WHERE pet_id = $1 AND user_id = $2', [petId, userId])
    res.json({ ok: true, message: 'Favorito eliminado' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, message: 'Error al eliminar favorito' })
  }
})

export default router
