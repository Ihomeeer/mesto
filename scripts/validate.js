//Скрипт отвечает за валидацию форм на странице

//=========Функции=========

//функции показа и скрытия ошибок
const showInputError = (formElement, inputElement, errorMessage, params) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(params.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(params.errorClass);
};

const hideInputError = (formElement, inputElement, params) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(params.inputErrorClass);
  errorElement.classList.remove(params.errorClass);
  errorElement.textContent = '';
};

//функция проверки валидности форм
const checkInputValidity = (formElement, inputElement, params) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, params);
  } else {
    hideInputError(formElement, inputElement, params);
  }
};

//функция для детектирования невалидных полей
const hasInvalidInput = (inputsList) => {
  return inputsList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//функция изменения состояния кнопки отправки
const toggleButtonState = (inputsList, buttonElement, params) => {
  if (hasInvalidInput(inputsList)) {
    buttonElement.classList.add(params.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(params.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

//функция установки обработчиков
const setEventListeners = (formElement, params) => {
  const inputsList = Array.from(formElement.querySelectorAll(params.inputSelector));
  const buttonElement = formElement.querySelector(params.submitButtonSelector);
  toggleButtonState(inputsList, buttonElement, params);
  inputsList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, params);
      toggleButtonState(inputsList, buttonElement, params);
    });
  });
};

//функция инициации валидации
const enableValidation = (params) => {
  const formsList = Array.from(document.querySelectorAll(params.formSelector));
  formsList.forEach(function(formElement) {
    setEventListeners(formElement, params);
  });
};

//запуск валидации на странице с заданными параметрами
enableValidation({
  formSelector: '.popup__main-form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error-span_show',
});
