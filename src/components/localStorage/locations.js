
export function locations() {
    return JSON.parse(localStorage.getItem('ads_locations_list'))
}

export function provincesList() {
    const locs = locations()

    const prv = locs?.map(prv => {
        return prv
    })

    return prv
}

export function citiesList() {

    const prv = provincesList()
    const cities = [];
    
    prv?.map(item => {
        item.children.map(city => {
            cities.push(city)
        })
    })
    return cities
}