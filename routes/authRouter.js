let fname = 'authRouter.js';
console.log(`${fname} starting...`);  //MMR REMOVE WHEN LIVE
const ar = require('express').Router();
const authController = require('../controllers/authController');

ar.get('/', authController.restrict, (req, res) => res.json({
    user: res.locals.user
  }));
ar.post('/register', authController.register);
ar.post('/login', authController.login);


module.exports = ar;

console.log(`${fname} complete.`);  //MMR REMOVE WHEN LIVE
