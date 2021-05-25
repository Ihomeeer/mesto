//Класс отвечает за валидацию форм на странице

//---------Класс для валидации форм---------
export default class FormValidator {
  constructor (params, formElement) {
    this._params = params;
    this._formElement = formElement;
    this._inputsList = Array.from(this._formElement.querySelectorAll(this._params.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._params.submitButtonSelector);
  }

//---------показ и скрытие ошибок---------
// показ ошибок
  _showInputError(inputElement, errorMessage) {
    const _errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._params.inputErrorClass);
    _errorElement.textContent = errorMessage;
    _errorElement.classList.add(this._params.errorClass);
  };
// скрытие ошибок
  _hideInputError(inputElement) {
    const _errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._params.inputErrorClass);
    _errorElement.classList.remove(this._params.errorClass);
    _errorElement.textContent = '';
  };

//---------проверка валидности форм---------
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

//---------детектирование невалидных полей---------
  _hasInvalidInput() {
    return this._inputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

//---------изменение состояния кнопки отправки---------
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputsList)) {
      this.disableSubmitButton();
    } else {
      this._buttonElement.classList.remove(this._params.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };

//---------установка обработчиков---------
  _setEventListeners() {
    this._toggleButtonState();
    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

//---------публичный метод для отключения кнопки валидации. Используется в index.js для отключения кнопки в модалке с карточками---------
  disableSubmitButton() {
    this._buttonElement.classList.add(this._params.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

//---------публичный метод для удаления ошибок при повторном открытии модалок. Используется в index.js для отключенИя кнопки в модалке с карточками---------
  removeErrors = () => {
    this._inputsList.forEach((input) => {
      this._hideInputError(input);
    });
  }

//---------инициация валидации---------
  enableValidation() {
    this._setEventListeners();

  }
}
