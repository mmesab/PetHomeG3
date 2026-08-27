import { readFileSync } from 'fs'
import { execSync } from 'child_process'
import pg from 'pg'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) })

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/pethome_group3'
const pool = new pg.Pool({ connectionString: DATABASE_URL })

async function run() {
  try {
    const sql = readFileSync(fileURLToPath(new URL('./init.sql', import.meta.url)), 'utf8')
    console.log('Creating schema...')
    await pool.query(sql)

    console.log('Inserting seeds...')

    // Insert a couple centers
    const c1 = await pool.query("INSERT INTO centers (name, address) VALUES ($1,$2) RETURNING id", ['Centro Central', 'Calle 1'])
    const c2 = await pool.query("INSERT INTO centers (name, address) VALUES ($1,$2) RETURNING id", ['Centro Norte', 'Avenida 2'])

    // Insert users
    const u1 = await pool.query("INSERT INTO users (name,email) VALUES ($1,$2) RETURNING id", ['Usuario Demo', 'demo@example.com'])

    // Insert pets (expanded set for testing)
    const pets = [
      ['Luna','Labrador','2 años','dog','https://images.unsplash.com/photo-1517849845537-4d257902454a', c1.rows[0].id],
      ['Milo','Gato europeo','1 año','cat','https://images.unsplash.com/photo-1511044568932-338cba0ad803', c2.rows[0].id],
      ['Nala','Golden Retriever','3 años','dog','https://images.unsplash.com/photo-1507149833265-60c372daea22', c1.rows[0].id],
      ['Simba','Siamés','4 años','cat','https://images.unsplash.com/photo-1518791841217-8f162f1e1131', c2.rows[0].id],
      ['Koko','Husky','1 año','dog','https://images.unsplash.com/photo-1517423440428-a5a00ad493e8', c1.rows[0].id],
      ['Pepper','Conejo','2 años','other','https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9', c1.rows[0].id],
      ['Coco','Border Collie','5 años','dog','https://images.unsplash.com/photo-1525253086316-d0c936c814f8', c2.rows[0].id],
      ['Misha','Persa','3 años','cat','https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13', c2.rows[0].id],
      ['Bruno','Bulldog','4 años','dog','https://images.unsplash.com/photo-1558944351-d2c9c5b9d1f7', c1.rows[0].id],
      ['Lola','Beagle','2 años','dog','https://images.unsplash.com/photo-1516280440614-37939bbacd81', c2.rows[0].id],
      ['Oreo','Gato atigrado','6 meses','cat','https://images.unsplash.com/photo-1543852786-1cf6624b9987', c1.rows[0].id],
      ['Bella','Poodle','3 años','dog','https://images.unsplash.com/photo-1548191265-cc70d3d45ba1', c2.rows[0].id],
      ['Rocky','Pastor Alemán','5 años','dog','https://images.unsplash.com/photo-1508672019048-805c876b67e2', c1.rows[0].id],
      ['Kitty','Maine Coon','2 años','cat','https://images.unsplash.com/photo-1543852786-1cf6624b9987', c2.rows[0].id],
      ['Toby','Pomerania','1 año','dog','https://images.unsplash.com/photo-1520813792240-56fc4a3765a7', c1.rows[0].id],
      ['Gizmo','Hámster','1 año','other','https://images.unsplash.com/photo-1516972810927-80185027ca84', c2.rows[0].id],
      ['Lucy','Dálmata','3 años','dog','https://images.unsplash.com/photo-1546182990-dffeafbe841d', c1.rows[0].id],
      ['Mochi','Gato japonés','4 años','cat','https://images.unsplash.com/photo-1518717758536-85ae29035b6d', c2.rows[0].id],
      ['Bobby','Chihuahua','2 años','dog','https://images.unsplash.com/photo-1525253086316-d0c936c814f8', c1.rows[0].id],
      ['Pippa','Cobaya','1 año','other','https://images.unsplash.com/photo-1548199973-03cce0bbc87b', c2.rows[0].id]
    ]

    for (const p of pets) {
      await pool.query("INSERT INTO pets (name,breed,age,type,image,center_id) VALUES ($1,$2,$3,$4,$5,$6)", p)
    }

    console.log('Seed finished')
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

run()
