let fname = 'boatsRouter.js';
console.log(`${fname} starting...`);  //MMR REMOVE WHEN LIVE

const br = require('express').Router();

const authController = require('../controllers/authController');
const boatsController = require('../controllers/boatsController');
const responseController = require('../controllers/responseController');

br.route('/')
  .get(
    boatsController.getAll,
    responseController.sendOkResponse,
    responseController.sendErrorResponse
  )
  // .post(
  // boatsController.create,
  // responseController.sendOkResponse,
  // responseController.sendErrorResponse
  // );
  .post(
    authController.restrict,
    boatsController.create,
    responseController.sendOkResponse,
    responseController.sendErrorResponse
  );

br.route('/:id')
  .get(
    boatsController.getOne,
    responseController.sendOkResponse,
    responseController.sendErrorResponse
  )
  .put(
    boatsController.update,
    responseController.sendOkResponse,
    responseController.sendErrorResponse
  )
  .delete(
    boatsController.destroy,
    responseController.sendOkResponse,
    responseController.sendErrorResponse
  );

br.route('/faves/')
  .post(
    boatsController.createFave,
    responseController.sendOkResponse,
    responseController.sendErrorResponse
);

br.route('/faves/:user')
  .get(
    boatsController.getFaves,
    responseController.sendOkResponse,
    responseController.sendErrorResponse
  )
  .delete(boatsController.destroyFave,
    responseController.sendOkResponse,
    responseController.sendErrorResponse
  );
;

module.exports = br;
console.log(`${fname} complete.`);  //MMR REMOVE WHEN LIVE
