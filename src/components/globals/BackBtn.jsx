export function BackBtn({
  setTitle,
  title,
  lastList,
  setListItems,
  setListTitle,
}) {
  const handleListItems = () => {
    // Back For Location Lists
    title && setTitle(title);

    // Back For Category Lists
    setListTitle && setListTitle(null);
    setListItems && setListItems(lastList);
  };
  return (
    <button
      onClick={handleListItems}
      className='p-2 bg-[#efeaea57] rounded-md flex items-center justify-center outline-none'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='#b1b1b1'
        className='size-6'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='m8.25 4.5 7.5 7.5-7.5 7.5'
        />
      </svg>
    </button>
  );
}
