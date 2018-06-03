let fname = 'boat.js (model file)';  //MMR REMOVE
console.log(`${fname} starting...`);  //MMR REMOVE

const db = require('../config/connection');

//get all
function getAll() {
  console.log(`${fname} handling getAll`);
  return queryPromise = db.any(`
    SELECT * FROM boats`)
}

// get one
function getOne(id) {
  return queryPromise = db.one(`
    SELECT * FROM boats
    WHERE boat_id = $1
    `, id
  );
}

// create
function create(boat) {
  // provide default value of null for creator_id.
 console.log(`${fname} create - 1. contents of new boat object: `, boat);
  if (!boat.creator_id) boat.creator_id = null;
  console.log(`${fname} create - 2. contents of new boat object: `, boat);
  return queryPromise = db.one(`
    INSERT INTO boats (creator_id, photo, description, location)
    VALUES ($/creator_id/, $/photo/, $/description/, $/location/)
    RETURNING *
    `, boat
  );
}

// update
// Since We plan to permit only the owner of the boat to update boat info, we will
// not include the creator_id in the list of attributes to update.
function update(boat) {
  return queryPromise = db.one(`
    UPDATE boats
    SET photo = $/photo/, description = $/description/, location = $/location/
    WHERE boat_id = $/boat_id/
    RETURNING *
    `, boat
  );
}

// destroy
function destroy(id) {
  return queryPromise = db.none(`
    DELETE FROM boats WHERE boat_id = $1
    `, id
  );
}

// faves
// function getFaves(user) {
//   return queryPromise = db.any(`
//     SELECT
//       b.boat_id,
//       b.description,
//       b.location,
//       b.photo
//     FROM boat_faves bf
//     INNER JOIN  boats b
//     ON bf.boat_id = b.boat_id
//     WHERE bf.username = $1
//     `, user
//     );
// }

function getFaves(userObj) {
  console.log('getFaves-model: userObj', userObj)
  //MMR Look into the following issue: When I called db.any with req.params.id from the controller, I got nothing back.
  //The query looked like: return queryPromise = db.any('SELECT * FROM boat_faves WHERE username = $1', user);
  //To fix,  I called db.any with the object req.params, which is {user: 'daniel'}, for example. To make things clear,
  //I changed the model function definition to be function getFaves(userObj).
  //Also: in the heat of the moment i added the output to res.locals.boatfaves, but the function
  //that turns it into json is looking for ONLY res.locals.boat OR res.locals.boats. So the
  //api appeared to be "working", but no data was back. the json wrapping function is:
  //responseController.sendOKResponse.
return queryPromise = db.any(`SELECT boat_id FROM boat_faves WHERE username = $/user/`, userObj);

}

//MMR use a test block like this to test functions in this file
// let user = 'daniel';
// getFaves(user)
// .then(data =>{
//   console.log(data);
// }).catch(err => {
//   console.log(err.message);
// });

module.exports = {
  getAll,
  create,
  getOne,
  destroy,
  update,
  getFaves
};
console.log(`${fname} complete.`);
