export default function UserLogin() {
    return (
      <div className='w-full h-full relative flex justify-center items-center bg-[#f5f5f5]'>
        <div className='w-[90%]  md:w-[52%] lg:w-[58%] xl:w-[40%]  p-8  rounded-2xl bg-white shadow-sm'>
  
          <p className='py-2 px-4 text-lg border-r-4 border-pink-400'>ورود کاربر</p>
          <ul className='w-[98%] relative right-[2%] mt-5 p-4 flex flex-col gap-4 justify-between'>
            <li className='h-12 border-b-2 border-gray-100 flex gap-3 items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#cccccc" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
  
              <input type='email' className='outline-none h-full text-sm text-gray-400 placeholder-gray-200' placeholder='ایمیل'></input>
  
            </li>
            <li className='h-12 border-b-2 border-gray-100 flex gap-3 items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#cccccc" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
              </svg>
  
  
              <input type='password' className='outline-none h-full text-sm text-gray-400 placeholder-gray-200' placeholder='رمز عبور'></input>
  
            </li>
          </ul>
          <button className='w-36 h-11 bg-[#84105C] p-3 rounded-full flex gap-3 items-center justify-around mt-10 relative right-[5%]  hover:opacity-[0.9] shadow-md'>
            <p className='text-sm text-white'>ورود</p>
            <div className='rounded-full bg-[#89677f87] p-1 relative right-3'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </div>
          </button>
        </div>
  
      </div>
    )
  }
  