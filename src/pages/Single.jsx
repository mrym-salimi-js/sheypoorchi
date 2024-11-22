import { createContext, useEffect, useRef, useState } from 'react';
import SinglePageBreadCrumbs from '../components/breadCrumbs/SinglePageBreadCrumbs';
import { Map } from '../components/map/Map';
import AdInfo from '../components/single/adTextInfo/AdInfo';
import { Gallery } from '../components/single/adGalleryInfo/Gallery';
import { getAd } from '../services/getAd';
import FullScreenGallery from '../components/single/adGalleryInfo/FullScreenGallery';
import { Header } from '../components/header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { getCost } from '../functions/advertisements/getCost';
import { navTo } from '../functions/globals/navTo';

export const SingleContext = createContext();

export default function Single() {
  const [singleAd, setSingleAd] = useState();
  const params = useParams();

  useEffect(() => {
    const getSingleAd = async () => {
      const response = await getAd(params.id);
      response.status === 'success' && setSingleAd(response.data);
    };

    getSingleAd();
  }, []);
  // console.log(typeof singleAd);
  return (
    <>
      {singleAd &&
        [singleAd].map((item) => {
          return (
            console.log(item),
            (<SingleAdDetails singleAd={item} key={item._id} />)
          );
        })}
    </>
  );
}
export function SingleAdDetails({ singleAd }) {
  const photoParantRef = useRef();
  const [counter, setCounter] = useState(0);
  const visibleThumbnailNumber = 4;

  const [photoFullScreen, setPhotoFullScreen] = useState(false);
  const [cost, setCost] = useState([]);
  const {
    attribute,
    category,
    createAd,
    description,
    location,
    coordinate,
    photo,
    title,
    _id,
  } = singleAd;
  console.log(singleAd);

  useEffect(() => {
    getCost(attribute, (costVal) => {
      setCost(costVal);
    });
  }, []);
  const navigateTo = useNavigate();
  const handleBackBtn = () => {
    navTo(
      localStorage.getItem('last-url-pathname'),
      localStorage.getItem('last-url-search'),
      navigateTo
    );
  };
  return (
    <SingleContext.Provider
      value={{
        category,
        title,
        photo,
        visibleThumbnailNumber,
        photoFullScreen,
        setPhotoFullScreen,
        setCounter,
        counter,
        photoParantRef,
        attribute,
        description,
        location,
        createAd,
        cost,
        _id,
      }}
    >
      <div className='w-full p-6 lg:w-[80%]  flex flex-col justify-between '>
        <button
          onClick={handleBackBtn}
          className='flex xl:hidden p-2 bg-[#efeaea57] rounded-md  items-center justify-center outline-none'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='#b1b1b1'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m8.25 4.5 7.5 7.5-7.5 7.5'
            />
          </svg>
        </button>
        <Header />
        <SinglePageBreadCrumbs />

        <div className='w-full mt-6 flex flex-col lg:flex-row justify-between items-start gap-14 lg:gap-0'>
          <div className='w-full  lg:w-[45%]  h-auto flex  flex-col gap-6 lg:items-start items-center'>
            <Gallery partScreen={true} />
            {coordinate && (
              <Map
                width={'87%'}
                lat={JSON.parse(coordinate).lat}
                lon={JSON.parse(coordinate).lon}
                page={'single'}
                zoom={16}
              />
            )}
          </div>

          <AdInfo />
        </div>
      </div>
      <FullScreenGallery />
      <NavBar />
    </SingleContext.Provider>
  );
}
