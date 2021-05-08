import Popup from '../components/Popup.js'

export default class PopupWithForm extends Popup {
  constructor (popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__main-form');
  }


  _getInputValues = () => {
    const values = {};
    const inputs = Array.from(this._form.querySelectorAll('.popup__input'));
    inputs.forEach(input => {
      values[input.name] = input.value;
    })
    return values;
  }

  setEventListeners() {
    this._getInputValues();
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitHandler);
  }
}