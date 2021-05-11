//класс, ответственный за передачу данных о пользователе в модалку и обратно
export default class UserInfo {
  constructor ({nameSelector, aboutSelector}) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(aboutSelector);
  }

//подставляет в поля модалки существующее инфо
  getUserInfo = () => {
    return {userName: this._name.textContent, userJob: this._job.textContent}
  }

  //обновляет существующее инфо данными из модалки
  setUserInfo = (nameInput, jobInput) => {
    this._name.textContent =nameInput;
    this._job.textContent = jobInput;
  }
}