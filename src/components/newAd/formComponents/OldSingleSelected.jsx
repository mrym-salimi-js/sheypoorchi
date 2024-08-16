import { BackBtn } from "../../globals/BackBtn"
import TextComponent from "./TextComponent"
import { setParamsAfterDependencies } from "../formFunctions/setParamsAfterDependencies"
import { singleSelectedErrorHandling } from "../formFunctions/singleSelectedErrorHandling"
import { setSingleSelectedStorage } from "../formFunctions/setSingleSelectedStorage"
import { setSingleSelectedAttrsStorage } from "../formFunctions/setSingleSelectedAttrsStorage"
import { useState } from "react"



export default function SingleSelected({ lable, allList, setNewAdStorageValue, newAdStorageValue, storagePram, setValidation, validation, basicNewAdStorage }) {

    const [openList, setOpenList] = useState()



    setParamsAfterDependencies((storageVal) => { setNewAdStorageValue(storageVal) }, openList, newAdStorageValue, storagePram)


    singleSelectedErrorHandling((stateVal) => { setValidation(stateVal) }, openList, newAdStorageValue, storagePram, lable, validation)


    return (
        <>
            <TextComponent adLable={lable} setValidation={setValidation} validation={validation} setNewAdStorageValue={setNewAdStorageValue} newAdStorageValue={newAdStorageValue} storagePram={storagePram} filedType={'singleSelected'} setOpenList={setOpenList} openList={openList} />

            {openList && <List allList={allList} lable={lable} setOpenList={setOpenList} setNewAdStorageValue={setNewAdStorageValue} newAdStorageValue={newAdStorageValue} storagePram={storagePram} basicNewAdStorage={basicNewAdStorage} />}
        </>
    )
}


export function List({ lable, allList, setOpenList, setNewAdStorageValue, newAdStorageValue, storagePram, basicNewAdStorage }) {

    const [listType, setListType] = useState('main')
    const [listId, setListId] = useState()

    const handleClosingList = () => {
        setOpenList(false)
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
                    <svg onClick={handleClosingList} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>

                <div className="h-[87%] p-1 mt-[20px] overflow-scroll ">
                    <ul className="flex flex-col gap-2 p-1 ">
                        {
                            listType === 'main' ?
                                < MainList allList={allList} setListId={setListId} setListType={setListType} setNewAdStorageValue={setNewAdStorageValue} newAdStorageValue={newAdStorageValue} storagePram={storagePram} setOpenList={setOpenList} basicNewAdStorage={basicNewAdStorage} />
                                :
                                < SubList allList={allList} listId={listId} setListType={setListType} setNewAdStorageValue={setNewAdStorageValue} newAdStorageValue={newAdStorageValue} storagePram={storagePram} setOpenList={setOpenList} basicNewAdStorage={basicNewAdStorage} />
                        }
                    </ul>
                </div>

            </div>
        </div>
    )
}

export function MainList({ allList, setListId, setListType, setNewAdStorageValue, newAdStorageValue, storagePram, setOpenList, basicNewAdStorage }) {

    return <ListItems list={allList} setListId={setListId} setListType={setListType} listType={'main'} setNewAdStorageValue={setNewAdStorageValue} newAdStorageValue={newAdStorageValue} storagePram={storagePram} setOpenList={setOpenList} basicNewAdStorage={basicNewAdStorage} />
}


export function SubList({ allList, listId, setListType, setNewAdStorageValue, newAdStorageValue, storagePram, setOpenList, basicNewAdStorage }) {

    const subList = allList.filter(item => {
        if (item.id == listId) {
            return item
        }
    })

    const list = subList[0]?.children ? subList[0]?.children : subList[0]?.districts
    
    return <ListItems list={list} setListType={setListType} listType={'sub'} setNewAdStorageValue={setNewAdStorageValue} newAdStorageValue={newAdStorageValue} storagePram={storagePram} setOpenList={setOpenList} basicNewAdStorage={basicNewAdStorage} />

}



export function ListItems({ list, setListId, setListType, setNewAdStorageValue, newAdStorageValue, storagePram, setOpenList, basicNewAdStorage }) {

    

    const handleItems = (item) => {


        {/*Delete Excludedattributes Of Category */ }
        if (newAdStorageValue) {
            for (let key in newAdStorageValue) {

                item.excludedAttributes?.length > 0 &&

                    item.excludedAttributes.map(ex => {
                        key == ex.attributeID && delete newAdStorageValue[key]
                    })

            }
        }


        {/*Single Slection Storage Setting*/ }

        setSingleSelectedStorage((stateVal) => { setNewAdStorageValue(stateVal) }, newAdStorageValue, item, storagePram, basicNewAdStorage, setListId, setListType, setOpenList)


        {/*Category Attributes Storage Setting*/ }

        setSingleSelectedAttrsStorage((stateVal) => { setNewAdStorageValue(stateVal) }, item, storagePram, setOpenList)


    }



    return (

        list.map(item => {
            return (
                <li onClick={() => handleItems(item)} className="cursor-pointer border-t pb-4 pt-4 flex justify-between items-center " key={item.id}>

                    <p className="text-sm">{item.name}</p>
                    {
                        item.children?.length > 0 && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-5" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    }

                </li >
            )
        })

    )

}

