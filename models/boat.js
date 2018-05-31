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
  // if (!boat.creator_id) boat.creator_id = null;
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


module.exports = {
  getAll,
  create,
  getOne,
  destroy,
  update
};
console.log(`${fname} complete.`);
