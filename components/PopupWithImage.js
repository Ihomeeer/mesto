import {photoPopup} from '../scripts/index.js';

class PopupWithImage extends Popup {
  constructor({name, link}) {
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
      this._handleEscClose(evt)
    });
  }
}

photo.addEventListener('click', () => this._zoomCard(this._name, this._link));