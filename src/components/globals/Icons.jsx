export function Speaker({ color, size }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} className={`${size} scale-x-[-1] rotate-[30deg]`}>
            <path d="M16.881 4.345A23.112 23.112 0 0 1 8.25 6H7.5a5.25 5.25 0 0 0-.88 10.427 21.593 21.593 0 0 0 1.378 3.94c.464 1.004 1.674 1.32 2.582.796l.657-.379c.88-.508 1.165-1.593.772-2.468a17.116 17.116 0 0 1-.628-1.607c1.918.258 3.76.75 5.5 1.446A21.727 21.727 0 0 0 18 11.25c0-2.414-.393-4.735-1.119-6.905ZM18.26 3.74a23.22 23.22 0 0 1 1.24 7.51 23.22 23.22 0 0 1-1.41 7.992.75.75 0 1 0 1.409.516 24.555 24.555 0 0 0 1.415-6.43 2.992 2.992 0 0 0 .836-2.078c0-.807-.319-1.54-.836-2.078a24.65 24.65 0 0 0-1.415-6.43.75.75 0 1 0-1.409.516c.059.16.116.321.17.483Z" />
        </svg>
    )
}
export function Camera({ color }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} className="size-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
        </svg>

    )
}
export function Warning({ color }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
    )
}

export function ChevronLeft({ color, size,strokeWidth}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke={color} className={size}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
    )
}
export function ChevronRight() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>

    )
}

export function CloseMark({handleClosing,color,size}) {
    return (
        <svg onClick={handleClosing} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} className={`${size} cursor-pointer`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    )
}

export function RecycleBin() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>

    )
}

export const mapMerker = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADkElEQVR4nO1aTWgdVRQ+WrVK+nLOvFSCNgoVLbS1XVpc+FtL20V1IQ+bOeel0NLQ0DRSN3ZThrxzJyaIiywsKgghdNVNSzfdiBJapKG4MQmuxIL9kZRaaxNMIjHlviSE0CTcO2/m5QX84MIwPL75vnvPOXPn3AfwP2ahwUcvGJRWg9yvJD8ZkjuG5F8lnlLiUSW+ZlD6FOVI1HDweagVaCD7DMkPhnjakMy4DZ5Wku8Ui++tqnAlGXQXvfRQ5B+raqQ7KKBBPlup8EcGSl9Pw+FcpuJLueZXFOWX1MXT/GrISFe9vJyN+CDcoSR/ZCXeLJi4VcoXt6Yq3lYNg/J71uLNQjjdjPLclIr4r6H1yXIJrJZ4mh98NYK3nqjYgEHprL54mTdxuiLx3UHxRYP8j+fy/1wi/rgUtGz/vFHq7LDX9p4iD/lx8bjJt2xKbEBRvnROPuIJDaQtgujx5fjOQWGdkhw3JJPuSc29icTbmqzIf7uKjzF8x2Ni3nU1oSh/2VX0NmBQPnRe6qB4zJufpN09nMIP/A2QfOUa8yuFzUrhZJCHHXPhjLcBj31OByRECeWkYxhdSWCAR13I4zxvS2ogDuRVxxW4ncTAhAt59GxhQ1IDPQ2Hc65Fwpu8XIMdyCvZQUZ5rnfMswfe5Er8W62EkJL86k1uUAZcyO0bNvMkJvnem1yRu9wqBA/ZkujLX34ro4w4ViHjbcAE4X7HMmpn6Lg3P0mHK7+pL+71NtALJ9YryZ+OD5mMkXe7cttvYNutMG7cdyMoPAVJYEi+cZ6l2b1N+0rhVH77knR4iJ+xOwJIis6c7PJ40FzJ42GbnLbC2HeEHfZakT9xjXmzKHyaX4NKYJAvez80rYEyAJWiRPz+qhkgOQBpwDafqi1eSQZnAB5LxwCFb1bbQOzxgeRmAvlC9QzweUgb9gNfkccyF488riibIQtowKeyNyCfQlawjaYsE1qJr9lGGmSJzzB8ybVb4SUeeawrV9wC1UD5JCZ1A+FRqCYU+WKKiXsptZrvirjuYKNthVc+83LLcsFqoCsovu7TJlwiaadi4jdgNTHX60xmIJA2qAUoybcJ4r4fagVfNBWe8TkEsb+N4NDTUEswG/k5g3Ldod7fSO34KG3YHpEhvrd82Mj9mFp2Qi1Dkd9eqjKVK0697IG1gDgIw8V/PeBpew/WEjSQttmZl/+SHIBALcBuv+3I8iEPAcyKg6NGy7ZuAAAAAElFTkSuQmCC"




