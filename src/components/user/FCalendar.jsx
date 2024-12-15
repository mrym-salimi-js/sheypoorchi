import { Calendar } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import 'react-date-object';
import { ChevronLeft, ChevronRight } from '../globals/Icons';

export default function FCalendar() {
  return (
    <div className='w-full h-auto flex items-center justify-center p-4 border border-green-100 rounded-3xl bg-white'>
      <Calendar
        calendar={persian}
        locale={persian_fa}
        renderButton={<CustomButton />}
      />
    </div>
  );
}
function CustomButton({ direction, handleClick, disabled }) {
  return (
    <i
      onClick={handleClick}
      style={{
        padding: '0 10px',
        fontWeight: 'bold',
        // color: disabled ? 'gray' : 'blue',
      }}
      className={disabled ? 'cursor-default' : 'cursor-pointer'}
    >
      {direction === 'right' ? (
        <ChevronLeft color={'#71ae77e6'} size={'size-5'} strokeWidth={2} />
      ) : (
        <ChevronRight color={'#71ae77e6'} size={'size-5'} strokeWidth={2} />
      )}
    </i>
  );
}
