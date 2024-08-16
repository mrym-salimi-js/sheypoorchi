import { useEffect, useState } from "react";
import { getCost } from "../../advertisements/adFunctions/getCost"
import { getDifferDate } from "../../advertisements/adFunctions/getDifferDate"
import Banner from "./Banner";
import { DealWarning } from "./DealWarning";
import { Connections } from "./Connections";
import Attributes from "./Attributes";
import { Descriptions } from "./Descriptions";


export default function AdInfo({ attributes, created_at, description, location, title }) {
    const [date, setDate] = useState(0)
    const [cost, setCost] = useState([])

    useEffect(() => {
        getCost(attributes, (costVal) => { setCost(costVal) })
        getDifferDate(created_at, (dateVal) => { setDate(dateVal) })
    }, [])

    return (
        <div className="w-full lg:w-[55%] h-auto flex flex-col">

            <Banner cost={cost} title={title} location={location} date={date} />
            <DealWarning />
            <Connections />

            <Attributes attributes={attributes} />

            <Descriptions description={description} />
        </div>
    )
}
