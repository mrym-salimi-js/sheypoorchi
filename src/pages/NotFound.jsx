import { Link } from 'react-router-dom';
import notFound from '../../public/img/404.svg';

export default function NotFound() {
  return (
    <div className='w-full h-full flex items-center justify-center gap-10 flex-col'>
      <img className='w-[50%] h-[50%] ' src={notFound} />
      <Link to={'/'}>
        <button className='w-28 h-11 text-white text-sm text-center p-3 rounded-lg hover:opacity-[0.7] block bg-[#84105c]'>
          شیپورچی
        </button>
      </Link>
    </div>
  );
}
