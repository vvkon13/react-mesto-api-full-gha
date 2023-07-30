class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  };

  _request(endPoint, options) {
    return fetch(`${this.baseUrl}${endPoint}`, options).then(this._checkResponse);
  };

  getUserInformation() {
    return this._request('/users/me', {
      method: 'GET',
      headers: this.headers
    });
  };

  getInitialCards() {
    return this._request('/cards', {
      method: 'GET',
      headers: this.headers
    });
  };

  setUserInformation({ name, about }) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name,
        about
      })
    });
  };

  addCard(name, link) {
    return this._request('/cards', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    });
  };

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    });
  };

  likeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers
    });
  };

  removeLikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers
    });
  };


  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.likeCard(cardId);
    }
    else {
      return this.removeLikeCard(cardId)
    }
  }

  updateAvatarUser(avatarLink) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    });
  };

  signUp({ password, email }) {
    return this._request('/signup', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    });
  }

  signIn({ password, email }) {
    return this._request('/signin', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    });
  }
  
  keyAuthentication(token) {
    return this._request('/users/me', {
      method: 'GET',
      headers: Object.assign(this.headers,{"Authorization" : `Bearer ${token}`})
    });
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject('Error');
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: 'fd367575-aa2a-4d14-b6f6-0479dde56c06',
    'Content-Type': 'application/json'
  }
});

const apiAuth = new Api({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    "Content-Type": "application/json"
  }
});

export {api,apiAuth};



