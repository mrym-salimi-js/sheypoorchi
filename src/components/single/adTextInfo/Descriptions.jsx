
export function Descriptions({description}) {
    return (
        <div className="w-full flex flex-col gap-5 border-b-[1px] p-4">
            <p className="text-sm text-gray-500">توضیحات آگهی</p>
            <p className="text-sm">{description}</p>
        </div>
    )
}
