/* eslint-disable no-new */
import Menu from './menu';

// menu (<nav> element)
const menuEl = document.querySelector('.list');

// preload the images set as data attrs in the menu items
export default function init() {
  // initialize menu
  new Menu(menuEl);
}
