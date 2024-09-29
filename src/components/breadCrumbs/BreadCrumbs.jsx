import { ChevronLeft } from '../globals/Icons';

export default function BreadCrumbs({ adCategory, adTitle }) {
  return (
    <div className='w-auto h-auto flex gap-2 pt-6 pb-6 absolute top-[442px] right-[45px] lg:static '>
      <ul className='w-auto flex gap-2 items-center justify-start'>
        {adCategory !== undefined &&
          adCategory.map((item) => {
            return <BreadCrumbItem breadItem={item} key={item.id} />;
          })}
      </ul>
      {adTitle !== undefined && (
        <p className='text-sm text-gray-400'>{adTitle}</p>
      )}
    </div>
  );
}

export function BreadCrumbItem({ breadItem }) {
  return (
    <li className='w-auto h-full flex items-center justify-center'>
      <a
        href=''
        className='w-full h-full outline-none flex gap-1 items-center cursor-pointer'
      >
        <p className='text-sm text-black'>{breadItem.name}</p>
        <ChevronLeft color={'#000000'} size={'size-4'} />
      </a>
    </li>
  );
}
