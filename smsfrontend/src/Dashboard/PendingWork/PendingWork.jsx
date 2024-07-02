import React from 'react'

const PendingWork = () => {
    return (
        <>
            <div className='text-center p-5 ml-auto shadow-lg  h-[100vh] overflow-y-scroll scrollbar-hide bg-[#f5f6fa] mt-5'>
                <label className='font-black text-lg text-yellow-600'>Manager</label>
                <h1 className='font-black hover:text-blue-800 hover:underline underline-offset-4'>Pending Student Fee Card Generation [14]</h1>
            </div>
            {/* Footer */}
            <div className="bg-[var(--theme-color)]">
                <h1 className="font-extrabold text-sm text-center text-white px-2 py-3">
                    &#169; 2023 SMS Education | All Rights Reserved
                </h1>
            </div>
        </>
    )
}

export default PendingWork