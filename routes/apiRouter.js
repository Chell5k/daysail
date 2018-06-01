let fname = 'apiRouter.js';
console.log(`${fname} starting...`);  //MMR REMOVE WHEN LIVE

const apiRouter = require('express').Router();
const boatsRouter = require('./boatsRouter');
const authRouter = require('./authRouter');

apiRouter.use('/boats', boatsRouter);
apiRouter.use('/auth', authRouter);

module.exports = apiRouter;
console.log(`${fname} complete.`);  //MMR REMOVE WHEN LIVE
