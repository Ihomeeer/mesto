//Скрипт отвечает за валидацию форм на странице

// символами "===" отделяются друг от друга переменные/функции/обработчики
// символами "---" отделяются друг от друга отдельные "модули", например открытие и закрытие модальных окон от непосредственно создания карточки;

//=========Переменные=========
//переменная для записи параметров валидации

const params = {
  formSelector: '.popup__main-form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error-span_show',
}

class FormValidator {
  constructor (params, formElement) {

    this._formElement = formElement;
  }

  //---------функции показа и скрытия ошибок---------
  // функция показа ошибок
  _showInputError(formElement, inputElement, errorMessage, params) {
    const _errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(params.inputErrorClass);
    _errorElement.textContent = errorMessage;
    _errorElement.classList.add(params.errorClass);
  };
  // функция скрытия ошибок
  _hideInputError(inputElement, params) {
    const _currentForm = inputElement.closest(params.formSelector);
    const _errorElement = _currentForm.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(params.inputErrorClass);
    _errorElement.classList.remove(params.errorClass);
    _errorElement.textContent = '';
  };

  //---------функция проверки валидности форм---------
  _checkInputValidity(formElement, inputElement, params) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, params);
    } else {
      this._hideInputError(inputElement, params);
    }
  };

  //---------функция для детектирования невалидных полей---------
  _hasInvalidInput(inputsList) {
    return inputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  //---------функция изменения состояния кнопки отправки---------
  _toggleButtonState(inputsList, buttonElement, params) {
    if (this._hasInvalidInput(inputsList)) {
      buttonElement.classList.add(params.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(params.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  //---------функция установки обработчиков---------
  _setEventListeners(formElement, params) {
    const _inputsList = Array.from(formElement.querySelectorAll(params.inputSelector));
    const _buttonElement = formElement.querySelector(params.submitButtonSelector);
    this._toggleButtonState(_inputsList, _buttonElement, params);
    _inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        this._checkInputValidity(formElement, inputElement, params);
        this._toggleButtonState(_inputsList, _buttonElement, params);
      });
    });
  };

  //---------функция инициации валидации---------
  enableValidation() {
      this._setEventListeners(this._formElement, this._params);
  }
}


const formList = document.querySelectorAll('.popup__main-form');
formList.forEach(function(form) {
  const validation = new FormValidator(params, form);
  const enabledValidation = validation.enableValidation();
  console.log(form)
});
