DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS plans CASCADE;
DROP TABLE IF EXISTS events CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  lat DECIMAL NOT NULL,
  lng DECIMAL NOT NULL
);

CREATE TABLE plans (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  ordering INTEGER NOT NULL,
  user_email VARCHAR(255) NOT NULL
);

CREATE TABLE events (
  id VARCHAR(255) PRIMARY KEY NOT NULL,
  plan_id INTEGER REFERENCES plans(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(255) NOT NULL,
  lat DECIMAL NOT NULL,
  lng DECIMAL NOT NULL,
  date_time TIMESTAMP,
  street_address VARCHAR(255),
  completed_at TIMESTAMP,
  done BOOLEAN DEFAULT FALSE,
  image_url VARCHAR(255)
);

INSERT INTO users (name, email, password, lat, lng) VALUES ('Shakespeare', 'shakespeare@lighthouse.com', 'password', 51.50804, -0.09722);
INSERT INTO users (name, email, password, lat, lng) VALUES ('Homer', 'homer@buup.com', '$2b$10$DscBYJSvdb6cC8UjnaTSIuCea9ZyIPDZsS5SbAGYRWUh.xE65Ix/y', 51.50804, -0.09722);
INSERT INTO plans (user_id, name, ordering, user_email) VALUES (1, 'Road Trip', 1, 'shakespeare@lighthouse.com');
INSERT INTO plans (user_id, name, ordering, user_email) VALUES (2, 'Fun Weekend', 1, 'homer@buup.com');
INSERT INTO events (id, plan_id, name, description, image, lat, lng, date_time, street_address, image_url) VALUES ('1', 1, 'CN Tower', 'Tower', 'https://www.yelp.com/biz/cn-tower-toronto?adjust_creative=zGbNrmtfS5j0G5IKmn8ufA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=zGbNrmtfS5j0G5IKmn8ufA', 43.64446719365264, -79.38649706503828, NOW(), '290 Bremner Blvd', 'https://upload.wikimedia.org/wikipedia/commons/9/96/Toronto_-_ON_-_Toronto_Harbourfront7.jpg');
INSERT INTO events (id, plan_id, name, description, image, lat, lng, date_time, street_address, image_url) VALUES ('2', 1, 'Ripley''s Aquarium', 'Aquarium', 'https://www.yelp.com/biz/ripleys-aquarium-of-canada-toronto?adjust_creative=zGbNrmtfS5j0G5IKmn8ufA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=zGbNrmtfS5j0G5IKmn8ufA', 43.64220060887206, -79.3864107609249, NOW(), '288 Bremner Blvd', 'https://s3-media2.fl.yelpcdn.com/bphoto/caawISyq97XW60cHzoSrtg/o.jpg');