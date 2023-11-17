'use client'

import { PuffLoader } from 'react-spinners'

const Loader=()=>{
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
            <PuffLoader size={100} color="#FF385C"/>
        </div>
    )
}

export default Loader;