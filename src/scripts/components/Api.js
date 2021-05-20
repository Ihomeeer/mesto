export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  getUserInfo() {
    const getUserInfoPromise = fetch(`${this._baseUrl}/v1/cohort-24/users/me`, {
      headers: this._headers
    })
    .then(res => res.json())
    return getUserInfoPromise;
  }

}