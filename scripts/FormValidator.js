//Класс отвечает за валидацию форм на странице

// символами "===" отделяются друг от друга переменные/функции/обработчики - основные разделы файла
// символами "---" отделяются друг от друга отдельные части разделов, например, различные функции в разделе "функции"

//---------Класс для валидации форм---------
class FormValidator {
  constructor (params, formElement) {
    this._params = params;
    this._formElement = formElement;
    this._inputsList = Array.from(this._formElement.querySelectorAll(this._params.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._params.submitButtonSelector);
  }

  //---------показ и скрытие ошибок---------
  // показ ошибок
  _showInputError(inputElement, errorMessage, params) {
    const _errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(params.inputErrorClass);
    _errorElement.textContent = errorMessage;
    _errorElement.classList.add(params.errorClass);
  };
  // скрытие ошибок
  _hideInputError(inputElement, params) {
    const _errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(params.inputErrorClass);
    _errorElement.classList.remove(params.errorClass);
    _errorElement.textContent = '';
  };

  //---------проверка валидности форм---------
  _checkInputValidity(inputElement, params) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage, params);
    } else {
      this._hideInputError(inputElement, params);
    }
  };

  //---------детектирование невалидных полей---------
  _hasInvalidInput(inputsList) {
    return inputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  //---------изменение состояния кнопки отправки---------
  _toggleButtonState(inputsList, buttonElement, params) {
    if (this._hasInvalidInput(inputsList)) {
      this.disableSubmitButton(buttonElement);
    } else {
      buttonElement.classList.remove(params.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  //---------установка обработчиков---------
  _setEventListeners(params) {
    this._toggleButtonState(this._inputsList, this._buttonElement, params);
    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement, params);
        this._toggleButtonState(this._inputsList, this._buttonElement, params);
      });
    });
  };

  //---------публичный метод для отключения кнопки валидации. Используется в index.js для отключения кнопки в модалке с карточками---------
  disableSubmitButton(buttonElement) {
    buttonElement.classList.add(this._params.inactiveButtonClass);
    buttonElement.disbaled = true;
  }

  //---------публичный метод для удаления ошибок при повторном открытии модалок. Используется в index.js для отключенИя кнопки в модалке с карточками---------
  removeErrors = (params, form) => {
    const currentInputs = form.querySelectorAll('.popup__input')
    currentInputs.forEach((input) => {
      this._hideInputError(input, params);
    });
  }

  //---------инициация валидации---------
  enableValidation() {
    this._setEventListeners(this._params);
  }
}

export {FormValidator};