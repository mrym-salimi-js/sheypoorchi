export default function Tabs({ setProfileTab, profileTab }) {
  const handleTabs = (event) => {
    setProfileTab(event.target.id);
  };

  return (
    <div className='w-full h-auto p-2 flex gap-4 border-b-[1px] border-[rgb(169,206,173)'>
      <p
        onClick={handleTabs}
        id='info'
        className={`w-auto h-7 text-sm text-gray-300 ${
          profileTab === 'info' && `text-gray-500`
        } flex items-center p-3 py-5 border-r-4  cursor-pointer`}
      >
        ویرایش اطلاعات
      </p>
      <p
        onClick={handleTabs}
        id='pass'
        className={`w-auto h-7 text-sm text-gray-300 ${
          profileTab === 'pass' && `text-gray-500`
        } flex items-center p-3 py-5 border-r-4  cursor-pointer`}
      >
        تغییر رمز عبور
      </p>
    </div>
  );
}
