\c daysail_db

DROP TABLE IF EXISTS boat_faves;
DROP TABLE IF EXISTS boats;
DROP TABLE IF EXISTS users;

CREATE TABLE users  (
   user_id     SERIAL PRIMARY KEY,
   username    VARCHAR(255) UNIQUE,
   email       VARCHAR (255),
   password    VARCHAR(255)
);

CREATE TABLE boats (
   boat_id     SERIAL PRIMARY KEY,
   creator_id  VARCHAR (255) REFERENCES users (username) ON DELETE CASCADE,
   photo       TEXT,
   description VARCHAR (255),
   location    VARCHAR (255)
);


CREATE TABLE boat_faves  (
   bf_id       SERIAL PRIMARY KEY,
   username    VARCHAR (255) REFERENCES users (username) ON DELETE CASCADE,
   boat_id     INTEGER REFERENCES boats (boat_id) ON DELETE CASCADE

);
