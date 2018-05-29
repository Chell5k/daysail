function checkStatus(resp) {
  if (!resp.ok) throw new Error(resp.statusMessage);
  return resp.json();
}

function getBoats() {
  return fetch('/api/boats').then(checkStatus);
}

export {
  getBoats,
  // createBoat,
  // deleteBoat,
  // updateBoat,
  // login
}
