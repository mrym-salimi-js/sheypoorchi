import { mapMerker } from "../globals/Icons";

export function MapCenterMarker() {
    return (
        <img className="z-[10000] absolute top-0 right-0 left-0 bottom-0 m-auto drop-shadow-lg" src={mapMerker} ></img>
    )
}
