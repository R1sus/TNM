const qs = (...args) => document.querySelector(...args);
const qsa = (...args) => document.querySelectorAll(...args);
const getDOM = () => ({
  intro: {
    selt: qs('.intro'),
    title: qsa('.intro__logo img'),
    description: qsa('.intro .split-word .invisible-word'),
    author: qs('.intro__description-author'),
    pos: qs('.intro__description-position'),
    slider: qs('.intro__slider-container'),
    text: qs('.intro__description'),
  },
  about: {
    self: qs('.about'),
    img: qs('.about__logo img'),
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
    titleA: qs('.tiny-house__article-title'),
    subTitleA: qsa('.tiny-house__article-subtitle .invisible-word'),
    text: qs('.tiny-house__article-text'),
    link: qs('.tiny-house__article-link'),
  },
  cards: {
    self: qs('.cards'),
    title: qsa('.cards .cards__title .invisible-word'),
    text: qs('.cards__text'),
    container: qs('.cards .row'),
  },
  aboutMe: {
    self: qs('.about-me'),
    title: qsa('.about-me .about-me__title .invisible-word'),
    textTitle: qsa('.about-me__text-title .invisible-word'),
    text: qs('.about-me__text'),
    video: qs('.about-me__video'),
  },
  podcasts: {
    self: qs('.podcast'),
    title: qsa('.podcast .podcast__title .invisible-word'),
    subT: qsa('.podcast__description-title .invisible-char'),
    desc: qs('.podcast__description-subtitle'),
    text: qs('.podcast__description-text'),
  },
});

export default getDOM;
