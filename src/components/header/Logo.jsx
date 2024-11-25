import { Speaker } from '../globals/Icons';

export function Logo({ handleNavTo }) {
  return (
    <a
      href='/s/iran'
      onClick={(event) => handleNavTo(event, '/s/iran')}
      className='flex'
    >
      <div className='flex gap-3 items-center'>
        <Speaker color={'#84105C'} size={'size-8'} />
        <h2 className='text-black'>شیپورچی</h2>
      </div>
    </a>
  );
}
