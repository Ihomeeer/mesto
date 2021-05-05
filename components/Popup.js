//Класс отвечает за открытие и закрытие модалок по кнопкам, а также по нажатию на esc

export default class Popup {
  constructor (popupSelector) {
    this._popup = popupSelector;
  }

  //открытие модальных окон
  openPopup () {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  //закрытие модальных окон
  closePopup () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  //закрытие модальных окон по нажатию esc
  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    };
  }
  //слушатель кнопки закрытия попапа
  setEventListeners () {
    
  }
}