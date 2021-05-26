//класс, ответственный за передачу данных о пользователе в модалку и обратно
export default class UserInfo {
  constructor ({nameSelector, aboutSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

//подставляет в поля модалки существующее инфо
  getUserInfo = () => {
    return {userName: this._name.textContent, userJob: this._job.textContent}
  }

//обновляет существующее инфо данными из модалки
  setUserInfo = (newUser) => {
    this._name.textContent = newUser.name;
    this._job.textContent = newUser.about;
  }

//обновляет автар пользователя, берет ссылку из соответствующей модалки
  setUserAvatar = (newUser) => {
    this._avatar.src = newUser.avatar;
  }
}