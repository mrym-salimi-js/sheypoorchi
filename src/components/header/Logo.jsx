import { Speaker } from '../globals/Icons';

export function Logo({ color, size, textStyle }) {
  return (
    <a href='/'>
      <div className='flex gap-3 items-center'>
        <Speaker color={color} size={size} />
        <h2 className={textStyle}>شیپورچی</h2>
      </div>
    </a>
  );
}
