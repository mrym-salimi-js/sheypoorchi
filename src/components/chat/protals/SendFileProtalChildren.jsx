import { CloseMark, Document } from '../../globals/Icons';
import { SendFile } from '../../globals/protals/sendFile';

export function SendFileProtalChildren({
  selectedFiles,
  setSelectedFiles,
  handleSendingMsg,
}) {
  // Close Sending File Protal
  const handleClosing = () => {
    setSelectedFiles('');
  };
  return (
    <SendFile>
      <div className='w-[90%] md:w-[40%]  rounded-2xl shadow-sm bg-white flex flex-col  p-4 z-10'>
        {/*Protal Header */}
        <div className='w-full flex items-center justify-between mb-3'>
          <div className='flex gap-3 items-center'>
            <CloseMark
              handleClosing={handleClosing}
              size={'size-6'}
              color={'black'}
            />
            <p className='text-md'>ارسال فایل</p>
          </div>
          <div
            onClick={handleSendingMsg}
            className='w-auto h-auto p-4 hover:opacity-[0.7] text-center leading-3 rounded-2xl bg-[#84105C] text-sm text-white cursor-pointer'
          >
            ارسال
          </div>
        </div>
        {/* Protal Body */}
        {Object.keys(selectedFiles).map((file) => {
          return (
            <>
              <div className='w-full flex items-center justify-center p-2'>
                <div className='w-full h-auto p-2 flex items-center gap-3 border rounded-2xl'>
                  <span className='w-12 h-12 bg-gray-400 rounded-2xl flex items-center justify-center'>
                    <Document size={'size-6'} color={'#ffffff'} />
                  </span>
                  <p className='text-sm'>{selectedFiles[file].name}</p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </SendFile>
  );
}
