import jwtDecode from 'jwt-decode';

let fname='apiService';

function checkStatus(resp) {
  console.log(`${fname} - checkStatus: resp`);
  if (!resp.ok) throw new Error(resp.statusMessage);
  return resp.json();
}

function saveToken(respBody) {
  console.log(`${fname} - saveToken`);
  localStorage.setItem('authToken', respBody.token)
  const user = jwtDecode(respBody.token);
  console.log(`${fname} - token, decoded user: `,respBody.token, user);
  return user;
}

function getBoats() {
  console.log('apiService - getBoats');
  return fetch('/api/boats').then(checkStatus);
}

function getOneBoat(id) {
  console.log(`${fname} - getOneBoat`);
  return fetch('/api/boats/'+id).then(checkStatus);
}

function createBoat(boat) {
  console.log(`${fname} - createBoat`);
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
  console.log(`${fname} - deleteBoat`);
  return fetch(`/api/boats/${id}`, {
    method: 'DELETE',
  }).then(checkStatus)
}

function updateBoat(boat, id) {
  console.log(`${fname} - updateBoat`);
  return fetch(`/api/boats/${id}`, {
    method: 'PUT',
    body: JSON.stringify(boat),
    headers: {
      'content-type': 'application/json'
    }
  }).then(checkStatus)
}

// Auth requests

function login(creds) {
  console.log(`${fname} - auth - login`);
  return fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(creds),
    headers: {
      'content-type': 'application/json'
    }
  }).then(checkStatus).then(saveToken)
}

function register(creds) {
  console.log(`${fname} - auth - register - creds`, creds);
  return fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(creds),
    headers: {
      'content-type': 'application/json'
    }
  }).then(checkStatus).then(saveToken)
}


export {
  getBoats,
  getOneBoat,
  createBoat,
  deleteBoat,
  updateBoat,
  login,
  register,
}
