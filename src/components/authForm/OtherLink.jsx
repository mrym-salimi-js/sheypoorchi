import { Link } from 'react-router-dom';

export default function OtherLink({ otherLink }) {
  return (
    <div className='flex flex-col gap-2'>
      {otherLink.map((item, index) => {
        return (
          <Link to={item.link} key={index}>
            <p className='text-gray-300 text-[0.8rem] mr-4'>{item.lable}</p>
          </Link>
        );
      })}
    </div>
  );
}
