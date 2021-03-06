//Класс отвечает за открытие и закрытие модалок по кнопкам, а также по нажатию на esc

export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._submitButton = this._popup.querySelector('.popup__save-button');
  }

//открытие модальных окон
  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

//закрытие модальных окон
  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

//закрытие модальных окон по нажатию esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

//колбэк для закрытия по нажатию кнопок и оверлея
  _closePopupElements = (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
      this.closePopup();
    }
  }

//изменение текста на кнопке отправки во имя красоты
  changeButtonText = (text) => {
    this._submitButton.textContent = text;
  }
//слушатель закрытия попапа
  setEventListeners() {
    this._popup.addEventListener('mousedown', this._closePopupElements)
  }
}