export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    const getUserInfoPromise = fetch(`${this._baseUrl}/v1/cohort-24/users/me`, {
      headers: this._headers
    })
    .then(result => {
      if (result.ok) {
        return result.json()
      } else {
        return Promise.reject(`${result.status}`)
      }
    })
    .catch(error => console.log(`Произошла ошибка ${error}`))
    return getUserInfoPromise;
  }

  sendUserInfo() {
    const sendUserInfoPromise = fetch(`${this._baseUrl}/v1/cohort-24/users/me`, {
      method: 'POST',
      body: JSON.stringify({

      }),
      headers: this._headers
    })
  }

  getDefaultCards() {
    const getDefaultCardsPromise = fetch(`${this._baseUrl}/v1/cohort-24/cards`, {
      headers: this._headers
    })
    .then(result => {
      if (result.ok) {
        return result.json()
      } else {
        return Promise.reject(`${res.status}`)
      }
    })
    .catch(error => console.log(`Произошла ошибка ${error}`))
    return getDefaultCardsPromise;
  }

}