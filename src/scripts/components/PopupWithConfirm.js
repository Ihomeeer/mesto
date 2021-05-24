import Popup from './Popup.js'

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__main-form');
  }

  openPopup(cardId) {
    this._cardId = cardId;
    super.openPopup();
  }


  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._cardId);
      this.closePopup();
    });
  }

}