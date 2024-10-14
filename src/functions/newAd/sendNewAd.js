import { useEffect } from 'react';
import { insertNewAd } from '../../services/insertNewAd';
import axios from 'axios';

export async function sendNewAd(
  setSendingFormCallback,
  newAdStorageValue,
  attrs
) {
  const photo = newAdStorageValue.photo;
  const category = newAdStorageValue.category.dependencies;
  const attribute = attrs;
  const title = newAdStorageValue.title;
  const description = newAdStorageValue.description;
  const location = newAdStorageValue.location.dependencies;
  const coordinate = {
    lat: newAdStorageValue.location.lat,
    lon: newAdStorageValue.location.lon,
  };
  const userType = newAdStorageValue.userType;
  const phone = newAdStorageValue.phone;
  const chat = newAdStorageValue.chat;
  console.log({
    photo,
    category,
    attribute,
    title,
    description,
    location,
    coordinate,
    userType,
    phone,
    chat,
  });
  try {
    const response = await axios.post('http://127.0.0.1:5137/api/ads/', {
      title,
      description,
      photo,
      category,
      location,
      attribute,
      userType,
      phone,
      chat,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }

  // await insertNewAd(
  //   photo,
  //   category,
  //   attributes,
  //   adTitle,
  //   adDesc,
  //   location,
  //   coordinate,
  //   userType,
  //   phone,
  //   chat
  // ).then((res) => {
  //   res && setSendingFormCallback(true);
  // });
}
