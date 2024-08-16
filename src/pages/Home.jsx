import SearchBar from '../components/SearchBar'
import NavBar from '../components/NavBar'
import Category from '../components/Category'
import { AdsList } from '../components/advertisements/adComponents/AdsList'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import AdFilters from '../components/adFilters/AdFilters'
import SelectedLoc from '../components/breadCrumbs/SelectedLocs'

export default function Home() {
    const navigateTo = useNavigate()
    const [cookie, setCookie] = useCookies()

    const cookieCitiesInUrl = encodeURIComponent(JSON.stringify(cookie['cities']))
    const catItemInUrl = cookie['selectedCat']
    const pathName = window.location.pathname

    useEffect(() => {
        setCookie('selectedCat', catItemInUrl ? catItemInUrl : '')

    }, [])

    useEffect(() => {

        ((cookie['cities'] !== undefined && cookie['cities'].length > 0) || catItemInUrl) ?
            navigateTo(`/s/iran${catItemInUrl && '/' + catItemInUrl}${cookie['cities']?.length > 0 && '?cities' + cookieCitiesInUrl}`)
            :
            navigateTo('/s/iran')

    }, [cookieCitiesInUrl, catItemInUrl, pathName])





    return (
        <>

            <SearchBar />
            <AdFilters />
            <div className='w-[80%] h-full relative flex flex-col gap-6 items-center mb-14  p-2'>

                <Category />
                <SelectedLoc />
                <AdsList />
            </div>
            <NavBar />
        </>
    )
}
