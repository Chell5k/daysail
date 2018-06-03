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

// function show_req_res

function create(req, res, next) {
  // creator_id: res.locals.user && res.locals.user.username
   //   ...req.body,
  console.log(`boatsController - req.body: `, req.body);
  boatDb.create(req.body)
    .then(data => {
      res.locals.boat = data;
      next();
    })
    .catch(next);
}

function update(req, res, next) {
  console.log(`${fname} req.body: `, req.body);
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


function getFaves (req, res, next) {
  console.log('========')
  console.log('getFaves-controller req.params', req.params) // {user: 'daniel'}
  console.log('getFaves-controller req.params.user', req.params.user) // daniel
    console.log('getFaves-controller req.body', req.body) // {}
  // console.log('++++++++')
  // console.log('getFaves-controller req.', req)
  boatDb.getFaves(req.params)
    .then((data) => {
      res.locals.boats = data;
      next()
    })
    .catch(next);
}

// MMR use a block like this to test functions
// function getFaves (req, res, next) {
//   boatDb.getFaves(req.params.username)
//     .then((data) => {
//  //     res.locals.boatFaves = data;
//       console.log(data);
//     })
//     .catch(next);
// }

// let req = {};
// let res = {};
// req['params'] = {};
// req['params']['username'] = 'daniel';
// getFaves(req, res);

module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy,
  getFaves
};

console.log(`${fname} complete.`);  //MMR REMOVE WHEN LIVE
