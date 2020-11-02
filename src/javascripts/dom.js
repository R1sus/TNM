const qs = (...args) => document.querySelector(...args);
const qsa = (...args) => document.querySelectorAll(...args);
const getDOM = () => ({
  intro: {
    selt: qs('.intro'),
    title: qsa('.intro__logo img'),
    description: qsa('.intro .intro__description-quote'),
    author: qs('.intro__description-author'),
    pos: qs('.intro__description-position'),
    slider: qs('.intro__slider'),
    controls: qs('.intro__slider-controls'),
    text: qs('.intro__description'),
  },
  about: {
    self: qs('.about'),
    logo: qsa('.about__logo-wrap img'),
    img: qs('.about__logo .img'),
    title: qsa('.about__title'),
    text: qsa('.about__text-col p'),
    subtitle: qs('.about__subtitle'),
    link: qs('.about__link'),
  },
  projects: {
    self: qs('.projects'),
    title: qsa('.projects .projects__title .invisible-word'),
    slider: qs('.projects__slider'),
  },
  tiny: {
    self: qs('.tiny-house'),
    title: qsa('.tiny-house .tiny-house__title .invisible-word'),
    images: qsa('.tiny-house__article-images img'),
    description: qs('.tiny-house__description-container'),
    quote: qs('.tiny-house__description-quote'),
    author: qs('.tiny-house__description-author'),
    pos: qs('.tiny-house__description-position'),
    titleA: qs('.tiny-house__article-title'),
    subTitleA: qsa('.tiny-house__article-subtitle'),
    text: qs('.tiny-house__article-text'),
    link: qs('.tiny-house__article-link'),
    lineTop: qs('.tiny-house__line-top'),
    lineVer: qs('.tiny-house__line-ver'),
    lineBottom: qs('.tiny-house__line-bottom'),
  },
  cards: {
    self: qs('.cards'),
    title: qsa('.cards .cards__title .invisible-word'),
    text: qs('.cards__text'),
    container: qs('.cards .row'),
    card: qsa('.card'),
  },
  aboutMe: {
    self: qs('.about-me'),
    title: qsa('.about-me .about-me__title .invisible-word'),
    textTitle: qsa('.about-me__text-title'),
    text: qs('.about-me__text'),
    video: qs('.about-me__video'),
    videoTitle: qs('.about-me__video-title'),
  },
  podcasts: {
    self: qs('.podcast'),
    title: qsa('.podcast .podcast__title .invisible-word'),
    subT: qsa('.podcast__description-title .invisible-char'),
    desc: qsa('.podcast__description-subtitle'),
    text: qsa('.podcast__description-text'),
    list: qs('.podcasts__list'),
    listItems: qsa('.podcasts__item'),
    lineTop: qsa('.podcast__line-top'),
    lineVer: qsa('.podcast__line-ver'),
    link: qs('.podcasts__link'),
  },
  // manifesto: {
  //   title: qs('.manifesto__title'),
  //   subT: qs('.manifesto__subtitle'),
  //   textB: qsa('.manifesto__text-big p'),
  //   img: qs('.manifesto__article-img'),
  //   articleText: qsa('.manifesto__article p'),
  //   articleTitle: qsa('.manifesto__article-title'),
  // },
});

export default getDOM;
