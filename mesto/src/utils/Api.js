class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }


  _statusServer(res) {
    if (res.ok) {
      return res.json();
    }
    else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._statusServer)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._statusServer)
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(this._statusServer)
  }

  newAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    }).then(this._statusServer)
  }

  getInitialNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._statusServer)
  }


  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    }).then(this._statusServer)
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.removeLike(id)
    }
    else {
      return this.addLike(id)
    }
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers
    }).then(this._statusServer)
  }

  removeLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers
    }).then(this._statusServer)
  }
};

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: '26eb0ee4-0eb7-4b00-b983-4f5e5dfe8770',
    'Content-Type': 'application/json'
  }
});
