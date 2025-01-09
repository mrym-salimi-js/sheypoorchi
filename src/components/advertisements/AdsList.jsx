import { AdCart } from './AdCart';

export function AdsList({ adsList }) {
  return (
    <div className='w-full h-auto p-2 mt-5'>
      <div className='w-full h-auto p-2 '>
        <ul className='w-full h-auto flex flex-wrap gap-y-16 gap-x-2 justify-evenly'>
          {adsList &&
            adsList?.map((item) => {
              return <AdCart adItem={item} key={item._id} />;
            })}
        </ul>
      </div>
    </div>
  );
}
