export default function ThreePointsLoading() {
  return (
    <div className='flex gap-1  '>
      <div className='h-6 w-6 bg-[#cd7fb1] rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='h-6 w-6 bg-[#cd7fb0bf] rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='h-6 w-6 bg-[#cd7fb098] rounded-full animate-bounce'></div>
    </div>
  );
}
