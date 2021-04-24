//Класс отвечает за валидацию форм на странице

// символами "===" отделяются друг от друга переменные/функции/обработчики - основные разделы файла
// символами "---" отделяются друг от друга отдельные части разделов, например, различные функции в разделе "функции"

//=========Переменные=========


import {params} from './index.js';


//=========Классы=========


//---------Класс для валидации форм---------
class FormValidator {
  constructor (params, formElement) {
    this._params = params;
    this._formElement = formElement;
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
      buttonElement.classList.add(params.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(params.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  //---------установка обработчиков---------
  _setEventListeners(params, formElement) {
    const _inputsList = Array.from(formElement.querySelectorAll(params.inputSelector));
    const _buttonElement = formElement.querySelector(params.submitButtonSelector);
    this._toggleButtonState(_inputsList, _buttonElement, params);
    _inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement, params);
        this._toggleButtonState(_inputsList, _buttonElement, params);
      });
    });
  };

  //---------инициация валидации---------
  enableValidation() {
      this._setEventListeners(this._params, this._formElement, );
  }
}

export {params, FormValidator};