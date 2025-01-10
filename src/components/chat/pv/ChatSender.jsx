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
    <div className='w-full h-16 flex gap-1 items-center justify-around px-2'>
      <div className=' h-5'>
        <LinkFile size={'size-6 z-0'} color={'#3a723f70'} />
        <input
          onChange={handleSelectFile}
          ref={fileInput}
          multiple
          type='file'
          className='opacity-0 z-[10000] w-6 relative bottom-6 cursor-pointer'
        />
      </div>
      <input
        onKeyDown={handleKeyDown}
        ref={msgInput}
        type='text'
        placeholder='پیام'
        className=' w-[80%] h-full text-sm text-gray-400 outline-none placeholder:text-gray-200'
      />
      <div className='cursor-pointer self-center' onClick={handleSendingMsg}>
        <Send size={'size-6'} color={'#3a723f70'} />
      </div>
    </div>
  );
}
