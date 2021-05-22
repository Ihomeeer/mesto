//класс, ответственный за отрисовку элементов на странице
export default class Section {
  constructor ({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

//отрисовка начальных карточек
  renderItems (items) {
    items.forEach((item) => {
      this._renderer(item, this._container);
    });
  }

//отрисовка новой карточке с данными из модалки
  addItem (item) {
    this._renderer(item, this._container);
  }
}