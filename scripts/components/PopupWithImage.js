//класс, ответственный за создание модального окна с увеличенным изображением карточки
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, name, link) {
    super(popupSelector);
    this._name = name;
    this._link = link;
    this._currentPhoto = this._popup.querySelector('.popup__photo');
    this._currentName = this._popup.querySelector('.popup__photo-name');
  }

  //открытие модального окна с увеличенным фото
  openPopup = () => {
    super.openPopup();
    this._currentPhoto.src = this._link;
    this._currentPhoto.alt = this._name;
    this._currentName.textContent = this._name;
  }
}