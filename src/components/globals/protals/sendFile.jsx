import { createPortal } from 'react-dom';

export function SendFile({ children }) {
  const protalRoot = document.getElementById('protal-root');
  //   console.log(children);
  return createPortal(children, protalRoot);
}
