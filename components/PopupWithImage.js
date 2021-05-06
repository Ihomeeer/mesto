import {photoPopup} from '../scripts/index.js';
import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
  constructor({popupSelector, name, link}) {
    super(popupSelector);
    this._name = name;
    this._link = link;
    this._currentPhoto = photoPopup.querySelector('.popup__photo');
    this._currentName = photoPopup.querySelector('.popup__photo-name');
  }
  //открытие модальных окон
  openPopup() {
    this._currentPhoto.src = this._link;
    this._currentPhoto.alt = this._name;
    this._currentName.textContent = this._name;
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      super._handleEscClose(evt)
    });
  }
}

