import { ChevronLeft, Warning } from "../../globals/Icons";


export function DealWarning() {
    return (
        <div className="w-full flex justify-between items-center p-5 border-b-[1px] cursor-pointer">
            <div className=" flex gap-5">
                <Warning color={`#6a6a6a`} />
                <p className="text-sm">زنگ خطر های قبل از معامله</p>

            </div>

            <ChevronLeft color={'#000000'} size={'size-5'} />
        </div>
    )
}
