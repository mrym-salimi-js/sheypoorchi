

export function MapCurrentLocation({ setMovedLat, setMovedLon}) {

    const handleCurrentLoc = () => {
        navigator.geolocation.getCurrentPosition((position) => {

            setMovedLat(position.coords.latitude)
            setMovedLon(position.coords.longitude)

        })
    }
    return (
        <div onClick={handleCurrentLoc} className="w-8 h-8 absolute left-[10px] top-[76px] z-[1000] bg-white rounded-md flex items-center justify-center cursor-pointer hover:bg-slate-100">
            <img className="w-6 h-6 fill-white" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEwklEQVR4nO1aQY9URRDuKFEOMtVviCf9AcBP0IMJxATwyqw6VesAJl4USNAAK8Iz0/2yCycXFLggcYMc9gB/A8IFjUACSyIIC3fIemBBU29mdt/O9HT3sK9nZpn3JZ1M5r1X3VXdVfV1dQtRoECBAgUKFCjQZ2iJRxXQPDctaUKMEpKIPtOS/su2pIRjYhQQi9p6LXG23QD8Hz8TrxtmReVNHeEnWtI5BXRbSVrsVL7R0meAtxTg2Xo0vpO/FWsVcRnfV4A/aqAH3RR2NQV4X0uKdfmL98RaQSwqb9UlHlCAz15V8U5D0AIbc+hdJCnRx0rSvbwUN8SJuQRwmxhGaKCvtKTn4ZTPxAlJ+8VQBTnAn0Mr3tGATg1FkFSAp/uu/HKQnB6o8lrS/h4C2bwGmlRAW7XEKwb/vsLPlMSpJjv0dAncN8iAt+ixVB8piTXODq1vlcTvDe8u0WF+VwPt9jEEj6HvgTEWtfU+0V5JvDAVVaD9+xMb925Qkq5lZv9q/G7lnY5+oCY14Ix7JeBcX1OkZnJin5WXCuiQTUYsPlqXRNUPVUQf8G9HfxMs02Hs47kr2o3hacB/Hf5uVf5VwEZw9LnAYxOhoZjeOpZ9qL493CEWIRGL+I0mP+8S8PAx+22o/jmeKMCHloD7T1BuUI/Gdzpmv+YjJynjloZf4wVu/LteHt/s860C2mNdBVF1hwgFLemcLd1lU123GdRAl0wBLf0P8GJcxpJNxrTY9zavNMsqPCNCQQHdthhg0kP5P52pE/APlxG0xBOWYHhTBMz9i5aOt1oHDXTJnc+XZnHGJouJjyUFL+bOCZK0hmcqY63o+DIzPCY5Hd+XcYsxjwP9nTaDOyQbP9/ULodlp8VUSZftRsRZVap+movyykxbbYa41k5sTDIU4MElA0H1247nER7JymCZSuL1XsaSS7VZ9bAxaTVmeFkZWuKv7TPf2c/K9Koknc8+Z5m9joMD86oNoIEe9dox09thMABzhuAUVHf631UfF+Blv6w8fefnAtkNlNcKOCzyQFLCMZ8gyMYy7eqY5BhzP+B9M7PEF6YgyLLZmD5BUMN4JRfl80uDeLGHpfvbUKXBFvjQonvHOCUsYHLDJMe9bPGGKZVmoSSdtHz/lwgFBXjWsgLmXVSYjcAkx7y3xxc88y7lB0qFdVTd4Qg6u33ksH9zgGpthrh+YPJ54xgA91rdJ6LtIuR2WBuYW8b6jyehGoXqv7mf6J6WgR4EL5VrRznMxeNX1bcjkPalLBanh5604AhmuV944D2APXPQQt8OUbXEY/aZSIPchE9RlJu7KJpugBxFUfohd0XtnADveqS0GVOJrFEWX97YMMMzRX+OJwrod2c/ku5wdhD9RAK4zedgpHkPaE82RZqWMzO81nNWRgF9qSQ98VD+uYuEBYOW9I3HAJcyBFdyGizOfDTWNOpJT8Vbq+drMaqHoxroJzEcx+N0ahAnw0NxPC5G/YJEFk3/ngtogDsDC3i9XpLSQE9H7pJUFszKUtq8ymtyTG/X1DW5dnCgSo/UAM/woYXromT6DtAvvPPkzZd43TDN+/kuV2X7zuYGhUaNcaUB6oC7xChBc7WZ9/aNlk/1tkCBAgUKFChQQPjjf40kWsLDDj8FAAAAAElFTkSuQmCC" />

        </div>
    )
}
