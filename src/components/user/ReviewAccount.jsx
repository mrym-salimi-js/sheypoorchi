export default function ReviewAccount() {
  return (
    <div className='w-full h-auto flex items-center justify-between'>
      <div className='w-full h-auto  grid grid-cols-1 lg:grid-cols-4 gap-4 '>
        <p className='w-full  h-32 p-4 text-center flex items-center justify-center text-sm  bg-yellow-300 rounded-3xl shadow-md'>
          1400/2/4 به خانواده ما پیوستید
        </p>
        <p className='w-full  h-32 p-4 text-center flex items-center justify-center text-sm  bg-blue-300 rounded-3xl shadow-md'>
          هنوز آگهی ندارید
        </p>
        <p className='w-full  h-32 p-4 text-center flex items-center justify-center text-sm  bg-pink-300 rounded-3xl shadow-md'>
          هنوز چتی ندارید
        </p>
        <p className='w-full  h-32 p-4 text-center flex items-center justify-center text-sm  bg-green-300 rounded-3xl shadow-md'>
          هنوز آگهی ذخیره نکردید
        </p>
      </div>
    </div>
  );
}
