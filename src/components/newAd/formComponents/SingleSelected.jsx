import { BackBtn } from "../../globals/BackBtn"
import TextComponent from "./TextComponent"
import { setParamsAfterDependencies } from "../formFunctions/setParamsAfterDependencies"
import { singleSelectedErrorHandling } from "../formFunctions/singleSelectedErrorHandling"
import { setSingleSelectedStorage } from "../formFunctions/setSingleSelectedStorage"
import { setSingleSelectedAttrsStorage } from "../formFunctions/setSingleSelectedAttrsStorage"
import { useEffect, useState } from "react"
import { ChevronLeft, CloseMark } from "../../globals/Icons"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { filterSingleSelectedSettings } from "../../adFilters/filterSingleSelectedSettings"



export default function SingleSelected({ lable, allList, setNewAdStorageValue, newAdStorageValue, storagePram, setValidation, validation, basicNewAdStorage, defaultItem, type, setCookie, cookie, navigateTo }) {

    const [openList, setOpenList] = useState()
    const [listItems, setListItems] = useState()
    const [itemTitle, setItemTitle] = useState(defaultItem)
    const [filterListTitle, setFilterListTitle] = useState({ "name": 'همه گروه ها',"slug":'' })

    useEffect(() => {

        setFilterListTitle({ "name": 'همه گروه ها',"slug":'' })

        allList && setListItems(allList)

    }, [openList])

    setParamsAfterDependencies((storageVal) => { setNewAdStorageValue(storageVal) }, openList, newAdStorageValue, storagePram)


    singleSelectedErrorHandling((stateVal) => { setValidation(stateVal) }, openList, newAdStorageValue, storagePram, lable, validation)


    return (
        <>
            <TextComponent adLable={lable} setValidation={setValidation} validation={validation} setNewAdStorageValue={setNewAdStorageValue} newAdStorageValue={newAdStorageValue} storagePram={storagePram} filedType={'singleSelected'} setOpenList={setOpenList} openList={openList} itemTitle={itemTitle} />

            {openList && <List allList={listItems} setListItems={setListItems} lable={lable} setOpenList={setOpenList} setNewAdStorageValue={setNewAdStorageValue} newAdStorageValue={newAdStorageValue} storagePram={storagePram} basicNewAdStorage={basicNewAdStorage} setItemTitle={setItemTitle} type={type} setFilterListTitle={setFilterListTitle} filterListTitle={filterListTitle} setCookie={setCookie} cookie={cookie} navigateTo={navigateTo} />}
        </>
    )
}


export function List({ lable, allList, setListItems, setOpenList, setNewAdStorageValue, newAdStorageValue, storagePram, basicNewAdStorage, setItemTitle, type, setFilterListTitle, filterListTitle, setCookie, navigateTo, cookie }) {

    const [listType, setListType] = useState('main')
    const [listId, setListId] = useState()

    const handleClosing = () => {
        setOpenList(false)
    }

    let newList;
    if (type === 'filter') {
        newList = [filterListTitle, ...allList]
    }



    return (
        <div className="w-full h-full flex flex-col items-center justify-end lg:justify-center fixed top-0 right-0 bg-[#7e7e7ed1] z-[100000]">

            <div className="w-full md:w-[75%] lg:w-[40%] h-auto max-h-[80%] bg-white rounded-2xl relative  z-[100000] border border-gray-50  overflow-hidden top-2 bottom-0  p-6 ">

                <div className="flex justify-between items-center pb-5 ">
                    <div className="flex items-center gap-3 border-r-4 border-pink-400 pr-2">
                        {listType === 'sub' && <BackBtn setTitle={setListType} title={'main'} />}
                        <p className="text-lg ">
                            {lable}

                        </p>
                    </div>

                    <CloseMark handleClosing={handleClosing} color={'#000000'} size={'size-6'} />

                </div>

                <div className="h-[87%] p-1 mt-[20px] overflow-scroll ">
                    <ul className="flex flex-col gap-2 p-1 ">

                        <ListItems list={newList ? newList : allList} setListItems={setListItems} setListId={setListId} setListType={setListType} listType={'main'} setNewAdStorageValue={setNewAdStorageValue} newAdStorageValue={newAdStorageValue} storagePram={storagePram} setOpenList={setOpenList} basicNewAdStorage={basicNewAdStorage} setItemTitle={setItemTitle} type={type} setFilterListTitle={setFilterListTitle} setCookie={setCookie} cookie={cookie} navigateTo={navigateTo} />

                    </ul>
                </div>

            </div>
        </div>
    )
}

export function ListItems({ list, setListItems, setListId, setListType, setNewAdStorageValue, newAdStorageValue, storagePram, setOpenList, basicNewAdStorage, setItemTitle, type, setFilterListTitle, setCookie, cookie, navigateTo }) {



    const handleItems = (item) => {

        if (type === 'filter') {


            {/*باید به فایل دیگه ای انتقال داده بشه */ }
            item.children ?
                item.children?.length == 0 && setCookie('selectedCat', item.slug)
                :
                (item.name !== 'همه گروه ها' ?
                    setCookie('selectedCat', item.slug)
                    :
                    setCookie('selectedCat', '')
                )

            setItemTitle(item.title ? item.title : item.name)
            setFilterListTitle({ "name": item.title ? item.title : item.name, "slug": item.slug })


            const cookieCitiesInUrl = encodeURIComponent(JSON.stringify(cookie['cities']))
            item.name === 'همه گروه ها' && navigateTo('/s/iran?cities=' + cookieCitiesInUrl)


            // filterSingleSelectedSettings(item,(title)=>{setItemTitle(title)},(listTitle)=>{setFilterListTitle(listTitle)},(cookieVal)=>{setCookie(cookieVal)},(navVal)=>{navigateTo(navVal)},cookie)
        }


        item.children?.length > 0 && setListItems(item.children)
        item.districts?.length > 0 && setListItems(item.districts)
        item.brands?.length > 0 && type !== 'filter' && setListItems(item.brands)

        {/*Delete Excludedattributes Of Category */ }
        if (newAdStorageValue) {
            for (let key in newAdStorageValue) {

                item.excludedAttributes?.length > 0 &&

                    item.excludedAttributes.map(ex => {
                        key == ex.attributeID && delete newAdStorageValue[key]
                    })

            }
        }

        if (storagePram) {
            {/*Single Slection Storage Setting*/ }

            setSingleSelectedStorage((stateVal) => { setNewAdStorageValue(stateVal) }, newAdStorageValue, item, storagePram, basicNewAdStorage, setListId, setListType, setOpenList)


            {/*Category Attributes Storage Setting*/ }

            setSingleSelectedAttrsStorage((stateVal) => { setNewAdStorageValue(stateVal) }, item, storagePram, setOpenList)

        }

        if ((item.children?.length == 0 && item.brands?.length == 0) || (item.children === undefined && (item.districts === undefined || item.districts?.length == 0)) || (type === 'filter' && item.brands?.length > 0)) {
            setOpenList(false)
        }
    }



    return (

        list?.map((item, index) => {
            return (
                <li onClick={() => handleItems(item)} className="cursor-pointer border-t pb-4 pt-4 flex justify-between items-center " key={index}>

                    <p className={`text-sm  ${(type === 'filter' && index == 0) ? `text-black` : `text-gray-500`}`}>{item.name ? item.name : item.title}</p>

                    {(() => {
                        if (item.children?.length > 0 || item.districts?.length > 0 || (item.brands?.length > 0 && type !== 'filter')) {
                            return <ChevronLeft color={'#000000'} size={'size-4'} strokeWidth={2.4} />
                        }
                    })()}

                </li >
            )
        })

    )

}

