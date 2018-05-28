let fname = 'dbConfig.js';
console.log(`${fname} starting...`);

module.exports = process.env.DATABASE_URL || {
  host: 'localhost',
  port: 5432,
  database: 'daysail_db'
}
console.log(`${fname} complete.`);
