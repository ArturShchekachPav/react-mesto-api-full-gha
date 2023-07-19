class Api {
  constructor({
                baseUrl,
                headers
              }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`,
      {
        method: 'GET',
        credentials: 'include',
      }
    )
      .then(this._checkResponse);
  }

  getProfileData() {
    return fetch(`${this.baseUrl}/users/me`,
      {
        method: 'GET',
        credentials: 'include',
      }
    )
      .then(this._checkResponse);
  }

  editProfileData(name,
                  about
  ) {
    return fetch(`${this.baseUrl}/users/me`,
      {
        method: 'PATCH',
        headers: this.headers,
        credentials: 'include',
        body: JSON.stringify({
          name: name,
          about: about
        })
      }
    )
      .then(this._checkResponse);
  }

  postNewCard(name,
              link
  ) {
    return fetch(`${this.baseUrl}/cards`,
      {
        method: 'POST',
        headers: this.headers,
        credentials: 'include',
        body: JSON.stringify({
          name: name,
          link: link
        })
      }
    )
      .then(this._checkResponse);
  }

  deleteCard(cardId,
             isOwn
  ) {
    if (isOwn) {
      return fetch(`${this.baseUrl}/cards/${cardId}`,
        {
          method: 'DELETE',
          headers: this.headers,
          credentials: 'include',
        }
      )
        .then(this._checkResponse);
    }
  }

  changeLikeCardStatus(cardId,
                       isLiked
  ) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`,
      {
        method: isLiked ?
          'DELETE' :
          'PUT',
        headers: this.headers,
        credentials: 'include',
      }
    )
      .then(this._checkResponse);
  }

  editAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar: link
        })
      }
    )
      .then(this._checkResponse);
  }

  singOut() {
    return fetch(`${this.baseUrl}/signout`,
      {
        method: 'GET',
        credentials: 'include',
      }
    )
      .then(this._checkResponse);
  }

  authorize(email, password) {
    return fetch(`${this.baseUrl}/signin`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          email,
          password
        })
      }
    )
      .then(this._checkResponse);
  }

  register(email, password) {
    return fetch(`${this.baseUrl}/signup`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          email,
          password
        })
      }
    )
      .then(this._checkResponse);
  }

  checkToken() {
    return fetch(`${this.baseUrl}/users/me`,
      {
        method: 'GET',
        credentials: 'include',
        headers: this.headers,
      }
    )
      .then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3005/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
