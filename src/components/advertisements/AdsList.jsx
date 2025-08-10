import { AdCart } from './AdCart';

export function AdsList({ adsList }) {
  return (
    <div className='w-full h-auto p-2 pb-24'>
      <div className='w-full h-auto p-2 '>
        <ul
          className={`w-full h-auto flex flex-wrap gap-y-8 gap-x-6 ${
            adsList?.length >= 4
              ? `justify-evenly`
              : `justify-evenly md:justify-start`
          }`}
        >
          {adsList &&
            adsList?.map((item) => {
              return <AdCart adItem={item} key={item._id} />;
            })}
        </ul>
      </div>
    </div>
  );
}
