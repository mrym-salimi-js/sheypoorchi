import { useRef } from "react"
import { GalleryThumbnail } from "./GalleryThumbnail"
import { GalleryPhotos } from "./GalleryPhotos"

export function Gallery({ adPhoto, photoFullScreen, setPhotoFullScreen, counter, setCounter, photoParantRef, visibleThumbnailNumber }) {
  const photoGrandParentRef = useRef()


  return (
    <div className={`w-full  flex lg:items-start items-center`}>

      <div ref={photoGrandParentRef} className={`w-full lg:w-[87%] `}>

        <div className={`flex flex-col  gap-3 overflow-hidden `}>

          <GalleryPhotos photoParantRef={photoParantRef} counter={counter} setCounter={setCounter} adPhoto={adPhoto} setPhotoFullScreen={setPhotoFullScreen} photoFullScreen={photoFullScreen} photoGrandParentRef={photoGrandParentRef} />


          <GalleryThumbnail photoParantRef={photoParantRef} counter={counter} setCounter={setCounter} adPhoto={adPhoto} setPhotoFullScreen={setPhotoFullScreen} photoFullScreen={photoFullScreen} visibleThumbnailNumber={visibleThumbnailNumber} />


        </div>


      </div>

    </div >

  )
}




