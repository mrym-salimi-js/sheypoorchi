export function selectedLocations(cookie, setSelectedLocCallBack, locs) {
    cookie['cities'] !== undefined && cookie['cities'].length > 0 &&

        locs?.map(item => {

            item.children?.map((city) => {

                if (city.id == cookie['cities'][0]) {

                    const citiesLength = cookie['cities'].length - 1

                    { citiesLength ? setSelectedLocCallBack(`${city.name}  و  ${citiesLength}  شهر  دیگر`) : setSelectedLocCallBack(city.name) }
                }
            })
        })
}