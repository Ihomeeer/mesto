export default class UserInfo {
  constructor ({nameSelector, aboutSelector}) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(aboutSelector);
  }

  getUserInfo = () => {
    return {UserName: this._name.textContent, UserJob: this._job.textContent}
  }

  setUserInfo = (nameInput, jobInput) => {
    this._name.textContent =nameInput;
    this._job.textContent = jobInput;
  }
}