//Отдельный класс для модалки с подтверждением удаления карточки

import Popup from './Popup.js'

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__main-form');
  }

//открытие модалки
  openPopup(cardId) {
    this._cardId = cardId;
    super.openPopup();
  }

//установка слушателей
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._cardId);
    });
  }

}