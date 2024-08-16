import { useEffect, useRef } from "react"
import { ThumbnailList } from "./ThumbnailList"

export function GalleryThumbnail({ photoParantRef, adPhoto, photoFullScreen, setPhotoFullScreen, counter, setCounter,visibleThumbnailNumber }) {
    const thumbnailParentRef = useRef()
    
  
    useEffect(() => {
  
      if (thumbnailParentRef.current) {
  
        const thumbChildren = thumbnailParentRef.current.children
  
  
        for (let i = 0; i < thumbChildren.length; i++) {
  
          i == counter ?
            (
              thumbChildren[i].children[0].style.filter = 'brightness(1)'
            )
            :
            (
              thumbChildren[i].children[0].style.filter = 'brightness(0.5)'
            )
        }
      }
  
    }, [counter])
    return (
      <ThumbnailList thumbnailParentRef={thumbnailParentRef} photoFullScreen={photoFullScreen} adPhoto={adPhoto} photoParantRef={photoParantRef} setCounter={setCounter} setPhotoFullScreen={setPhotoFullScreen} visibleThumbnailNumber={visibleThumbnailNumber}/>
    )
  }