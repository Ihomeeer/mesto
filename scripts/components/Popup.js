//Класс отвечает за открытие и закрытие модалок по кнопкам, а также по нажатию на esc

export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector)
  }

  //открытие модальных окон
  openPopup() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
    document.addEventListener('keydown', this._handleEscClose);
  }

  //закрытие модальных окон
  closePopup() {
    this._popup.classList.remove('popup_opened');
    this.removeEventListeners();
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //закрытие модальных окон по нажатию esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  //колбэк для закрытия по нажатию кнопок и оверлея
  closePopupElements = (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup__photo-close-button')) {
      this.closePopup();
    }
  }

  //слушатель закрытия попапа
  setEventListeners() {
    this._popup.addEventListener('mousedown', this.closePopupElements)
  }

  removeEventListeners() {
    this._popup.removeEventListener('mousedown', this.closePopupElements)
  }
}