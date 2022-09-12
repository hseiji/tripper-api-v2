DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  lat DECIMAL NOT NULL,
  lng DECIMAL NOT NULL
);

INSERT INTO users (name, email, password, lat, lng) VALUES ('Shakespeare', 'shakespeare@lighthouse.com', 'password', 51.50804, -0.09722);