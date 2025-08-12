import { AdCart } from './AdCart';

export function AdsList({ adsList }) {
  return (
    <div className='w-full h-auto p-2 pb-24'>
      <div className='w-full h-auto p-2'>
        <ul
          className={`
            w-full h-auto
            grid
            gap-6
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            xl:grid-cols-4
          `}
        >
          {adsList &&
            adsList.map((item) => <AdCart adItem={item} key={item._id} />)}
        </ul>
      </div>
    </div>
  );
}
