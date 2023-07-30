class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  };

  _request(endPoint, options) {
    return fetch(`${this.baseUrl}${endPoint}`, options).then(this._checkResponse);
  };

  getUserInformation() {
    const token = localStorage.getItem('token');
    return this._request('/users/me', {
      method: 'GET',
      headers: Object.assign(this.headers,{"Authorization" : `Bearer ${token}`})
    });
  };

  getInitialCards() {
    const token = localStorage.getItem('token');
    return this._request('/cards', {
      method: 'GET',
      headers: Object.assign(this.headers,{"Authorization" : `Bearer ${token}`})
    });
  };

  setUserInformation({ name, about }) {
    const token = localStorage.getItem('token');
    return this._request('/users/me', {
      method: 'PATCH',
      headers: Object.assign(this.headers,{"Authorization" : `Bearer ${token}`}),
      body: JSON.stringify({
        name,
        about
      })
    });
  };

  addCard(name, link) {
    const token = localStorage.getItem('token');
    return this._request('/cards', {
      method: 'POST',
      headers: Object.assign(this.headers,{"Authorization" : `Bearer ${token}`}),
      body: JSON.stringify({
        name: name,
        link: link
      })
    });
  };

  deleteCard(cardId) {
    const token = localStorage.getItem('token');
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: Object.assign(this.headers,{"Authorization" : `Bearer ${token}`})
    });
  };

  likeCard(cardId) {
    const token = localStorage.getItem('token');
    return this._request(`/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: Object.assign(this.headers,{"Authorization" : `Bearer ${token}`})
    });
  };

  removeLikeCard(cardId) {
    const token = localStorage.getItem('token');
    return this._request(`/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: Object.assign(this.headers,{"Authorization" : `Bearer ${token}`})
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
    const token = localStorage.getItem('token');
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      headers: Object.assign(this.headers,{"Authorization" : `Bearer ${token}`}),
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
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

const apiAuth = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    "Content-Type": "application/json"
  }
});

export {api,apiAuth};



