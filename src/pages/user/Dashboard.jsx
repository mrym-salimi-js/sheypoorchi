import CurrentTime from '../../components/user/CurrentTime';
import FCalendar from '../../components/user/FCalendar';
import ReviewAccount from '../../components/user/ReviewAccount';
import TodoList from '../../components/user/todoList/TodoList';
import Weather from '../../components/user/Weather';
import WellCome from '../../components/user/WellCome';

export default function Dashboard() {
  return (
    <>
      <div className='w-full h-full md:w-[66%]  lg:w-[76%] xl:w-[81%] p-2 pt-6 flex flex-col items-center gap-4 '>
        <div className='w-full h-auto flex flex-col sm:flex-row gap-1'>
          <WellCome />
          <CurrentTime />
        </div>
        <ReviewAccount />
        <div className='w-full h-auto pb-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3'>
          <FCalendar />
          <div className='w-full h-auto flex flex-col gap-2'>
            <Weather />
          </div>
          <TodoList />
        </div>
      </div>
    </>
  );
}
