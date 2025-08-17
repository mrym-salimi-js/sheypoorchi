import { useEffect, useState } from 'react';
import axios from 'axios';
import ThreePointsLoading from '../globals/ThreePointsLoading';

export function getSunTime(time, setSun) {
  let date = new Date(time * 1000);

  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');

  h && m && setSun(`${h}:${m}`);
}

export default function Weather() {
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [weatherInfo, setWeatherInfo] = useState();
  const [sunRise, setSunRise] = useState();
  const [sunSet, setSunSet] = useState();
  // console.dir(navigator);
  useEffect(() => {
    navigator.geolocation &&
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords?.latitude);
        setLon(position.coords?.longitude);
      });

    const getWeather = async () => {
      if (!lat || !lon) return;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fa&appid=3d9e478c482d23fb555e5fe07bdf83d9`
      );
      //   const locationNameEn = response.data.name;
      const weather = response.data;

      weather?.sys?.sunrise !== undefined &&
        getSunTime(weather?.sys.sunrise, (val) => {
          setSunRise(val);
        });
      weather?.sys?.sunset !== undefined &&
        getSunTime(weather?.sys.sunset, (val) => {
          setSunSet(val);
        });
      weather && setWeatherInfo(weather);
    };

    getWeather();
  }, [lat, lon]);

  return (
    <div
      className={`w-full h-auto p-6 border border-orange-100 rounded-3xl flex flex-col gap-2 bg-white ${
        weatherInfo === undefined && `blur-sm`
      }`}
    >
      <div className='w-auto p-2 flex justify-between'>
        <div className='w-auto flex flex-col gap-3 items-center'>
          {/* Temp Desc */}
          {weatherInfo === undefined ? (
            <ThreePointsLoading />
          ) : (
            <>
              <p className='text-sm'>{weatherInfo?.weather[0]?.description}</p>
              <p className='text-sm'>{weatherInfo?.name}</p>
            </>
          )}
        </div>
        {/* Temp */}
        <div className='w-auto flex flex-row-reverse  gap-3'>
          <p dir='ltr' className='text-orange-300 text-2xl'>
            {`${weatherInfo ? Math.floor(weatherInfo?.main.temp) : 0} °C`}
          </p>
          {/* <img
            src={`/public/weather/${weatherInfo?.weather[0]?.main}.gif`}
            className='w-10 h-10'
          /> */}
        </div>
      </div>
      {/*Sunset And Sunrise */}
      <div className='w-auto flex justify-between rounded-2xl border p-4 border-orange-100 bg-white'>
        <div className='flex gap-2'>
          <p className='text-[0.7rem]'>طلوع آفتاب</p>
          <p className='text-yellow-500 text-[0.8rem]'>{sunRise && sunRise}</p>
        </div>
        <div className='flex gap-2'>
          <p className='text-[0.7rem]'>غروب آفتاب</p>
          <p className='text-orange-500 text-[0.8rem]'>{sunSet && sunSet}</p>
        </div>
      </div>
    </div>
  );
}
