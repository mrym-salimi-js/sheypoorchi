import CurrentTime from '../../components/user/CurrentTime';
import FCalendar from '../../components/user/FCalendar';
import Menu from '../../components/user/menu/Menu';
import ReviewAccount from '../../components/user/ReviewAccount';
import TodoList from '../../components/user/todoList/TodoList';
import Weather from '../../components/user/Weather';
import WellCome from '../../components/user/WellCome';

export default function Dashboard() {
  return (
    <>
      <div className='w-full h-full  bg-gray-50 flex flex-col gap-5 px-3 md:px-7 items-end '>
        <Menu />
        <div className='w-full h-full md:w-[66%]  lg:w-[76%] xl:w-[81%] p-2 pt-6 flex flex-col items-center gap-8 '>
          <WellCome />
          <ReviewAccount />
          <div className='w-full h-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3'>
            <FCalendar />
            <div className='w-full h-auto flex flex-col gap-2'>
              <CurrentTime />
              <Weather />
            </div>
            <TodoList />
          </div>
        </div>
      </div>
    </>
  );
}
