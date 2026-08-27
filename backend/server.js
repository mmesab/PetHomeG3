import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import petsRoutes from './routes/pets.routes.js'
import favoritesRoutes from './routes/favorites.routes.js'
import adoptionsRoutes from './routes/adoptions.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Backend funcionando' })
})

app.use('/api/pets', petsRoutes)
app.use('/api/favorites', favoritesRoutes)
app.use('/api/adoptions', adoptionsRoutes)

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
