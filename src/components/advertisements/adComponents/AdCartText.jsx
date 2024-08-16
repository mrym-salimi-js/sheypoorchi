import {  Speaker } from "../../globals/Icons"
export function AdCartText({ title, cost, date,location, href }) {
    return (
        <ul className="w-full p-4 flex flex-col gap-5 justify-between items-start">
            <li className="flex justify-start items-center gap-3">
                <Speaker color={'#cccccc'} size={'size-6'} />
                <a href={href} className="cursor-pointer">
                    <p className="text-sm text-black">{JSON.parse(title)}</p>
                </a>
            </li>
            <li className="w-full flex flex-col gap-2 ">

                {
                    cost.length > 0 && cost.map((costItem, index) => {
                        return <span key={index} className="w-full h-auto flex gap-3 rounded-md border-r-4 border-pink-400 p-3 bg-gray-100  text-gray-400 text-[12px] text-nowrap overflow-hidden">
                            <p>{costItem.name}: {(costItem.lable).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} تومان</p>
                        </span>
                    })
                }
                <p className="w-full h-auto rounded-md border-r-4 border-pink-400 p-3 bg-gray-100  text-gray-400 text-[12px]">{date + ' در ' + JSON.parse(location)[1].name}</p>
            </li>
        </ul>
    )
}