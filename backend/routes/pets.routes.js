import express from 'express'
import { query } from '../database/index.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const { type, q } = req.query
  try {
    let sql = 'SELECT * FROM pets'
    const params = []
    const where = []
    if (type && type !== 'all') { where.push(`type = $${params.length + 1}`); params.push(type) }
    if (q) { where.push(`LOWER(name || ' ' || COALESCE(breed,'')) LIKE $${params.length + 1}`); params.push(`%${q.toLowerCase()}%`) }
    if (where.length) sql += ' WHERE ' + where.join(' AND ')
    const result = await query(sql, params)
    res.json({ ok: true, pets: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, message: 'Error al obtener mascotas' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM pets WHERE id = $1', [req.params.id])
    if (!result.rows.length) return res.status(404).json({ ok: false, message: 'Mascota no encontrada' })
    res.json({ ok: true, pet: result.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, message: 'Error al obtener mascota' })
  }
})

export default router
