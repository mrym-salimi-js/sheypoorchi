export default function SearchAtList({ handleInputValue, plcVal }) {
  return (
    <div className='w-full h-16 rounded-lg p-2 z-20  border flex gap-1 justify-between items-center'>
      <input
        onChange={(event) => handleInputValue(event)}
        className='outline-none w-full h-full p-2 text-gray-400 placeholder-gray-200 text-[0.8rem] '
        placeholder={plcVal}
      ></input>
    </div>
  );
}
