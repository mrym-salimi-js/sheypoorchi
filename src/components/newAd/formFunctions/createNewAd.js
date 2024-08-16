import { insertNewAd } from "../../../services/insertNewAd"
import { adFormValidation } from "../../validation/adFormValidation"

export function formLocalErrorHandling(setValidationCallback, attrs, formMainParams, validation) {

    attrs?.forEach(item => {

        adFormValidation((stateVal) => { setValidationCallback(stateVal) }, item.name, validation, item.lable)

    })

    formMainParams?.map(item => {

        !item.lable && adFormValidation((stateVal) => { setValidationCallback(stateVal) }, item.name, validation, item.lable)

    })

}

export async function sendNewAd(setSendingFormCallback, newAdStorageValue, attrs) {

    const photo = newAdStorageValue.photo && newAdStorageValue.photo
    const category = newAdStorageValue.category?.dependencies?.length > 0 && JSON.stringify(newAdStorageValue.category.dependencies)
    const attributes = attrs.length > 0 && JSON.stringify(attrs)
    const adTitle = newAdStorageValue.title && JSON.stringify(newAdStorageValue.title)
    const adDesc = newAdStorageValue.description && JSON.stringify(newAdStorageValue.description)
    const location = newAdStorageValue.location?.dependencies?.length > 0 && JSON.stringify(newAdStorageValue.location.dependencies)
    const coordinate = (newAdStorageValue.location?.lat && newAdStorageValue.location?.lon) && JSON.stringify({ "lat": newAdStorageValue.location.lat, "lon": newAdStorageValue.location.lon })
    const userType = JSON.stringify(newAdStorageValue.userType)
    const phone = newAdStorageValue.phone
    const chat = newAdStorageValue.chat


    await (insertNewAd(photo, category, attributes, adTitle, adDesc, location, coordinate, userType, phone, chat)).then((res) => {
        res && setSendingFormCallback(true)
    })
}