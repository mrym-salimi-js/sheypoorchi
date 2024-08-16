

export default function Banner({title,date,location,cost}) {
    return (
        <div className="w-full flex flex-col gap-6 items-center p-5  border-b-[1px]">
            <div className="w-full flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>

            </div>
            <div className="w-full flex flex-row-reverse justify-between items-center">
                <p className="text-sm text-gray-500">{date + ' در ' + location[1].name}</p>

                {
                    cost.length > 0 && cost.map((costItem, index) => {
                        return <p className="text-md" key={index}>{costItem.name}: {(costItem.lable).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} تومان</p>

                    })
                }
            </div>
        </div>
    )
}
