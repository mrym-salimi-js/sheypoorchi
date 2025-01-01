import moment from 'moment-hijri';
import { useEffect, useState } from 'react';
export default function CurrentTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = String(date.getDate()).padStart(2, '0');

  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };
  const faDate = date.toLocaleDateString('fa-IR', options);
  const arDate = moment().format('iDD/iMMMM/iYYYY');

  const [time, setTime] = useState('00:00');

  useEffect(() => {
    setInterval(() => {
      const dateObject = new Date();

      const hour = String(dateObject.getHours()).padStart(2, '0');
      const minute = String(dateObject.getMinutes()).padStart(2, '0');
      // const second = dateObject.getSeconds();

      const currentTime = hour + ' : ' + minute;

      setTime(currentTime);
    }, 1000);
  }, []);

  return (
    <div className='w-full h-auto p-6 border border-blue-100 rounded-3xl bg-white flex justify-between items-center'>
      <div className='w-auto h-auto p-2 flex flex-col gap-3 items-end'>
        <p
          dir='ltr'
          className='text-[0.8rem] text-[#cccccc]'
        >{`${year}/${month}/${day}`}</p>
        <p className='text-[0.8rem] text-[#cccccc]'>{arDate}</p>
      </div>
      <div className='w-auto h-auto p-2 flex flex-col items-end gap-3'>
        <p dir='ltr' className='text-2xl text-blue-300'>
          {time}
        </p>
        <p className='text-[0.8rem] '>{faDate}</p>
      </div>
    </div>
  );
}
