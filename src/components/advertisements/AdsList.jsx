import { AdCart } from './AdCart';

export function AdsList({ adsList }) {
  return (
    <div className='w-full h-auto p-2 pb-24'>
      <div className='w-full h-auto '>
        <ul
          className={`
            w-full h-auto
            grid
            gap-3
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
          `}
        >
          {adsList &&
            adsList.map((item) => <AdCart adItem={item} key={item._id} />)}
        </ul>
      </div>
    </div>
  );
}
