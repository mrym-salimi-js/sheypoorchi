import { getScrollY, setScrollY } from './scrollManager';

export function lockBodyScroll() {
  setScrollY(window.scrollY);
  document.body.style.position = 'fixed';
  document.body.style.top = `-${getScrollY()}px`;
  document.body.style.width = '100%';
}
