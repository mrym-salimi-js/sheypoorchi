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
  const [adCreator, setAdcreator] = useState();
  const params = useParams();

  useEffect(() => {
    const getSingleAd = async () => {
      const response = await getAd(params.id);
      response.status === 'success' && setSingleAd(response.data),
        setAdcreator(response.adCreator);
    };

    getSingleAd();
  }, []);

  return (
    <>
      {singleAd &&
        [singleAd].map((item) => {
          return (
            <SingleAdDetails
              singleAd={item}
              key={item._id}
              adCreator={adCreator}
            />
          );
        })}
    </>
  );
}
export function SingleAdDetails({ singleAd, adCreator }) {
  const photoParantRef = useRef();
  const [counter, setCounter] = useState(0);
  const visibleThumbnailNumber = 4;
  const navigateTo = useNavigate();

  const [saved, setSaved] = useState();

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

  useEffect(() => {
    document.title = title;

    getCost(attribute, (costVal) => {
      setCost(costVal);
    });
  }, []);

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
        adCreator,
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
        saved,
        setSaved,
      }}
    >
      <div className='w-full p-3 lg:w-[80%]  flex flex-col justify-between relative pb-24'>
        <div className='w-full p-3 flex gap-3 items-center lg:hidden'>
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
          <h6>{title}</h6>
        </div>
        <div className='hidden lg:block lg:w-full'>
          <Header />
        </div>
        <div className='hidden lg:block '>
          <SinglePageBreadCrumbs />
        </div>

        <div className='w-full mt-1 flex flex-col lg:flex-row justify-between items-start gap-14 lg:gap-0'>
          <div className='w-full  lg:w-[45%]  h-auto flex flex-col gap-6 lg:items-start items-center'>
            {photo[0] && <Gallery partScreen={true} />}
            <div className='w-full lg:hidden'>
              <SinglePageBreadCrumbs />
            </div>
            <div className='hidden lg:block lg:w-full'>
              {coordinate && (
                <Map
                  width={'87%'}
                  lat={coordinate.lat}
                  lon={coordinate.lon}
                  page={'single'}
                  zoom={16}
                />
              )}
            </div>
          </div>

          <AdInfo />
          <div className='w-full lg:hidden self-center'>
            {coordinate && (
              <Map
                width={'87%'}
                lat={coordinate.lat}
                lon={coordinate.lon}
                page={'single'}
                zoom={16}
              />
            )}
          </div>
        </div>
      </div>
      {photo[0] && <FullScreenGallery />}
      <NavBar />
    </SingleContext.Provider>
  );
}
