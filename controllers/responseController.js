let fname = 'responseController.js';
console.log(`${fname} starting...`);  //MMR REMOVE WHEN LIVE


function sendOkResponse(req, res) {
  res.json({
    status: 'ok',
    data: res.locals.boat || res.locals.boats
  })
}

function sendErrorResponse(err, req, res, next) {
  res.json({
    status: 'Error',
    message: err.message
  })
}

module.exports = {
  sendOkResponse,
  sendErrorResponse
}
console.log(`${fname} complete.`);  //MMR REMOVE WHEN LIVE
