//класс, ответственный за отрисовку элементов на странице
export default class Section {
  constructor ({item, renderer}, containerSelector) {
    this._items = item;
    this._renderer = renderer;
    this._container = containerSelector;
  }

//отрисовка начальных карточек
  renderItems () {
    this._items.forEach((item) => {
      this._renderer(item, this._container);
    });
  }

//отрисовка новой карточке с данными из модалки
  addItem (item) {
    this._renderer(item, this._container);
  }
}