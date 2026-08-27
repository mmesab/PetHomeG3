import express from 'express'
import { query } from '../database/index.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const { userId } = req.query
  try {
    if (userId) {
      const result = await query('SELECT * FROM adoption_requests WHERE user_id = $1', [userId])
      return res.json({ ok: true, adoptions: result.rows })
    }
    const result = await query('SELECT * FROM adoption_requests')
    res.json({ ok: true, adoptions: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, message: 'Error al obtener adopciones' })
  }
})

router.post('/', async (req, res) => {
  const { userId, petId, name, email, message } = req.body
  try {
    const result = await query(
      'INSERT INTO adoption_requests (user_id, pet_id, name, email, message) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [userId, petId, name, email, message]
    )
    res.json({ ok: true, adoption: result.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, message: 'Error al crear solicitud' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await query('DELETE FROM adoption_requests WHERE id = $1', [req.params.id])
    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, message: 'Error al cancelar solicitud' })
  }
})

export default router
