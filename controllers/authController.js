let fname = 'authController.js';
console.log(`${fname} starting...`);  //MMR REMOVE WHEN LIVE
const tokenService = require('../services/tokenService');
const userModel = require('../models/user');

function receiveToken(req, res, next) {
  if(req.headers.authorization) {
    console.log('authController - receiveToken - req.authToken: ', req.authToken);
    req.authToken = req.headers.authorization.replace(/^Bearer\s/, '');
  }
  next();
}

function restrict(req, res, next) {
  tokenService.verify(req.authToken)
  .then(data => {
    res.locals.user = data;
    console.log('authController - restrict - res.locals.user', res.locals.user)
    next();
  })
  .catch(err => res.status(401).json({
    status: 'Error',
    message: 'Invalid credentials'
  }))
}

function register(req, res) {
  console.log(`${fname} - register - req.body`, req.body)
  userModel.register(req.body)
    .catch(err => res.status(401).json({
      message: 'Username taken'
    }))
    .then(data => tokenService.makeToken({
      username: data.username,
      id: data.user_id
    }))
    .then(token => {
      res.json({
        token
      })
    });
}

function login(req, res, next) {
  userModel.login(req.body)
    .then(data => {
      console.log('authController - login -- about to make token with this data object; ', data);
      return tokenService.makeToken({
      id: data.user_id,
      username: data.username
    })})
    .then(token => {
      res.json({
        token
      })
    }).catch(err => {
      console.log(err)
      res.status(401).json({
      status: 'Error',
      message: 'Invalid credentials'
    })})
}

module.exports = {
  receiveToken,
  register,
  restrict,
  login
}

console.log(`${fname} complete.`);  //MMR REMOVE WHEN LIVE
