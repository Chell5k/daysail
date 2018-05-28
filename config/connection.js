let fname = 'connection';
console.log(`${fname} starting...`);
const pgp = require ('pg-promise')();
const dbConfig = require('./dbConfig');

module.exports = pgp(dbConfig);
console.log('');
console.log(`${fname} complete.`);
