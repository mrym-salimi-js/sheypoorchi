import { createContext, useEffect } from 'react';
import { useState } from 'react';
import { PhotoComponent } from './PhotoComponent';
import TextComponent from '../formFileds/text/TextComponent';
import UserType from './UserType';
import ToggleSwich from '../formFileds/ToggleSwich';
import NotifToast from '../globals/NotifToast';
import { Map } from '../map/Map';
import { FormHeader } from './FormHeader';
import { SubmiteFormBtn } from './SubmiteFormBtn';
import SingleSelectedSupport from './SingleSelectedSupport';
import { resetAd } from '../../store/newAdSlice';
import { useDispatch, useSelector } from 'react-redux';

export const NewAdContext = createContext();
export function NewAdForm({ userInfo }) {
  const [notifToast, setNotifToast] = useState({ message: '', status: '' });
  const [adsCategoriesList, setAdsCategoriesList] = useState();
  const [adsLocationList, setAdsLocationsList] = useState();
  const [validation, setValidation] = useState();
  const [newAdStorageValue, setNewAdStorageValue] = useState();
  const data = useSelector((state) => state.newAd);
  const dispatch = useDispatch();

  // Get Or Set Locations And Catagories Object in Local Stogarge
  useEffect(() => {
    document.title = 'ثبت آگهی';

    const values = JSON.parse(localStorage.getItem('form-list-values'));
    values && setNewAdStorageValue(values);

    !values && dispatch(resetAd());

    const cats = JSON.parse(localStorage.getItem('ads_categories_list'));
    cats && setAdsCategoriesList(cats);

    const locs = JSON.parse(localStorage.getItem('ads_locations_list'));
    locs && setAdsLocationsList(locs);
  }, []);

  // Get Store NewAd By Every Change Data (Redux)
  useEffect(() => {
    // console.log(data);
    if (data.active === true) {
      localStorage.setItem('form-list-values', JSON.stringify(data));

      setNewAdStorageValue(data);
    } else {
      const storage = JSON.parse(localStorage.getItem('form-list-values'));
      setNewAdStorageValue(storage);
    }
  }, [data]);

  const [lat, setLat] = useState(35.696111);
  const [lon, setLon] = useState(51.423056);

  useEffect(() => {
    newAdStorageValue?.location?.lat && setLat(newAdStorageValue?.location.lat);
    newAdStorageValue?.location?.lon && setLon(newAdStorageValue?.location.lon);
  }, [newAdStorageValue?.location]);

  const adTitlelabel = 'عنوان آگهی';
  const adDesclabel = 'توضیحات';
  const adTitleSubTitle = 'عنوان مناسبی برای آگهی تان وارد کنید.';
  const adDescSubTitle = 'توضیحات مناسبی برای آگهی تان وارد کنید.';

  return (
    <>
      {notifToast.message && (
        <NotifToast setNotif={setNotifToast} notif={notifToast} />
      )}
      <div className='w-[97%] lg:w-[90%] p-3 pb-32 flex flex-col  gap-3 bg-white'>
        <NewAdContext.Provider
          value={{
            newAdStorageValue,
            setValidation,
            validation,
            setNotifToast,
          }}
        >
          {/* Form Header*/}
          <FormHeader />
          <form className='flex flex-col gap-4 lg:flex-row-reverse justify-between mt-7'>
            <div className='w-full  lg:w-[50%]  flex flex-col gap-8'>
              {/* Select Photo*/}
              <PhotoComponent />
              {/* New Ad Btn */}
              <SubmiteFormBtn userInfo={userInfo} />
            </div>

            <div className='lg:w-[47%] p-3 flex flex-col gap-12 '>
              {/* Categories*/}
              <SingleSelectedSupport
                label={'دسته بندی'}
                allList={adsCategoriesList}
                storagePram={'category'}
                data={data}
              />

              {/*Categories Attributes*/}
              {newAdStorageValue?.attribute?.map((item, index) => {
                if (item.type == 1 || item.type == 6 || item.type == 0) {
                  return (
                    <TextComponent
                      key={index}
                      label={item.label}
                      index={index}
                      storagePram={'attribute'}
                      itemId={item.id}
                      filedType={'text'}
                      type={'newAd'}
                      valueType={item.type}
                      newAdStorageValue={newAdStorageValue}
                      setValidation={setValidation}
                      validation={validation}
                    />
                  );
                } else if (item.type == 2) {
                  return (
                    <SingleSelectedSupport
                      key={index}
                      label={item.label}
                      allList={item?.options}
                      index={index}
                      storagePram={'attribute'}
                      itemId={item?.id}
                      filedType={'singleSelect'}
                      data={data}
                    />
                  );
                } else if (item.type == 7) {
                  return (
                    <ToggleSwich
                      label={item.label}
                      storagePram={item.id}
                      key={index}
                      newAdStorageValue={newAdStorageValue}
                    />
                  );
                }
              })}

              {/* Ad Title*/}
              <TextComponent
                label={adTitlelabel}
                storagePram={'title'}
                textLength={'short'}
                subFiled={
                  newAdStorageValue?.category?.placeholders
                    ? newAdStorageValue?.category?.placeholders.title
                    : adTitleSubTitle
                }
                filedType={'text'}
                type={'newAd'}
                newAdStorageValue={newAdStorageValue}
                setValidation={setValidation}
                validation={validation}
              />

              {/* Ad Description*/}
              {
                <TextComponent
                  label={adDesclabel}
                  storagePram={'description'}
                  textLength={'long'}
                  subFiled={
                    newAdStorageValue?.category?.placeholders
                      ? newAdStorageValue?.category?.placeholders.description
                      : adDescSubTitle
                  }
                  filedType={'text'}
                  type={'newAd'}
                  newAdStorageValue={newAdStorageValue}
                  setValidation={setValidation}
                  validation={validation}
                />
              }
              {/* Location*/}
              <SingleSelectedSupport
                label={'مکان'}
                allList={adsLocationList}
                storagePram={'location'}
                data={data}
                filedType={'singleSelect'}
              />
              {/* Map*/}
              <Map
                width={'100%'}
                lat={lat}
                lon={lon}
                page={'newAd'}
                zoom={14}
              />

              {/* User Type*/}
              <UserType />
              <TextComponent
                label={'شماره تماس'}
                storagePram={'phone'}
                subFiled={
                  'درصورتی که تمایل دارید مشتری با شما در تماس باشد، لطفا شماره موبایل خود را وارد کنید'
                }
                filedType={'text'}
                type={'newAd'}
                newAdStorageValue={newAdStorageValue}
              />
              <ToggleSwich
                label='چت'
                desc='با فعال سازی این گزینه امکان چت با کاربر برای شما فراهم می شود'
                storagePram='chat'
                newAdStorageValue={newAdStorageValue}
              />
            </div>
          </form>
        </NewAdContext.Provider>
      </div>
    </>
  );
}
