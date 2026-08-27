-- Schema for pethome_group3

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS centers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT
);

CREATE TABLE IF NOT EXISTS pets (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  breed TEXT,
  age TEXT,
  type TEXT,
  image TEXT,
  center_id INTEGER REFERENCES centers(id)
);

CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  pet_id INTEGER REFERENCES pets(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS adoption_requests (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  pet_id INTEGER REFERENCES pets(id),
  name TEXT,
  email TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
