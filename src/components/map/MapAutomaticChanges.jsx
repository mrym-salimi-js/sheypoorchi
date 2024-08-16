import { useEffect } from "react";
import { useMap } from "react-leaflet"

export function MapAutomaticChanges({ lat, lon, setNewAdStorageValue, newAdStorageValue, setMovedLat, setMovedLon, movedLat, movedLon, setMapMoved }) {

  const map = useMap()

  {/*Auto Find Loc On Map */ }
  useEffect(() => {

    lat && lon && map.setView([lat, lon])

  }, [lat, lon])


  {/* Find center Of Map */ }
  map.on('moveend', () => {

    setMovedLat(map.getCenter().lat)
    setMovedLon(map.getCenter().lng)

    movedLat && movedLon ? setMapMoved(true) : setMapMoved(false)

  })

  {/*Change Coordinate in Localstorage After Moving */ }

  useEffect(() => {

    newAdStorageValue &&

      setNewAdStorageValue({

        ...newAdStorageValue, location: {
          ...newAdStorageValue?.location, lat: movedLat, lon: movedLon
        }

      })
  }, [movedLat, movedLon])

  {/*Find Cordinate Of Location In List After Every Reload Page */ }

  useEffect(() => {


    const coordinate = JSON.parse(localStorage.getItem('coordinate'))
    const lat = coordinate && coordinate.lat
    const lon = coordinate && coordinate.lon

    setNewAdStorageValue(prev => ({
      ...prev, location: {
        ...prev.location, lat: lat, lon: lon
      }
    }))
  }, [])

}
