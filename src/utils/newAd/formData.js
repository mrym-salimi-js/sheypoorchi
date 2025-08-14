const formData = async (newAdStorageValue, userInfo) => {
  const formData = new FormData();

  // dynamic import useBase64ToBlob
  const { default: useBase64ToBlob } = await import(
    '../../hooks/useBase64ToBlob'
  );

  // dynamic import lodash/omit فقط وقتی لازم شد
  const { default: omit } = await import('lodash/omit');

  // تبدیل عکس‌ها به Blob
  const allPhoto = newAdStorageValue?.photo
    ?.map((p) => {
      const blob = useBase64ToBlob(p.src, p.type);
      return blob ? new File([blob], p.name, { type: p.type }) : null;
    })
    .filter(Boolean);

  // اضافه کردن عکس‌ها به FormData به صورت batch
  allPhoto?.forEach((photo, index) => {
    setTimeout(() => formData.append('photoFile', photo), index * 0);
  });

  // حذف فیلدهای اضافی عکس‌ها و اضافه کردن به FormData
  const photo = newAdStorageValue?.photo?.map((obj) =>
    omit(obj, ['src', 'type', 'size'])
  );
  formData.append('photo', JSON.stringify(photo));

  // دسته‌بندی‌ها
  formData.append(
    'category',
    JSON.stringify(newAdStorageValue.category.dependencies)
  );

  // حذف کلیدهای اضافی attributes
  const modifiedAttrs = newAdStorageValue?.attribute.map((obj) => {
    const newObj = { ...obj };
    delete newObj.options;
    delete newObj.type;
    return newObj;
  });
  formData.append('attribute', JSON.stringify(modifiedAttrs));

  // بقیه فیلدها
  formData.append('title', JSON.stringify(newAdStorageValue.title));
  formData.append('description', JSON.stringify(newAdStorageValue.description));
  formData.append(
    'location',
    JSON.stringify(newAdStorageValue.location.dependencies)
  );
  formData.append(
    'coordinate',
    JSON.stringify({
      lat: newAdStorageValue.location.lat,
      lon: newAdStorageValue.location.lon,
    })
  );
  formData.append('userType', newAdStorageValue.userType);
  formData.append('userId', userInfo?._id);
  formData.append('phone', newAdStorageValue.phone);
  formData.append('chat', newAdStorageValue.chat);

  return formData;
};

export default formData;
