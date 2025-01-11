import useBase64ToBlob from '../../hooks/useBase64ToBlob';
import { _ } from 'lodash';
import { omit } from 'lodash';

const formData = async (newAdStorageValue, userInfo) => {
  const formData = new FormData();

  const allPhoto =
    newAdStorageValue?.phone.length > 0 &&
    newAdStorageValue?.photo?.map((p) => {
      const blob = useBase64ToBlob(p.src, p.type);

      return blob
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

  // Remove Some Key From Atrribut That Should Not Save In DB
  const modifiedAttrs = newAdStorageValue?.attribute.map((obj) => {
    const newObj = { ...obj };
    delete newObj.options;
    delete newObj.type;
    return newObj;
  });

  formData?.append('attribute', JSON.stringify(modifiedAttrs));
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
  formData?.append('userId', userInfo?._id);
  formData?.append('phone', newAdStorageValue.phone);
  formData?.append('chat', newAdStorageValue.chat);

  return formData;
};
export default formData;
