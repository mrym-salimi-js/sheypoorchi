
export default function NextBtn({handleNextMovment}) {
    return (
        <div onClick={handleNextMovment} name-btn="next" className="btn-parent w-8 h-8 flex items-center justify-center rounded-full bg-[#454545a5] absolute left-2 top-1/2 cursor-pointer hover:opacity-[0.7] z-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" className="size-5 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
        </div>
    )
}
