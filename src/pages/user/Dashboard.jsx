import FCalendar from '../../components/user/FCalendar';
import Menu from '../../components/user/menu/Menu';
import ReviewAccount from '../../components/user/ReviewAccount';
import WellCome from '../../components/user/WellCome';

export default function Dashboard() {
  return (
    <>
      <div className='w-full h-full  bg-gray-50 flex flex-col gap-7 px-3 md:px-7 items-end '>
        <Menu />
        <div className='w-full h-full md:w-[65%]  lg:w-[75%] xl:w-[80%] p-2 pt-6 flex flex-col items-center gap-8 '>
          <WellCome />
          <ReviewAccount />
          <div className='w-full  grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3'>
            <FCalendar />
            <div className='w-full h-60 p-4 border rounded-3xl bg-white'></div>
            <div className='w-full h-60 p-4  border rounded-3xl bg-white'></div>
          </div>
        </div>
      </div>
    </>
  );
}
