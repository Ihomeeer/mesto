//Класс содержит всю логику для работы с API
export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

//проверка состояния промиса, чтобы не писать одно и то же сто тыщ раз
  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

//получение информации о пользователе с сервера
  getUserInfo() {
    const getUserInfoPromise = fetch(`${this._baseUrl}/v1/cohort-24/users/me`, {
      headers: this._headers
    })
    .then(res => this._checkStatus(res));

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
    .then(res => this._checkStatus(res));

    return sendUserInfoPromise;
  }

//получение списка карточек с сервера при старте страницы
  getDefaultCards = () => {
    const getDefaultCardsPromise = fetch(`${this._baseUrl}/v1/cohort-24/cards`, {
      headers: this._headers
    })
    .then(res => this._checkStatus(res));

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
    .then(res => this._checkStatus(res));

    return sendNewCardPromise;
  }

//удаление карточки с сервера
  deleteCard(id) {
    const deleteCardPromise = fetch(`${this._baseUrl}/v1/cohort-24/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
      })
      .then(res => this._checkStatus(res));

      return deleteCardPromise;
  }

//запрос на добавление лайка на сервер или его удаление
  toggleLike(method, id) {
    const toggleLikePromise = fetch(`https://mesto.nomoreparties.co/v1/cohort-24/cards/likes/${id}`, {
    method: method,
    headers: this._headers
    })
    .then(res => this._checkStatus(res));

    return toggleLikePromise;
  }

//запрос на обновление аватары
  setAvatar(userData) {
    const setAvatarPromise = fetch('https://mesto.nomoreparties.co/v1/cohort-24/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify ({
        avatar: userData
      })
    })
    .then(res => this._checkStatus(res));

    return setAvatarPromise;
  }
}