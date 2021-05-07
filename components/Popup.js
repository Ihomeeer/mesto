//Класс отвечает за открытие и закрытие модалок по кнопкам, а также по нажатию на esc

export default class Popup {
  constructor (popupSelector) {
    this._popup = popupSelector;
  }

  //открытие модальных окон
  openPopup() {
    this._popup.classList.add('popup_opened');
    this. setEventListeners();
    document.addEventListener('keydown', this._handleEscClose);
  }
  //закрытие модальных окон
  closePopup = () => {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  //закрытие модальных окон по нажатию esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }
  closePopupElements = (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup__photo-close-button')) {
      this.closePopup();
    }
  }
  //слушатель закрытия попапа
  setEventListeners() {
    this._popup.addEventListener('mousedown', this.closePopupElements)
  }
}

// //функция закрытия модальных окон по нажатию на кнопку закрытия или оверлей + сброс введеных данных в инпутах модалки добавления карточек
// const closePopuphandler = (evt) => {
//   if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
//     closePopup(evt.target.closest('.popup'));
//     if (evt.target.id === 'placePopup' || evt.target.id === 'placePopupCloseBtn') {
//       placeForm.reset();
//     }
//   }
// }