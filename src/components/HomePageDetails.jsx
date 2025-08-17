import HomePageBreadCrumb from './breadCrumbs/HomePageBreadCrumb';
import Category from './Category';
import { Speaker } from './globals/Icons';

export default function HomePageDetails() {
  return (
    <>
      <Category />
      <div className='w-[98%] h-14 p-4 flex flex-row gap-3 justify-start items-center border-t-[1px] border-b-[1px] '>
        <Speaker color={'#84105C'} size={'size-7'} />
        <HomePageBreadCrumb />
      </div>
    </>
  );
}
