export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

//получение информации о пользователе с сервера
  getUserInfo() {
    const getUserInfoPromise = fetch(`${this._baseUrl}/v1/cohort-24/users/me`, {
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })

    return getUserInfoPromise;
  }

//обновление информации о пользователе с сервера
  sendUserInfo(userData) {
    const sendUserInfoPromise = fetch(`${this._baseUrl}/v1/cohort-24/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify ({
        name: userData.name,
        about: userData.about
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    return sendUserInfoPromise;
  }

  //получение списка карточек с сервера при старте страницы
  getDefaultCards = () => {
    const getDefaultCardsPromise = fetch(`${this._baseUrl}/v1/cohort-24/cards`, {
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    return getDefaultCardsPromise;
  }

//отправка новой карточки на сервер
  sendNewCard(cardData) {
    const sendNewCardPromise = fetch(`${this._baseUrl}/v1/cohort-24/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify ({
        name: cardData.name,
        link: cardData.link
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    return sendNewCardPromise;
  }

//получение количества лайков карточки
  // getCardLikes = () => {
  //   const getCardLikesPromise = fetch(`${this._baseUrl}/v1/cohort-24/cards`, {
  //     headers: this._headers
  //   })
  //   .then(res => {
  //     if (res.ok) {
  //       return res.json();
  //     }
  //     return Promise.reject(`Ошибка: ${res.status}`);
  //   })
  //   return getCardLikesPromise;
  // }



}