import pg from 'pg'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

dotenv.config({ path: fileURLToPath(new URL('../../.env', import.meta.url)) })

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/pethome_group3'
const pool = new pg.Pool({ connectionString: DATABASE_URL })

export const query = (text, params) => pool.query(text, params)

export default pool
