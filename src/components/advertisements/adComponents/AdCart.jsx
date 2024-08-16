import { useEffect, useState } from "react"
import { getCost } from "../adFunctions/getCost"
import { getDifferDate } from "../adFunctions/getDifferDate"
import { AdCartPhoto } from "./AdCartPhoto"
import {AdCartText} from "./AdCartText"

export function AdCart({ adItem }) {

    const { attributes, created_at, id, location, photo, title } = adItem

    const [date, setDate] = useState(0)
    const [cost, setCost] = useState([])

    useEffect(() => {
        getCost(JSON.parse(attributes), (costVal) => { setCost(costVal) })
        getDifferDate(created_at, (dateVal) => { setDate(dateVal) })
    }, [])


    const adTitle = JSON.parse((title).trim().replace(/\s+/g, '-'))
    const href = `/${id}/${adTitle}`


    return (
        <li className="max-w-[280px] w-[280px] max-h-[420px] min-h-[350px] border border-gray-300 rounded-2xl p-8 ">
            <div className="flex flex-col gap-4 items-center justify-center relative bottom-16">

                <AdCartPhoto photo={photo} href={href} />

                <AdCartText title={title} cost={cost} date={date} location={location} href={href} />

            </div>
        </li >
    )
}