import { getScrollY } from './scrollManager';

export function unlockBodyScroll() {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, getScrollY());
}
