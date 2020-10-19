const qs = (...args) => document.querySelector(...args);
const qsa = (...args) => document.querySelectorAll(...args);
const getDOM = () => ({
  // fixedLeftSide: qs('.fixed-left-side'),
  // reloadingInner: qs('.reloading__inner'),
  // scrollPlease: qs('.scroll-please'),
  // menuTriggers: qsa('.menu-trigger, span.call-menu'),
  // menu: {
  //   self: qs('.menu'),
  //   close: qs('.menu__close'),
  //   overlay: qs('.menu__overlay'),
  //   items: qsa('.menu__item'),
  // },
  // up: qs('.up'),
  // mobileHeader: qs('.mobile-header'),
  intro: {
    selt: qs('.intro'),
  },
  brand: {
    self: qs('.brand'),
    bg: qs('.brand .brand__bg'),
    textTopChars: qsa('.brand .brand-text__top .invisible-char'),
    headerWords: qsa('.brand .brand-text__header .split-word .invisible-word'),
    description: qs('.brand .brand-text__description'),
    newColorsTitle: qsa('.new-colors .new-colors__title .invisible-char'),
    newColorsItems: qsa('.new-colors__item'),
  },
  vToV: {
    self: qs('.v-to-v'),
    titleChars: qsa('.v-to-v__title .invisible-char'),
    videos: qsa('.v-to-v__video'),
  },
  ter: {
    self: qs('.ter'),
    topLine: qsa('.ter__line:first-child .invisible-char'),
    botLine: qsa('.ter__line:last-child .invisible-char'),
    text: qsa('.ter__text .invisible-word'),
    images: qsa('.ter__image'),
  },
  g: {
    self: qs('.g'),
    green: qs('.g__green'),
    white: qs('.g__white'),
    title: qsa('.g__title .invisible-char'),
    text: qsa('.g__description'),
  },
  plans: {
    self: qs('.plans'),
    title: qsa('.plans__title .invisible-char'),
    description: qs('.plans__description'),
  },
  land: {
    self: qs('.land'),
    button: qs('.land .button'),
  },
  e: {
    self: qs('.e'),
    logo: qsa('.e__logo'),
    topLine: qsa('.e__line:not(.e__line--rotate) .invisible-char'),
    text: qsa('.e__text .invisible-char'),
    bottomLine: qsa('.e__line--rotate .invisible-char'),
    button: qs('.e .button'),
  },
  // values: {
  //   self: qs('.values'),
  //   list: qs('.values__list'),
  //   title: qsa('.values__title .invisible-char'),
  //   description: qs('.values__description'),
  //   listItems: qsa('.values__list .value'),
  // },
  services: {
    self: qs('.services'),
    title: qsa('.services__title .invisible-char'),
    description: qs('.services__description'),
    nav: qs('.services__nav'),
    service: qs('.services__service'),
    navButtons: qsa('.services__btn'),
    listItems: qsa('.service__container'),
  },
  subService: {
    self: qs('.sb'),
    listItems: qsa('.sbb'),
    title: qsa('.sb__title .invisible-char'),
    description: qs('.sb__description'),
  },
  safety: {
    self: qs('.safety'),
    title: qsa('.safety__title .invisible-char'),
    description: qs('.safety__description'),
    blockquote: qs('.safety__blockquote'),
    sheriff: qs('.safety__sheriff'),
    bg: qs('.safety__bg-holder'),
  },
  newNav: {
    self: qs('.new-nav'),
    title: qsa('.new-nav__title .invisible-char'),
    description: qs('.new-nav__description'),
    bg: qs('.new-nav__bg'),
  },
  newDirection: {
    self: qs('.new-direction'),
    title: qsa('.new-direction__title .invisible-char'),
    description: qs('.new-direction__description'),
    bg: qs('.new-direction__bg'),
    img: qs('.new-direction__img'),
  },
});

export default getDOM;
