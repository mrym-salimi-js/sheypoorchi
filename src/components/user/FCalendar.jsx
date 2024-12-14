import { Calendar } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import 'react-date-object';

export default function FCalendar() {
  return (
    <div className='w-full h-auto flex items-center justify-center p-4 shadow-md rounded-3xl bg-white'>
      <Calendar calendar={persian} locale={persian_fa} />
    </div>
  );
}
