const qs = (...args) => document.querySelector(...args);
const qsa = (...args) => document.querySelectorAll(...args);
const getDOM = () => ({
  intro: {
    selt: qs('.intro'),
    title: qsa('.intro__logo img'),
    description: qsa('.intro .split-word .invisible-word'),
  },
  about: {
    self: qs('.about'),
    img: qs('.about__logo img'),
    title: qsa('.about__title'),
    text: qsa('.about__text-col p'),
  },
  projects: {
    self: qs('.projects'),
    title: qsa('.projects .projects__title .invisible-char'),

  },
  tiny: {
    self: qs('.tiny-house'),
    title: qsa('.tiny-house .tiny-house__title .invisible-char'),
    images: qsa('.tiny-house__article-images img'),
  },
  cards: {
    self: qs('.cards'),
    title: qsa('.cards .cards__title .invisible-char'),
  },
  aboutMe: {
    self: qs('.about-me'),
    title: qsa('.about-me .about-me__title .invisible-word'),
  },
  podcasts: {
    self: qs('.podcast'),
    title: qsa('.podcast .podcast__title .invisible-char'),
    subT: qsa('.podcast__description-title .invisible-char'),
    text: qs('.podcast__description-text'),
  },
});

export default getDOM;
