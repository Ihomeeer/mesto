//Класс отвечает за создание карточек на странице

// символами "===" отделяются друг от друга переменные/функции/обработчики - основные разделы файла
// символами "---" отделяются друг от друга отдельные части разделов, например, различные функции в разделе "функции"

import {openPopup} from '../utils/utilityFuncs.js'
import {currentPhoto, currentName, photoPopup} from '../scripts/index.js';

//---------Класс - создание карточки, добавление обработчиков---------
class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  //---------создание карточки---------
  createCard() {
    this.element = this._getTemplate();
    const _newCardName = this.element.querySelector('.elements__name');
    const _newCardPhoto = this.element.querySelector('.elements__photo');
    const _newCardLikeBtn = this.element.querySelector('.elements__like');
    const _newCardDeleteBtn = this.element.querySelector('.elements__delete');
    _newCardName.textContent = this._name;
    _newCardPhoto.src = this._link;
    _newCardPhoto.alt = `К сожалению, изображение ${this._name} недоступно`
    _newCardPhoto.alt = this._name;
    this._setListeners( _newCardLikeBtn, _newCardDeleteBtn, _newCardPhoto);

    return this.element;
  }

  //---------разметка---------
  _getTemplate() {
    const _cardElement = document.querySelector(this._cardSelector)
      .content
      .querySelector('.elements__card')
      .cloneNode(true);

    return _cardElement;
  }

  //---------лайки---------
  _likeCard (evt) {
    const _targetLikeBtn = evt.target;
    _targetLikeBtn.classList.toggle('elements__like_active');
  }

  //---------удаление---------
  _deleteCard (evt) {
    const _targetDeleteBtn = evt.target;
    _targetDeleteBtn.closest('.elements__card').remove();
  }

  // ---------модальное окно с зумом---------
  // открытие модального окна
  _zoomCard (name, link) {
    this._zoomData (name, link, currentPhoto, currentName);
    openPopup(photoPopup);
  }
  // определение переменных и присваивание им значений
  _zoomData (name, link, currentPhoto, currentName) {
    currentPhoto.src = link;
    currentPhoto.alt = name;
    currentName.textContent = name;
  }

  //---------слушатели---------
  _setListeners(likeBtn, deleteBtn, photo) {
    likeBtn.addEventListener('click', (evt) => this._likeCard(evt));
    deleteBtn.addEventListener('click', (evt) => this._deleteCard(evt));
    photo.addEventListener('click', () => this._zoomCard(this._name, this._link));
  }
}

export {Card};