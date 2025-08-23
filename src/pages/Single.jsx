import { createContext, useEffect, useRef, useState } from 'react';
import SinglePageBreadCrumbs from '../components/breadCrumbs/SinglePageBreadCrumbs';
import { Map } from '../components/map/Map';
import AdInfo from '../components/single/adTextInfo/AdInfo';
import { Gallery } from '../components/single/adGalleryInfo/Gallery';
import { getAd } from '../services/getAd';
import FullScreenGallery from '../components/single/adGalleryInfo/FullScreenGallery';
import { Header } from '../components/header/Header';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { getCost } from '../utils/advertisements/getCost';
import { useQuery } from '@tanstack/react-query';
import PageLoading from '../components/globals/PageLoading';
import { updateUserStatus } from '../services/user/updateUserStatus';
import { Footer } from '../components/Footer';

export const SingleContext = createContext();

export default function Single() {
  updateUserStatus();
  const params = useParams();
  const id = params.id;
  const { data, error, isLoading } = useQuery({
    queryKey: ['ad', id],
    queryFn: () => getAd(id),
  });

  error && console.dir(error);

  // Save Home scroll and scroll to top of single page
  useEffect(() => {
    sessionStorage.setItem('scroll', window.scrollY);
    window.scroll(0, 0);
  }, []);

  return (
    <>
      {isLoading && <PageLoading />}
      {data &&
        [data.data].map((item) => {
          return (
            <SingleAdDetails
              singleAd={item}
              key={item._id}
              adCreator={data.adCreator}
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

  const [saved, setSaved] = useState();

  const [photoFullScreen, setPhotoFullScreen] = useState(false);
  const [cost, setCost] = useState([]);
  const {
    attribute,
    category,
    createAt,
    description,
    location,
    coordinate,
    photo,
    phone,
    title,
    chat,
    userId,
    _id,
  } = singleAd;

  useEffect(() => {
    document.title = title;

    getCost(attribute, (costVal) => {
      setCost(costVal);
    });
  }, []);

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
        createAt,
        cost,
        _id,
        saved,
        setSaved,
        chat,
        phone,
        userId,
      }}
    >
      <div className='w-full p-3 lg:w-[80%]  flex flex-col justify-between relative pb-24'>
        <div className='hidden lg:block lg:w-full'>
          <Header />
        </div>
        <div className='hidden lg:block '>
          <SinglePageBreadCrumbs />
        </div>

        <div className='w-full mt-1 flex flex-col lg:flex-row justify-between items-start  lg:gap-0'>
          <div className='w-full  lg:w-[45%]  h-auto flex flex-col gap-4 lg:items-start items-center'>
            {photo[0] && <Gallery partScreen={true} />}
            <div className='w-full h-12 border-y sm:border-none lg:hidden px-4 flex items-center'>
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
      {photo !== undefined && photo[0] && <FullScreenGallery />}
      <Footer />
      <NavBar />
    </SingleContext.Provider>
  );
}
