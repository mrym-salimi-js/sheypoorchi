import { CloseMark } from './Icons';

export default function NotifToast({ setNotif, notif }) {
  const handleClosing = () => {
    setNotif({ message: '', status: '' });
  };
  return (
    <div className='w-full h-auto p-4 flex items-center justify-center fixed top-0 m-auto right-0 left-0 z-50'>
      <div
        id='toast-success'
        className='flex  ease-in-out duration-500 items-center justify-between w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800'
        role='alert'
      >
        <div className='flex gap-2 items-center'>
          {notif.status !== 'fail' ? (
            <div className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200'>
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
              </svg>
            </div>
          ) : (
            <div className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200'>
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z' />
              </svg>
            </div>
          )}

          <div className='ms-3 text-sm font-normal'>{notif.message}</div>
        </div>
        <CloseMark
          color={'gray'}
          size={'size-6'}
          handleClosing={handleClosing}
        />
      </div>
    </div>
  );
}
