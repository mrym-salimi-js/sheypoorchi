import { useEffect } from "react"
import { useState } from "react"
import { PhotoComponent } from "./formComponents/PhotoComponent"
import TextComponent from "./formComponents/TextComponent"
import SingleSelected from "./formComponents/SingleSelected"
import UserType from "./formComponents/UserType"
import { ClearForm } from "./formComponents/ClearForm"
import ToggleSwich from "./formComponents/ToggleSwich"
import SeccessfulToast from "../globals/SuccessfulToast"
import { getCategoriyAttr } from "./formFunctions/getCategoryAttr"
import { formLocalErrorHandling, sendNewAd } from "./formFunctions/createNewAd"
import { Map } from '../map/Map'


export function NewAdForm() {

  {/*Form Local Storage Setting*/ }
  const [adsCategoriesList, setAdsCategoriesList] = useState()
  const [adsLocationList, setAdsLocationsList] = useState()
  const [validation, setValidation] = useState()
  const [newAdStorageValue, setNewAdStorageValue] = useState()
  const basicNewAdStorage = {
    "category": { "dependencies": [], "lable": '', "id": '' },
    "location": { "dependencies": [], "lable": '', "id": '' },
    "description": '',
    "title": '',
    "photo": '',
    "userType": 'فرد',
    "phone": false,
    "chat": false
  }

  useEffect(() => {
    const values = JSON.parse(localStorage.getItem('form-list-values'));
    values && setNewAdStorageValue(values)

    !values && localStorage.setItem('form-list-values', JSON.stringify(basicNewAdStorage))


    const cats = JSON.parse(localStorage.getItem('ads_categories_list'))
    cats && setAdsCategoriesList(cats)

    const locs = JSON.parse(localStorage.getItem('ads_locations_list'))
    locs && setAdsLocationsList(locs)

  }, [])


  useEffect(() => {

    newAdStorageValue !== undefined && localStorage.setItem('form-list-values', JSON.stringify(newAdStorageValue));

  }, [newAdStorageValue]);


  const adTitleLable = 'عنوان آگهی'
  const adDescLable = 'توضیحات'
  const adTitleSubTitle = 'عنوان مناسبی برای آگهی تان وارد کنید.'
  const adDescSubTitle = 'توضیحات مناسبی برای آگهی تان وارد کنید.'

  {/*Get Form category Attributes Items*/ }
  const getCatAttrs = newAdStorageValue && getCategoriyAttr(adsCategoriesList, newAdStorageValue)

  const catAttr = getCatAttrs?.attributes
  const placeHolder = getCatAttrs?.placeholder


  {/* Form Submit*/ }
  const [sendingForm, setSendingForm] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [attrs, setAttrs] = useState([])


  const handleFormSubmite = () => {


    {/*Get Storage Category Attributes */ }
    const attrRes = catAttr?.map(item => {

      return item.value.options ? { "id": item.id, "name": item.name, "lable": item.value.lable } : { "id": item.id, "name": item.name, "lable": item.value }
    })

    attrRes && setAttrs(attrRes)

    if (newAdStorageValue) {
      {/*Get Storage Parameters For Validation*/ }
      const formMainParams = [{ "name": "دسته بندی", "lable": newAdStorageValue.category.lable }, { "name": "عنوان آگهی", "lable": newAdStorageValue.title }, { "name": "توضیحات", "lable": newAdStorageValue.description }, { "name": "مکان", "lable": newAdStorageValue.location.lable }]

      {/*Form Final Error Handling */ }
      formLocalErrorHandling((setVal) => { setValidation(setVal) }, attrs, formMainParams, validation)

      setFormSubmitted(true)
    }

  }


  {/*Send Form */ }
  useEffect(() => {
    if (newAdStorageValue && formSubmitted && (validation && Object?.keys(validation)?.length == 0 || validation === undefined)) {

      sendNewAd((sendingFormStatus) => { setSendingForm(sendingFormStatus) }, newAdStorageValue, attrs)

    }
  }, [formSubmitted])


  {/*Show toast Msg After Submitting Form*/ }
  useEffect(() => {

    if (sendingForm) {
      setNewAdStorageValue(basicNewAdStorage)
      setValidation(undefined)

      setTimeout(() => {
        setSendingForm(false)
      }, 3000)
    }

  }, [sendingForm])


  return (
    <>
      <div className="w-[97%] lg:w-[90%] p-3 flex flex-col  gap-8 bg-white">
        {/* Title and Remove Form*/}
        <div className="w-full lg:p-4 flex justify-between items-center border-b pb-5">
          <p className="text-lg lg:text-xl">
            ثبت آگهی
          </p>
          <ClearForm setNewAdStorageValue={setNewAdStorageValue} basicNewAdStorage={basicNewAdStorage} setValidation={setValidation} />
        </div>
        <form className="flex flex-col gap-4 lg:flex-row-reverse justify-between mt-7" >

          <div className="w-full  lg:w-[50%]  flex flex-col gap-8">
            {/* Select Photo*/}
            <PhotoComponent setNewAdStorageValue={setNewAdStorageValue} newAdStorageValue={newAdStorageValue} />

            <span onClick={handleFormSubmite} className="w-full h-14 fixed right-0 bottom-0 z-[1000] lg:relative  flex justify-center items-center bg-[#84105C] text-white cursor-pointer rounded-lg hover:opacity-[0.7] " >ثبت آگهی</span>

          </div>

          <div className="lg:w-[47%] p-3 flex flex-col gap-12 ">

            {/* Categories*/}
            <SingleSelected lable={'دسته بندی'} allList={adsCategoriesList} setNewAdStorageValue={setNewAdStorageValue} newAdStorageValue={newAdStorageValue} storagePram={'category'} setValidation={setValidation} validation={validation} basicNewAdStorage={basicNewAdStorage} />

            {/*Categories Attributes*/}
            {
              catAttr?.map((item, index) => {

                if (item.type == 1 || item.type == 6 || item.type == 0) {
                  return <TextComponent key={index} adLable={item.name} setValidation={setValidation} validation={validation} setNewAdStorageValue={setNewAdStorageValue} newAdStorageValue={newAdStorageValue} storagePram={item.id} filedType={'text'} />

                }
                else if (item.type == 2) {
                  return <SingleSelected key={index} lable={item.name} allList={item.value.options} setNewAdStorageValue={setNewAdStorageValue} newAdStorageValue={newAdStorageValue} storagePram={item.id} setValidation={setValidation} validation={validation} />
                }
                else if (item.type == 7) {
                  return <ToggleSwich lable={item.name} storagePram={item.id} key={index} setNewAdStorageValue={setNewAdStorageValue} newAdStorageValue={newAdStorageValue} />
                }
              })
            }

            {/* Ad Title*/}
            < TextComponent adLable={adTitleLable} setValidation={setValidation} validation={validation} setNewAdStorageValue={setNewAdStorageValue} newAdStorageValue={newAdStorageValue} storagePram={'title'} textLength={'short'} subFiled={placeHolder ? placeHolder.title : adTitleSubTitle} filedType={'text'} />

            {/* Ad Description*/}
            {< TextComponent adLable={adDescLable} setValidation={setValidation} validation={validation} setNewAdStorageValue={setNewAdStorageValue} newAdStorageValue={newAdStorageValue} storagePram={'description'} textLength={'long'} subFiled={placeHolder ? placeHolder.description : adDescSubTitle} filedType={'text'} />}
            {/* Location*/}
            < SingleSelected lable={'مکان'} allList={adsLocationList} setNewAdStorageValue={setNewAdStorageValue} newAdStorageValue={newAdStorageValue} storagePram={'location'} setValidation={setValidation} validation={validation} basicNewAdStorage={basicNewAdStorage} />
            {/* Map*/}
            <Map width={'100%'} newAdStorageValue={newAdStorageValue} setNewAdStorageValue={setNewAdStorageValue} lat={newAdStorageValue?.location.lat !== undefined && newAdStorageValue?.location.lat
            } lon={newAdStorageValue?.location.lon !== undefined && newAdStorageValue?.location.lon
            } page={'newAd'} zoom={14} />
            {/* User Type*/}
            < UserType setNewAdStorageValue={setNewAdStorageValue} newAdStorageValue={newAdStorageValue} storagePram={'userType'} />

            <ToggleSwich lable="تماس تلفنی" desc="با فعال سازی این گزینه، شماره تماس شما در آگهی نمایش داده می شود" storagePram='phone' setNewAdStorageValue={setNewAdStorageValue} newAdStorageValue={newAdStorageValue} />

            <ToggleSwich lable='چت' desc='با فعال سازی این گزینه امکان چت با کاربر برای شما فراهم می شود' storagePram='chat' setNewAdStorageValue={setNewAdStorageValue} newAdStorageValue={newAdStorageValue} />

          </div>

        </form>

      </div >

      {sendingForm && <SeccessfulToast />}

    </>
  )
}
