import { useState } from "react"
import LocationBox from "../components/locations/LocationBox"
import { useCookies } from "react-cookie"
import { citiesList } from "./localStorage/locations"
import { mapMerker } from "./globals/Icons"

export default function SearchBar() {

  const [openLocation, setOpenLocation] = useState(false)
  const [cookie] = useCookies()

 const cities=citiesList()

  return (
    <div className="w-full h-16 shadow-md flex justify-center items-center sticky top-0 z-[10000] bg-slate-50">

      <div className="w-[95%] h-[70%] border border-gray-200 z-20 rounded-xl flex gap-2 justify-between">
        <input className="outline-none w-[70%] lg:w-[93%] md:w-[85%]  h-full p-2 bg-transparent text-gray-400 placeholder-gray-300 text-[0.8rem] z-30 text-right "
          placeholder="جستجو در همه آگهی ها">
        </input>
        <div className=" py-2 px-5 flex flex-row-reverse gap-3 items-end justify-around border-r-[1px]">
          <img className="w-[28px]" src={mapMerker}></img>

          {cookie['cities']?.length > 0 ?
            
            cities?.map((city) => {
              if (city.id == cookie['cities'][0]) {
                const citiesLength = cookie['cities'].length
                return (
                  <p onClick={() => setOpenLocation(!openLocation)} className="text-[12px] text-gray-400 cursor-pointer  text-nowrap" key={city.id}>
                    {citiesLength ? `${citiesLength} شهر` : city.name}
                  </p>
                )
              }
            })

            :

            <p onClick={() => setOpenLocation(!openLocation)} className="text-[12px] text-gray-400 cursor-pointer text-nowrap">همه ایران</p>
          }

        </div>
      </div>
      {openLocation && <LocationBox setOpenLocation={setOpenLocation} />}

    </div>


  )
}

