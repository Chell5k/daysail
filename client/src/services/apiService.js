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

function createBoat(boat) {
  console.log('apiService - createBoat - boat', boat);
  return fetch('/api/boats', {
    method: 'POST',
    body: JSON.stringify(boat),
    headers: {
      'content-type': 'application/json'
    }
  }).then(checkStatus);
}


function deleteBoat(id) {
  return fetch(`/api/boats/${id}`, {
    method: 'DELETE',
  }).then(checkStatus)
}

function updateBoat(boat, id) {
  return fetch(`/api/boats/${id}`, {
    method: 'PUT',
    body: JSON.stringify(boat),
    headers: {
      'content-type': 'application/json'
    }
  }).then(checkStatus)
}

export {
  getBoats,
  getOneBoat,
  createBoat,
  deleteBoat,
  updateBoat,
  // login
}
