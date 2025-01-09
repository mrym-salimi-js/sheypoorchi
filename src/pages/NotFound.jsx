import notFound from '../../public/img/404.png';

export default function NotFound() {
  return (
    <div className='w-auto h-[90%] flex items-center justify-between'>
      <img src={notFound} />
    </div>
  );
}
