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
import { getCost } from '../functions/advertisements/getCost';
import { getDifferDate } from '../functions/advertisements/getDifferDate';

export const SingleContext = createContext();

export default function Single() {
  const [singleAd, setSingleAd] = useState();
  const params = useParams();

  useEffect(() => {
    const getSingleAd = async () => {
      const response = await getAd(params.id);
      setSingleAd(response);
    };

    getSingleAd();
  }, []);

  return (
    <>
      {singleAd &&
        singleAd.map((item) => {
          return <SingleAdDetails singleAd={item} key={item.id} />;
        })}
    </>
  );
}
export function SingleAdDetails({ singleAd }) {
  const photoParantRef = useRef();
  const [counter, setCounter] = useState(0);
  const visibleThumbnailNumber = 4;

  const [photoFullScreen, setPhotoFullScreen] = useState(false);

  const {
    attributes,
    category,
    created_at,
    description,
    location,
    coordinate,
    photo,
    title,
  } = singleAd;
  const adCategory = JSON.parse(category);
  const adTitle = JSON.parse(title);
  const adPhoto = JSON.parse(photo);

  const adAttributes = JSON.parse(attributes);
  const adDescription = JSON.parse(description);
  const adLocation = JSON.parse(location);

  const [date, setDate] = useState(0);
  const [cost, setCost] = useState([]);

  useEffect(() => {
    getCost(adAttributes, (costVal) => {
      setCost(costVal);
    });
    getDifferDate(created_at, (dateVal) => {
      setDate(dateVal);
    });
  }, []);

  return (
    <SingleContext.Provider
      value={{
        adCategory,
        adTitle,
        adPhoto,
        visibleThumbnailNumber,
        photoFullScreen,
        setPhotoFullScreen,
        setCounter,
        counter,
        photoParantRef,
        adAttributes,
        adDescription,
        adLocation,
        date,
        cost,
      }}
    >
      <div className='w-full p-6 lg:w-[80%]  flex flex-col justify-between '>
        <Header />
        <SinglePageBreadCrumbs />

        <div className='w-full flex flex-col lg:flex-row justify-between items-start gap-14 lg:gap-0'>
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
