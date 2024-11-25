import { createPortal } from 'react-dom';

export function ProtalMatch({ children }) {
  const protalRoot = document.getElementById('protal-root');
  //   console.log(children);
  return createPortal(children, protalRoot);
}
