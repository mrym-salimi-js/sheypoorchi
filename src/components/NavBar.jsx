export default function NavBar() {


    const navIconSelected = (li) => {
        const navLis = document.querySelectorAll('.nav-li')

        navLis.forEach(liTag => {
            liTag.children[0].classList.remove('text-[#84105C]')

        })

        li.children[0].classList.add('text-[#84105C]')
    }


    return (
        <nav className="w-full lg:w-[40%] h-14 lg:rounded-lg shadow-md bg-white lg:border-[1px] border-t-[1px] border-[#f3f3f3] fixed bottom-0 lg:bottom-3 m-auto left-0 right-0 z-[50]">
            <ul className="w-full h-full flex flex-row-reverse gap-2 justify-around items-center">
                <li onClick={(event) => navIconSelected(event.currentTarget)} className="nav-li h-full flex items-center cursor-pointer hover:border-t-4 border-pink-500 ">
                    <a href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-[#84105C] ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </a>

                </li>

                <li onClick={(event) => navIconSelected(event.currentTarget)} className="nav-li h-full flex items-center cursor-pointer hover:border-t-4 border-pink-500">
                    <a href="/newad">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </a>

                </li>
                <li onClick={(event) => navIconSelected(event.currentTarget)} className="nav-li h-full flex items-center cursor-pointer hover:border-t-4 border-pink-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                    </svg>

                </li>
                <li onClick={(event) => navIconSelected(event.currentTarget)} className="nav-li h-full flex items-center cursor-pointer hover:border-t-4 border-pink-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>

                </li>
            </ul>
        </nav>
    )
}
