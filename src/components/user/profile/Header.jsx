import { useRef } from 'react';
import defaultProfile from '../../../assets/img/images.png';
import axios from 'axios';

export default function Header({ userInfo, setUserInfo }) {
  const photoRef = useRef();
  const baseURL = import.meta.env.VITE_BASE_URL;

  const handlePhoto = async (event) => {
    const selectedFile = event.target.files[0];
    const fileName = userInfo._id + '-' + selectedFile.name;
    const newFile = new File([selectedFile], fileName, {
      type: selectedFile.type,
    });
    const formData = new FormData();
    formData.append('photo', newFile);

    try {
      const res = await axios.patch(
        `${baseURL}/api/users/updatePhoto`,
        formData,
        {
          withCredentials: true,
        }
      );

      setUserInfo(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-[98%] h-40 sticky top-6 z-50 rounded-3xl shadow-sm bg-[rgb(169,206,173)] '>
      <p className='w-full relative bottom-[20px] md:bottom-0 mt-16 text-center text-gray-50 text-md'>
        ویرایش اطلاعات حساب کاربری
      </p>
      <div className='w-auto flex gap-12 items-center'>
        <div className='w-auto flex flex-col items-center relative bottom-3 right-9'>
          <input
            onChange={handlePhoto}
            className='hidden'
            type='file'
            accept='image/*'
            ref={photoRef}
          />
          <img
            onClick={() => {
              photoRef?.current?.click();
            }}
            className='w-36 h-36 object-cover z-30 cursor-pointer  border-[10px] border-gray-50 rounded-full overflow-hidden '
            src={
              userInfo?.photo !== undefined
                ? `${baseURL}/user/img/${userInfo?.photo}`
                : defaultProfile
            }
          />
        </div>
        <p className='text-sm self-start relative top-9 text-gray-50'>
          مریم سلیمی
        </p>
      </div>
    </div>
  );
}
