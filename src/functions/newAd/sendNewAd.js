import axios from 'axios';
import { _ } from 'lodash';
import { omit } from 'lodash';

export async function sendNewAd(
  setSendingFormCallback,
  newAdStorageValue,
  attrs,
  formData
) {
  // Function to convert Base64 to Blob
  const base64ToBlob = (base64, contentType) => {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  };

  // Get File Format Of Photo
  const allPhoto = newAdStorageValue?.photo?.map((p) => {
    const blob = p !== undefined && base64ToBlob(p.src, p.type);
    return p !== undefined && blob
      ? new File([blob], p.name, {
          type: p.type,
        })
      : [];
  });

  allPhoto.length > 0 &&
    allPhoto.map((photo) => {
      formData?.append('photoFile', photo);
    });

  const photo = newAdStorageValue?.photo?.map((obj) =>
    _.omit(obj, ['src', 'type', 'size'])
  );
  formData?.append('photo', JSON.stringify(photo));
  formData?.append(
    'category',
    JSON.stringify(newAdStorageValue.category.dependencies)
  );
  formData?.append('attribute', JSON.stringify(attrs));
  formData?.append('title', JSON.stringify(newAdStorageValue.title));
  formData?.append(
    'description',
    JSON.stringify(newAdStorageValue.description)
  );
  formData?.append(
    'location',
    JSON.stringify(newAdStorageValue.location.dependencies)
  );
  formData?.append(
    'coordinate',
    JSON.stringify({
      lat: newAdStorageValue.location.lat,
      lon: newAdStorageValue.location.lon,
    })
  );
  formData?.append('userType', newAdStorageValue.userType);
  formData?.append('phone', newAdStorageValue.phone);
  formData?.append('chat', newAdStorageValue.chat);

  // for (let pair of formData.entries()) {
  //   console.log(`${pair[0]}: ${pair[1]}`);
  // }

  try {
    const response = await axios.post(
      'http://127.0.0.1:5137/api/ads/',
      formData,
      {
        headers: { 'Content-Type': 'multipart:form-data' },
        // body: JSON.stringify({ key: 'value' }),
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
