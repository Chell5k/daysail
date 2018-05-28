let fname = 'boats.js (model file)';  //MMR REMOVE
console.log(`${fname} starting...`);  //MMR REMOVE

const db = require('../config/connection');

//get all
function getAll() {
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
  if (!boat.creator_id) boat.creator_id = null;
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
    SET photo = $/photo/,
      description = $/description/,
      location = $/location/
    WHERE boat_id = $/boat_id/
    RETURNING *
    `, boat
  );
}
// Test it here. This chunk will be removed when the model is built out.
let revisedBoat = {
  creator_id: "Alan",
  photo:  "tbd",
  description: "FramBoise",
  location:"New Joisy",
  boat_id: 2
  };

console.log(`${fname} - before revisions`);
getAll()
.then(data =>{
  console.log(data);
}).catch(err => {
  console.log(err.message);
});


update (revisedBoat)
.then(data =>{
  console.log(data);
}).catch(err => {
  console.log(err.message);
});
console.log(`${fname} - get all boats to see that the revised one is there.`);

getAll()
.then(data =>{
  console.log(data);
}).catch(err => {
  console.log(err.message);
});

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
