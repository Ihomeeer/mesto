// данные для начальных карточек
const moscow = new URL('../../images/1-Moscow-min.jpg', import.meta.url);
const vladivostok = new URL('../../images/2-Vladivostok-min.jpg', import.meta.url);
const rostov = new URL('../../images/3-Rostov-min.jpg', import.meta.url);
const ekb = new URL('../../images/4-EKB-min.jpg', import.meta.url);
const sochi = new URL('../../images/5-Sochi-min.jpg', import.meta.url);
const peterburg = new URL('../../images/6-Peterburg-min.jpg', import.meta.url);



//---------Массив с данными для первоначальных карточек---------
const initialCards = [
  {
    name: 'Москва',
    link: moscow
  },
  {
    name: 'Владивосток',
    link: vladivostok
  },
  {
    name: 'Ростов-на-Дону',
    link: rostov
  },
  {
    name: 'Екатеринбург',
    link: ekb
  },
  {
    name: 'Сочи',
    link: sochi
  },
  {
    name: 'Санкт-Петербург',
    link: peterburg
  }
];

export {
  moscow,
  vladivostok,
  rostov,
  ekb,
  sochi,
  peterburg,
  initialCards};