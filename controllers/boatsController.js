let fname = 'boatsController.js';
console.log(`${fname} starting...`);  //MMR REMOVE WHEN LIVE

const boatDb = require('../models/boat');

function getAll(req, res, next) {
  boatDb.getAll()
    .then(data => {
      res.locals.boats = data;
      next();
    })
    .catch(next);
}

function getOne(req, res, next) {
  boatDb.getOne(req.params.id)
    .then(data => {
      res.locals.boat = data;
      next();
    })
    .catch(next);
}

function create(req, res, next) {
  boatDb.create({
    ...req.body,
    creator_id: res.locals.user && res.locals.user.id
  })
    .then(data => {
      res.locals.boat = data;
      next();
    })
    .catch(next);
}

function update(req, res, next) {
  boatDb.update(req.body)
    .then(data => {
      res.locals.boat = data;
      next();
    })
    .catch(next);
}

function destroy(req, res, next) {
  boatDb.destroy(req.params.id)
    .then(() => {
      next()
    })
    .catch(next);
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy
};

console.log(`${fname} complete.`);  //MMR REMOVE WHEN LIVE
