import { useEffect, useState } from 'react'
// import { citiesList } from './citiesList'

export function FindCities(prvId) {
    const [citiesList, setCitiesList] = useState()

    useEffect(() => {

        const locs = JSON.parse(localStorage.getItem('ads_locations_list'))

        locs && locs.map(item => {
            if (item.id == prvId) {
                setCitiesList(item.children)
            }
        })
    }, [])

    return citiesList
}

export default function Cities({ prvId, prvName, setCheck, check, setFilterdCities, filterdCities, searchRes }) {

    const cities = FindCities(prvId)

    const data = searchRes[0] ? searchRes : cities

    const handleCheckedAll = () => {
        const allCheck = document.getElementById('all-check')

        setCheck([...check, prvId])

        cities?.forEach((city) => {
            if (city !== undefined) {
                setFilterdCities(prev => [...prev, { 'name': city.name, 'id': city.id, 'province_id': prvId }])

            }
        })

        if (!allCheck.checked) {

            const filterCities = filterdCities.filter(item => {
                return item.province_id != prvId
            })

            setFilterdCities(filterCities)

            const filterChecks = check.filter(item => {
                return item != prvId
            })

            setCheck(filterChecks)

        }


    }


    const handleAllCheck = (prvId) => {
        let checkAllStatus = false

        check?.map((item) => {

            if (item == prvId) {
                checkAllStatus = true
            }
        })

        return checkAllStatus
    }


    return (

        <div className="h-[65%] p-1 border-t-2 border-gray-100 mt-[20px] overflow-scroll ">
            <ul className="flex flex-col p-2">
                < li className="cursor-pointer flex justify-between items-center border-b-[1px] pb-2">
                    <p className="text-sm p-1 pr-2 border-r-4  border-pink-400" > همه شهر های {prvName}</p>
                    <div className="inline-flex items-center">
                        <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="check">
                            <input readOnly checked={handleAllCheck(prvId)} onClick={handleCheckedAll} type="checkbox"
                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-900 checked:bg-[#84105C] checked:before:bg-[#84105C] hover:before:opacity-10"
                                id="all-check" />
                            <span
                                className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                    stroke="currentColor" strokeWidth="1">
                                    <path fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    ></path>
                                </svg>
                            </span>
                        </label>

                    </div>
                </li >
                {
                    data?.map((city) => {
                        if (city !== undefined) {
                            return <CitiesItem name={city.name} id={city.id} key={city.id} filterdCities={filterdCities} setFilterdCities={setFilterdCities} prvId={prvId} check={check} setCheck={setCheck} />
                        }

                    })
                }

            </ul>
        </div>

    )
}

export function CitiesItem({ name, id, setFilterdCities, filterdCities, prvId, check, setCheck }) {

    const handleCheked = (name) => {
        let checkStatus = false
        filterdCities?.forEach((item) => {
            if (item.name === name) {
                checkStatus = true
            }
        })

        return checkStatus
    }
    const handleCheckBoxes = (checkBox, id, name) => {

        const filterChecks = check.filter(item => {
            return item != prvId
        })
        setCheck(filterChecks)


        setFilterdCities(prev => [...prev, { 'name': name, 'id': id, 'province_id': prvId }])


        if (!checkBox.checked) {

            const filter = filterdCities.filter(item => {
                return item.name !== checkBox.getAttribute('data-city-name')
            })
            setFilterdCities(filter)

        }
    }


    return (
        < li className="cursor-pointer flex justify-between items-center " >
            <p className="text-sm p-1 pr-2 border-r-2  border-pink-400" >{name}</p>
            <div className="inline-flex items-center">

                <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="check">
                    <input checked={handleCheked(name)} onChange={event => handleCheckBoxes(event.target, id, name)} data-city-name={name} data-city-id={id} type="checkbox"
                        className="checkBox before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-900 checked:bg-[#84105C] checked:before:bg-[#84105C] hover:before:opacity-10"
                        id="check" />
                    <span
                        className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                            stroke="currentColor" strokeWidth="1">
                            <path fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            ></path>
                        </svg>
                    </span>
                </label>

            </div>
        </li >
    )
}
