export default class PopupWithForm extends Popup {
  constructor (popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this.popup.querySelector('.popup__main-form');
  }


  _getInputValues = () => {
    const values = {};
    const inputs = Array.from(this._form.querySelector('.popup__input'));
    inputs.forEach(input => {
      console.log(input.name)
      values.input.name = input.value;
    })
    console.log(inputs)
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitHandler);
  }
}