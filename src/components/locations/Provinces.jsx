// import { provincesList } from './provincesList'
import { useEffect } from "react"
import { useState } from "react"
import { ChevronLeft } from "../globals/Icons"

export function FindProvinces() {
    const [provincesList, setProvincesList] = useState()

    useEffect(() => {
        const provinces = JSON.parse(localStorage.getItem('ads_locations_list'))
        provinces && setProvincesList(provinces)

    }, [])
    return provincesList
}
export default function Provinces({ setLocSituation, setPrvId, setPrvName, setSearchRes }) {

    const provinces = FindProvinces()
    return (

        <div className="h-[59%] p-1 border-t-2 border-gray-100 mt-[20px] overflow-scroll ">
            <ul className="flex flex-col gap-2 p-2">
                {provinces?.map((prv) => {
                    return <ProvimcesItem prvName={prv.name} prvId={prv.id} setLocSituation={setLocSituation} setPrvId={setPrvId} setPrvName={setPrvName} key={prv.id} setSearchRes={setSearchRes} />
                })}
            </ul>
        </div>

    )
}

export function ProvimcesItem({ prvName, prvId, setLocSituation, setPrvId, setPrvName, setSearchRes }) {

    const preparToGetCities = () => {

        setSearchRes([])
        setLocSituation('شهر')
        setPrvId(prvId)
        setPrvName(prvName)
    }

    return (
        <>

            <li onClick={preparToGetCities} className="p-2 border-r-2 cursor-pointer border-pink-400 flex justify-between items-center " key={prvId}   >

                <p className="text-sm">{prvName}</p>
                <ChevronLeft color={'#000000'} size={'size-5'}/>

            </li >

        </>
    )
}
