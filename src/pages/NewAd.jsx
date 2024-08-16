import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import { NewAdForm } from "../components/newAd/NewAdForm";

export default function NewAd() {


    
    return (
        <>

            <SearchBar />

            <div className='w-full h-full relative flex flex-col gap-6 items-center mb-14  p-2'>

                <NewAdForm />
            </div>
            <NavBar />
        </>

    )
}
