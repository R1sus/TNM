/* eslint-disable no-new */
import Menu from './menu';

// menu (<nav> element)
const menuEl = document.querySelector('.list');
const menuEl1 = document.querySelector('.list1');

// preload the images set as data attrs in the menu items
export default function init() {
  // initialize menu
  if (menuEl !== null) {
    new Menu(menuEl);
  }
  if (menuEl1 !== null) {
    new Menu(menuEl1);
  }
}
