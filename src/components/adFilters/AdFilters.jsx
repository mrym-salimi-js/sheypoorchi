import { useEffect, useState } from "react"
import { BorderRoundedBtn } from "../globals/BorderRoundedBtn"
import SingleSelected from "../newAd/formComponents/SingleSelected"
import ToggleSwich from "../newAd/formComponents/ToggleSwich"
import TextComponent from "../newAd/formComponents/TextComponent"
import LocationBox from "../locations/LocationBox"
import { useCookies } from "react-cookie"
import { selectedLocations } from "../locations/selectedLocations"
import { useNavigate } from "react-router-dom"

export default function AdFilters() {


    const [cookie, setCookie] = useCookies()
    const navigateTo = useNavigate()

    const locs = JSON.parse(localStorage.getItem('ads_locations_list'))
    const [selectedLoc, setSelectedLoc] = useState('')
    const [selectedCat, setSelectedCat] = useState()
    const [adsCategoriesList, setAdsCategoriesList] = useState()
    const [catAttr, setCatAttr] = useState()
    let sortOptionsVar

    useEffect(() => {
        selectedLocations(cookie, (locVal) => { setSelectedLoc(locVal) }, locs)
    }, [cookie['cities']])


    useEffect(() => {

        const cats = JSON.parse(localStorage.getItem('ads_categories_list'))
        cats && setAdsCategoriesList(cats)

    }, [])


    const selectedCatCookie = cookie['selectedCat']
    useEffect(() => {
        adsCategoriesList !== undefined && adsCategoriesList?.find(item => {

            if (item.slug === selectedCatCookie) {
                setCatAttr(item.attributes)
                setSelectedCat(item)
                // console.log(item)
            }
            item.children.find(itemCh => {

                itemCh.slug === selectedCatCookie && (setSelectedCat(itemCh), console.log(itemCh))


            })
        })
    })

    if (catAttr !== undefined) {
        const sepratedByIndex = catAttr.reduce((attrs, single) => {
            
            !attrs[single.index] && (attrs[single.index] = [])

            attrs[single.index].push(single)

            return attrs
        }, {})
        console.log(sepratedByIndex)
    }

    // console.log(catAttr)

    adsCategoriesList?.find(item => {
        item?.id === '43603' && (sortOptionsVar = item.sortOptions)
    })



    const [openLocation, setOpenLocation] = useState(false)


    const handleClearingFilter = () => {

    }
    return (
        <div className='w-full h-full flex items-center justify-center absolute top-0 right-0 z-[10000] bg-[#2222228a] '>

            <div className="w-full md:w-[50%] lg:w-[40%] xl:w-[30%] h-full bg-white fixed right-0 flex flex-col gap-5">

                <div className="w-full h-30 p-8 flex items-center justify-between border-b ">
                    <p className="text-lg lg:text-xl">
                        فیلتر
                    </p>
                    <BorderRoundedBtn lable={'حذف فیلتر'} handleAction={handleClearingFilter} />
                </div>


                <div className="w-full h-auto p-6 flex flex-col gap-8" >

                    {sortOptionsVar !== undefined &&
                        <SingleSelected lable={'مرتب سازی'} allList={sortOptionsVar} defaultItem={sortOptionsVar[0].title} type={'filter'} />

                    }

                    <ToggleSwich lable='فقط آگهی های عکس دار' />


                    {
                        (selectedCat) &&
                        <SingleSelected lable={'دسته بندی'} allList={adsCategoriesList} type={'filter'} defaultItem={selectedCat.name} setCookie={setCookie} cookie={cookie} navigateTo={navigateTo} />
                    }


                    <TextComponent setOpenList={setOpenLocation} adLable={'استان و شهر'} itemTitle={selectedLoc} />
                    {
                        openLocation && <LocationBox setOpenLocation={setOpenLocation} />
                    }
                </div>

            </div>

        </div>
    )
}
