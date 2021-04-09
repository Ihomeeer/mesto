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

//функция установки обработчиков
const setEventListeners = (formElement, params) => {
  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
  const buttonElement = formElement.querySelector(params.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, params);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, params);
      toggleButtonState(inputList, buttonElement, params);
    });
  });
};

//функция для детектирования невалидных полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//функция изменения состояния кнопки отправки
const toggleButtonState = (inputList, buttonElement, params) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(params.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(params.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

//функция инициации валидации
const enableValidation = (params) => {
  console.log(params)
  const formList = Array.from(document.querySelectorAll(params.formSelector));
  formList.forEach(function(formElement) {
    setEventListeners(formElement, params);
  });
};



enableValidation({
  formSelector: '.popup__main-form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error-span_show',
});
