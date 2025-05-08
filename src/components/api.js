const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-37',
  headers: {
    authorization: '5621a962-7eb0-4a78-a895-69836ca0d6a5',
    'Content-Type': 'application/json'
  }
}

function checkResponse (res) {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function getUser () {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then((res) => checkResponse(res));
}

export function getCardsList () {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then((res) => checkResponse(res));
}

export function editProfile (nameInput, jobInput) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
  })
  .then((res) => checkResponse(res));
}

export function addNewCardApi (newCardName, newCardUrl) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: newCardName.value,
      link: newCardUrl.value
    })
  })
  .then((res) => checkResponse(res))
  .then((data) => {
    return data;
  })
}

export function updateAvatar (updateAvatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: updateAvatarUrl.value
    })
  })
  .then((res) => checkResponse(res))
  .then((data) => {
    return data
  })
}

export function deleteCardApi (cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => checkResponse(res))
}

export function likeApi (currentIsLiked, cardId) {
  if (!currentIsLiked) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers
    })
    .then((res) => checkResponse(res))
    .then((data) => {
      return {likes: data.likes, isLikedApi: true};
    })
  } else {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then((res) => checkResponse(res))
    .then((data) => {
      return {likes: data.likes, isLikedApi: false};
    })
  }
}