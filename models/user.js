const db = require('../config/connection');
let fname = 'user.js (model)';
const bcrypt = require('bcrypt');
const saltRounds = 12;

function register(credentials)  {
  console.log(`${fname} - register - credentials: `, credentials);
  return bcrypt.hash(credentials.password, saltRounds)
  .then(hash => {
    const newUser = {
      username: credentials.username,
      email: credentials.email,
      password: hash
    };
    console.log(`${fname} - register - after hashing: `, newUser);
    return db.one(`
      INSERT INTO users (username, email, password)
      VALUES ($/username/, $/email/, $/password/)
      RETURNING user_id, username, email
      `, newUser)
  });
}

function findByUsername(username) {
  console.log(`${fname} - findbyUsername - checking for ${username}`)
  return db.one(`
    SELECT * FROM users
    WHERE username = $1
    `, username);
}

function login (credentials)  {
  return findByUsername(credentials.username)
  .then(username => {
    return bcrypt.compare(credentials.password, username.password)
    .then(match => {
      if(!match) throw new Error('Credentials do not match');
      console.log(`user.js (model) login: match, credentials, username`, match, credentials, username);
      delete username.password;
      return username;
    })
  })

}

module.exports = {
  register,
  login
}
