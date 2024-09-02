import Head from './Head';
import { Fields } from './fileds/Fields';
import ApplyBtn from './ApplyBtn';

export default function AdFiltersBox() {
  return (
    <div className='w-full h-full flex items-center justify-center fixed top-0 right-0 z-[10000] bg-[#2222228a] '>
      <div className='w-auto md:w-[50%] lg:w-[40%] xl:w-[30%] h-[100%] bg-white fixed right-0 '>
        <div className='w-full h-[99%] flex flex-col gap-5 overflow-y-scroll'>
          {/* Filter Head */}
          <Head />

          {/* Filter Fields */}
          <Fields />

          {/* Add Filter Btn */}
          <ApplyBtn />
        </div>
      </div>
    </div>
  );
}
