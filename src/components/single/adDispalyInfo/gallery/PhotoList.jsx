export function PhotoList({ photoParantRef, adPhoto, phothoWidth, counter, setCounter, photoFullScreen, setPhotoFullScreen }) {

    const handlePhotoFullScreen = (index) => {
        setCounter(index)
        setPhotoFullScreen(true)
    }
    return (


        <ul ref={photoParantRef} className={`${photoFullScreen ? `h-[480px]` : `h-[350px]`} flex  transition-all`} >

            {
                adPhoto !== undefined && adPhoto.map((item, index) => {
                    return <li id="1" key={item.id} style={{ width: `${phothoWidth}px`, transform: `translate3d(${phothoWidth * counter}px,0px,0px)`, transition: 'all 0.3s ease-in-out' }} className={` h-full cursor-auto ${!photoFullScreen && `rounded-xl`} overflow-hidden flex items-center justify-center`}>

                        <img onClick={() => { handlePhotoFullScreen(index) }} className={`${photoFullScreen ? `sm:w-auto w-full` : `w-full`} h-full object-cover`} src={item.src} alt="" />
                    </li>
                })
            }


        </ul>


    )
}
