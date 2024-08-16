import { Camera } from "../../globals/Icons"
export function AdCartPhoto({ photo, href }) {
    return (
        <>

            {photo ?

                < a href={href} className="w-full h-[200px] relative rounded-3xl overflow-hidden cursor-pointer">

                    <img className="w-full h-full object-cover" src={JSON.parse(photo)[0].src} alt="" />
                </a>

                :
                < a href={href} className="w-full h-[200px] relative rounded-3xl overflow-hidden cursor-pointer bg-gray-100 flex items-center justify-center">

                    <Camera color={'#cccccc'} />
                    <span className="w-14 h-[2px] bg-[#cccccc] rotate-45 absolute"></span>
                </a>


            }
        </>
    )
}