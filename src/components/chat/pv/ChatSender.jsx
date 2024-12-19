import { LinkFile, Send } from '../../globals/Icons';

export default function ChatSender({
  setSelectedFiles,
  fileInput,
  msgInput,
  handleSendingMsg,
}) {
  // Set Selected Files
  const handleSelectFile = () => {
    fileInput?.current?.files.length > 0 &&
      setSelectedFiles(fileInput?.current?.files);
  };

  const handleKeyDown = (event) => {
    if (
      msgInput.current?.value.length > 0 ||
      fileInput.current?.value.length > 0
    ) {
      event.key === 'Enter' && handleSendingMsg();
    }
  };
  return (
    <div className='w-full h-14 flex relative items-center gap-4 p-3 '>
      <div className='cursor-pointer absolute h-4 top-4  self-center'>
        <LinkFile size={'size-6 z-0'} color={'#93617f'} />
        <input
          onChange={handleSelectFile}
          ref={fileInput}
          multiple
          type='file'
          className='opacity-0 z-[10000] w-6 relative bottom-6 cursor-pointer'
        />
      </div>
      <div className='w-[90%] h-full relative right-[8%] flex justify-between items-center left-0'>
        <input
          onKeyDown={handleKeyDown}
          ref={msgInput}
          type='text'
          placeholder='پیام'
          className=' w-[90%] text-sm text-gray-400 outline-none'
        />
        <div className='cursor-pointer' onClick={handleSendingMsg}>
          <Send size={'size-6'} color={'#84105C'} />
        </div>
      </div>
    </div>
  );
}
