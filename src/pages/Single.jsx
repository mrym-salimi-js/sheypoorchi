import { useEffect, useRef, useState } from 'react';
import BreadCrumbs from '../components/breadCrumbs/BreadCrumbs';
import { Map } from '../components/map/Map';

import AdInfo from '../components/single/adTextInfo/AdInfo';
import { Gallery } from '../components/single/adDispalyInfo/gallery/Gallery';
import { getAd } from '../services/getAd';
import FullScreenGallery from '../components/single/adDispalyInfo/fullScreenGallery/FullScreenGallery';
import { Header } from '../components/header/Header';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';

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
    id,
    location,
    coordinate,
    photo,
    title,
    userType,
  } = singleAd;

  return (
    <>
      <div className='w-full p-6 lg:w-[80%]  flex flex-col justify-between '>
        <Header />
        <BreadCrumbs
          adCategory={JSON.parse(category)}
          adTitle={JSON.parse(title)}
        />

        <div className='w-full flex flex-col lg:flex-row justify-between items-start gap-14 lg:gap-0'>
          <div className='w-full  lg:w-[45%]  h-auto flex  flex-col gap-6 lg:items-start items-center'>
            {photoFullScreen ? (
              <Gallery
                adPhoto={JSON.parse(photo)}
                visibleThumbnailNumber={visibleThumbnailNumber}
              />
            ) : (
              <Gallery
                adPhoto={JSON.parse(photo)}
                photoFullScreen={photoFullScreen}
                setPhotoFullScreen={setPhotoFullScreen}
                setCounter={setCounter}
                counter={counter}
                photoParantRef={photoParantRef}
                const
                visibleThumbnailNumber={visibleThumbnailNumber}
              />
            )}
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

          <AdInfo
            title={JSON.parse(title)}
            attributes={JSON.parse(attributes)}
            description={JSON.parse(description)}
            location={JSON.parse(location)}
            created_at={created_at}
          />
        </div>
      </div>
      <FullScreenGallery
        adPhoto={JSON.parse(photo)}
        photoFullScreen={photoFullScreen}
        setPhotoFullScreen={setPhotoFullScreen}
        setCounter={setCounter}
        counter={counter}
        photoParantRef={photoParantRef}
        visibleThumbnailNumber={visibleThumbnailNumber}
      />
      <NavBar />
    </>
  );
}
