//класс, ответственный за создание модального окна с увеличенным изображением карточки
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._currentPhoto = this._popup.querySelector('.popup__photo');
    this._currentName = this._popup.querySelector('.popup__photo-name');
  }

//открытие модального окна с увеличенным фото
  openPopup = (name, link) => {
    super.openPopup();
    this._currentPhoto.src = link;
    this._currentPhoto.alt = name;
    this._currentName.textContent = name;
  }
}