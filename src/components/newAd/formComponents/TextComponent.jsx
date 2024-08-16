import { useEffect, useRef, useState } from "react"
import { adFormValidation, adTextLengthValidation } from "../../validation/adFormValidation"
import { ChevronLeft } from "../../globals/Icons"


export default function TextComponent({ adLable, setNewAdStorageValue, newAdStorageValue, storagePram, textLength, subFiled, filedType, setOpenList, setValidation, validation, itemTitle }) {


    const inputRef = useRef()
    const [inputShow, setInputShow] = useState()

    const handleInputShow = (txt) => {

        filedType === 'text' ?
            (txt.children[0].children[1].focus(), setInputShow(adLable))
            :
            setOpenList(true)
    }

    const handleInputBlur = (inputTag) => {

        const inputVal = inputTag.value


        newAdStorageValue && !newAdStorageValue[storagePram] &&

            adFormValidation((stateVal) => { setValidation(stateVal) }, adLable, validation, newAdStorageValue[storagePram])




        textLength !== undefined &&

            adTextLengthValidation((stateVal) => { setValidation(stateVal) }, adLable, inputVal, validation, textLength)



        setInputShow('')
    }

    const handleStorage = (inputTag) => {

        const adVal = inputTag.value

        adFormValidation((stateVal) => { setValidation(stateVal) }, adLable, validation, adVal)

        setNewAdStorageValue({ ...newAdStorageValue, [`${storagePram}`]: adVal })
    }


    return (
        <div className="w-full flex flex-col gap-3 items-start  cursor-pointer">

            <div onClick={(event) => handleInputShow(event.currentTarget)} className={`w-full  border-b flex justify-between items-center relative ${(inputShow !== undefined && inputShow === adLable) && `border-[#e4aac5]`} ${validation && validation[`${adLable}`]?.error && `border-[#fc3b3b]`}`}   >


                <div className="w-full h-auto flex flex-col ">

                    <p className={`w-full text-md transition-all absolute bottom-3 ${(inputShow !== undefined && inputShow === adLable || itemTitle || (newAdStorageValue && (newAdStorageValue[storagePram]?.lable || (typeof (newAdStorageValue[storagePram]) !== 'object' && newAdStorageValue[storagePram])))) && `mb-8 text-sm`}  ${inputShow === adLable && ` text-[#e4aac5]`} `}>
                        {adLable}
                    </p>


                    <input ref={inputRef} name={storagePram} onChange={(event) => filedType === 'text' && handleStorage(event.currentTarget)} className={`w-full outline-none text-sm text-[#5e5e5e] h-12 ${filedType !== 'text' && `cursor-pointer`}`} onBlur={(event) => filedType === 'text' && handleInputBlur(event.currentTarget)}

                        value={newAdStorageValue ?

                            (typeof (newAdStorageValue[storagePram]) === 'object' ?
                                newAdStorageValue[storagePram]?.lable
                                : newAdStorageValue[storagePram]

                            )


                            : itemTitle} />

                </div>


                {
                    filedType !== 'text' &&
                    <ChevronLeft color={'#000000'} size={'size-4'} strokeWidth={2.4}/>
                }
            </div>


            {(() => {

                if (validation && validation[adLable]?.error) {
                    return <p className="text-[12px] text-[#fc3b3b] ">{validation[adLable]?.error}</p>

                } else {
                    return <p className="text-[12px] text-[#e4aac5] ">{subFiled}</p>
                }
            })()}

        </div>
    )
}
