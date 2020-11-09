import $ from 'jquery';

const show = () => {
  $('.curtain').addClass('show');
  $('.main').addClass('curtain-closed');
  $('.main').addClass('curtain-fired');
};

const hide = () => {
  $('.curtain').removeClass('show');
  $('.main').removeClass('curtain-closed');
};

export default {
  show,
  hide,
};
