//класс, ответственный за создание всех модальных окон с формами для заполнения
import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor (popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__main-form');
  }

  //закрытие модалки
  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  //получение значений инпутов
  _getInputValues = () => {
    const values = {};
    const inputs = Array.from(this._form.querySelectorAll('.popup__input'));
    inputs.forEach(input => {
      values[input.name] = input.value;
    })
    return values;
  }

  //дополнительная функция-колбэк для упразднения путаницы с "evt" во время передачи колбэка сабмита форм
  _callBackHandler = (evt) => {
    evt.preventDefault();
    this._submitHandler(evt, this._getInputValues())
  }

  //установка слушателей отправки и закрытия форм
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._callBackHandler);
  }
}