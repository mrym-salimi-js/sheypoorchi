import { createContext, useEffect } from 'react';
import { useState } from 'react';
import { PhotoComponent } from './formComponents/PhotoComponent';
import TextComponent from '../formFileds/TextComponent';
import SingleSelected from '../formFileds/singleSelected/SingleSelected';
import UserType from './formComponents/UserType';
import ToggleSwich from '../formFileds/ToggleSwich';
import SeccessfulToast from '../globals/SuccessfulToast';
import { getCategoriyAttr } from './formFunctions/getCategoryAttr';
import { sendNewAd } from './formFunctions/createNewAd';
import { Map } from '../map/Map';
import { FormHeader } from './formComponents/FormHeader';
import { SubmiteFormBtn } from './formComponents/SubmiteFormBtn';

export const NewAdFormProvider = createContext();
export function NewAdForm() {
  //Form Local Storage Setting
  const [adsCategoriesList, setAdsCategoriesList] = useState();
  const [adsLocationList, setAdsLocationsList] = useState();
  const [validation, setValidation] = useState();
  const [newAdStorageValue, setNewAdStorageValue] = useState();
  const basicNewAdStorage = {
    category: { dependencies: [], lable: '', id: '' },
    location: { dependencies: [], lable: '', id: '' },
    description: '',
    title: '',
    photo: '',
    userType: 'فرد',
    phone: false,
    chat: false,
  };

  useEffect(() => {
    const values = JSON.parse(localStorage.getItem('form-list-values'));
    values && setNewAdStorageValue(values);

    !values &&
      localStorage.setItem(
        'form-list-values',
        JSON.stringify(basicNewAdStorage)
      );

    const cats = JSON.parse(localStorage.getItem('ads_categories_list'));
    cats && setAdsCategoriesList(cats);

    const locs = JSON.parse(localStorage.getItem('ads_locations_list'));
    locs && setAdsLocationsList(locs);
  }, []);

  useEffect(() => {
    newAdStorageValue !== undefined &&
      localStorage.setItem(
        'form-list-values',
        JSON.stringify(newAdStorageValue)
      );
  }, [newAdStorageValue]);

  const adTitleLable = 'عنوان آگهی';
  const adDescLable = 'توضیحات';
  const adTitleSubTitle = 'عنوان مناسبی برای آگهی تان وارد کنید.';
  const adDescSubTitle = 'توضیحات مناسبی برای آگهی تان وارد کنید.';

  //Get Form category Attributes Items
  const getCatAttrs =
    newAdStorageValue && getCategoriyAttr(adsCategoriesList, newAdStorageValue);

  const catAttr = getCatAttrs?.attributes;
  const placeHolder = getCatAttrs?.placeholder;

  //Form Submit
  const [sendingForm, setSendingForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [attrs, setAttrs] = useState([]);

  //Send Form
  useEffect(() => {
    if (
      newAdStorageValue &&
      formSubmitted &&
      ((validation && Object?.keys(validation)?.length == 0) ||
        validation === undefined)
    ) {
      sendNewAd(
        (sendingFormStatus) => {
          setSendingForm(sendingFormStatus);
        },
        newAdStorageValue,
        attrs
      );
    }
  }, [formSubmitted]);

  //Show toast Msg After Submitting Form
  useEffect(() => {
    if (sendingForm) {
      setNewAdStorageValue(basicNewAdStorage);
      setValidation(undefined);

      setTimeout(() => {
        setSendingForm(false);
      }, 3000);
    }
  }, [sendingForm]);

  return (
    <>
      <div className='w-[97%] lg:w-[90%] p-3 flex flex-col  gap-8 bg-white'>
        <NewAdFormProvider.Provider
          value={{
            setNewAdStorageValue,
            newAdStorageValue,
            basicNewAdStorage,
            setValidation,
            validation,
            catAttr,
            setAttrs,
            attrs,
            setFormSubmitted,
          }}
        >
          {/* Form Header*/}
          <FormHeader />
          <form className='flex flex-col gap-4 lg:flex-row-reverse justify-between mt-7'>
            <div className='w-full  lg:w-[50%]  flex flex-col gap-8'>
              {/* Select Photo*/}
              <PhotoComponent />
              {/* New Ad Btn */}
              <SubmiteFormBtn />
            </div>

            <div className='lg:w-[47%] p-3 flex flex-col gap-12 '>
              {/* Categories*/}
              <SingleSelected
                lable={'دسته بندی'}
                allList={adsCategoriesList}
                storagePram={'category'}
                type={'newAd'}
                setNewAdStorageValue={setNewAdStorageValue}
                newAdStorageValue={newAdStorageValue}
                basicNewAdStorage={basicNewAdStorage}
                setValidation={setValidation}
                validation={validation}
              />

              {/*Categories Attributes*/}
              {catAttr?.map((item, index) => {
                if (item.type == 1 || item.type == 6 || item.type == 0) {
                  return (
                    <TextComponent
                      key={index}
                      adLable={item.name}
                      storagePram={item.id}
                      filedType={'text'}
                      setNewAdStorageValue={setNewAdStorageValue}
                      newAdStorageValue={newAdStorageValue}
                      setValidation={setValidation}
                      validation={validation}
                    />
                  );
                } else if (item.type == 2) {
                  return (
                    <SingleSelected
                      key={index}
                      lable={item.name}
                      allList={item.value.options}
                      storagePram={item.id}
                      setNewAdStorageValue={setNewAdStorageValue}
                      newAdStorageValue={newAdStorageValue}
                      basicNewAdStorage={basicNewAdStorage}
                      setValidation={setValidation}
                      validation={validation}
                    />
                  );
                } else if (item.type == 7) {
                  return (
                    <ToggleSwich
                      lable={item.name}
                      storagePram={item.id}
                      key={index}
                      setNewAdStorageValue={setNewAdStorageValue}
                      newAdStorageValue={newAdStorageValue}
                    />
                  );
                }
              })}

              {/* Ad Title*/}
              <TextComponent
                adLable={adTitleLable}
                storagePram={'title'}
                textLength={'short'}
                subFiled={placeHolder ? placeHolder.title : adTitleSubTitle}
                filedType={'text'}
                type={'newAd'}
                setNewAdStorageValue={setNewAdStorageValue}
                newAdStorageValue={newAdStorageValue}
                setValidation={setValidation}
                validation={validation}
              />

              {/* Ad Description*/}
              {
                <TextComponent
                  adLable={adDescLable}
                  storagePram={'description'}
                  textLength={'long'}
                  subFiled={
                    placeHolder ? placeHolder.description : adDescSubTitle
                  }
                  filedType={'text'}
                  type={'newAd'}
                  setNewAdStorageValue={setNewAdStorageValue}
                  newAdStorageValue={newAdStorageValue}
                  setValidation={setValidation}
                  validation={validation}
                />
              }
              {/* Location*/}
              <SingleSelected
                lable={'مکان'}
                allList={adsLocationList}
                storagePram={'location'}
                type={'newAd'}
                setNewAdStorageValue={setNewAdStorageValue}
                newAdStorageValue={newAdStorageValue}
                basicNewAdStorage={basicNewAdStorage}
                setValidation={setValidation}
                validation={validation}
              />
              {/* Map*/}
              <Map
                width={'100%'}
                lat={
                  newAdStorageValue?.location.lat !== undefined &&
                  newAdStorageValue?.location.lat
                }
                lon={
                  newAdStorageValue?.location.lon !== undefined &&
                  newAdStorageValue?.location.lon
                }
                page={'newAd'}
                zoom={14}
              />
              {/* User Type*/}
              <UserType storagePram={'userType'} />

              <ToggleSwich
                lable='تماس تلفنی'
                desc='با فعال سازی این گزینه، شماره تماس شما در آگهی نمایش داده می شود'
                storagePram='phone'
                setNewAdStorageValue={setNewAdStorageValue}
                newAdStorageValue={newAdStorageValue}
              />

              <ToggleSwich
                lable='چت'
                desc='با فعال سازی این گزینه امکان چت با کاربر برای شما فراهم می شود'
                storagePram='chat'
                setNewAdStorageValue={setNewAdStorageValue}
                newAdStorageValue={newAdStorageValue}
              />
            </div>
          </form>
        </NewAdFormProvider.Provider>
      </div>

      {sendingForm && <SeccessfulToast />}
    </>
  );
}
