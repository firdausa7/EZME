-- Run once to set up the database: psql $DATABASE_URL -f schema.sql

CREATE TABLE IF NOT EXISTS products (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  price       INTEGER NOT NULL DEFAULT 6000,
  category    VARCHAR(50),
  description TEXT,
  badge       VARCHAR(50),
  thumbnail   VARCHAR(500),
  video       VARCHAR(500),
  images      TEXT[]  DEFAULT '{}',
  colors      JSONB   DEFAULT '[]',
  sizes       TEXT[]  DEFAULT ARRAY['54','56','58','60','62','Custom Made'],
  details     TEXT[]  DEFAULT '{}',
  rating      DECIMAL(3,2) DEFAULT 4.5,
  reviews     INTEGER DEFAULT 0,
  is_new      BOOLEAN DEFAULT false,
  is_best_seller BOOLEAN DEFAULT false,
  archived    BOOLEAN DEFAULT false,
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id              SERIAL PRIMARY KEY,
  order_number    VARCHAR(50) UNIQUE NOT NULL,
  customer_name   VARCHAR(255) NOT NULL,
  customer_phone  VARCHAR(50)  NOT NULL,
  customer_email  VARCHAR(255),
  county          VARCHAR(100),
  address         TEXT,
  notes           TEXT,
  items           JSONB   NOT NULL,
  subtotal        INTEGER NOT NULL,
  delivery        INTEGER NOT NULL DEFAULT 350,
  total           INTEGER NOT NULL,
  payment_method  VARCHAR(50) DEFAULT 'mpesa',
  payment_ref     VARCHAR(100),
  status          VARCHAR(50) DEFAULT 'pending',
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name          VARCHAR(255),
  role          VARCHAR(50) DEFAULT 'admin',
  created_at    TIMESTAMP DEFAULT NOW()
);
