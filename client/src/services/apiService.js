function checkStatus(resp) {
  if (!resp.ok) throw new Error(resp.statusMessage);
  return resp.json();
}

function getBoats() {
  console.log('apiService - getBoats - running a fetch');
  return fetch('/api/boats').then(checkStatus);
}

function getOneBoat(id) {
  return fetch('/api/boats/'+id).then(checkStatus);
}

export {
  getBoats,
  getOneBoat,
  // createBoat,
  // deleteBoat,
  // updateBoat,
  // login
}
