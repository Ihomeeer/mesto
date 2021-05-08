import Popup from '../components/Popup.js'

export default class PopupWithForm extends Popup {
  constructor (popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__main-form');
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }
  _getInputValues = () => {
    const values = {};
    const inputs = Array.from(this._form.querySelectorAll('.popup__input'));
    inputs.forEach(input => {
      values[input.name] = input.value;
    })
    return values;
  }

  _callBackHandler = (evt) => {
    evt.preventDefault();
    this._submitHandler(evt, this._getInputValues())
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._callBackHandler);
  }
}