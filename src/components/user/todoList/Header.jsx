import { InVisible, Visible } from '../../globals/Icons';

export default function Header({ setVisiblity, visiblity }) {
  const handleVisiblity = () => {
    setVisiblity(visiblity === 'visible' ? 'invisible' : 'visible');
  };
  return (
    <div className='w-full p-3 flex items-center justify-between border-b'>
      <p className='text-sm'>یادداشت های من</p>
      <div
        className='w-auto h-auto p-1 flex cursor-pointer'
        onClick={handleVisiblity}
      >
        {visiblity === 'visible' ? (
          <InVisible color={'#cccccc'} size={'size-6'} />
        ) : (
          <Visible color={'#cccccc'} size={'size-6'} />
        )}
      </div>
    </div>
  );
}
