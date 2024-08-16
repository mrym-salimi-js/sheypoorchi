import React from 'react'

export  function BorderRoundedBtn({ lable, handleAction }) {
    return (
        <span onClick={handleAction} className="p-3 text-sm bg-pink-50 text-[#84105C] rounded-full border border-[#84105C] cursor-pointer">
            {lable}
        </span>
    )
}
