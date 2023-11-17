'use client';
import useCountries from '@/app/hooks/useCountries';
import useSearchModal from '@/app/hooks/useSearchModal';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import {BiSearch} from 'react-icons/bi';
function Search() {
    const searchModal=useSearchModal()
    const params= useSearchParams()
    const {getByValue} = useCountries()


    const locationValue= params?.get('locationValue')
    const startDate= params?.get('startDate')
    const endDate= params?.get('endDate')
    const guestCount= params?.get('guestCount')


     const locationLabel= useMemo(()=>{
        if(locationValue){
            return getByValue(locationValue as string)?.label
        }
        return 'Anywhere'
     },[getByValue,locationValue])

     const durationLabel=useMemo(()=>{
            if(startDate && endDate){
                const start= new Date(startDate)
                const end= new Date(endDate)
                const days= (end.getTime()-start.getTime())/(1000*3600*24)
                return `${days} days`
            }
            return 'Any week'
        
     },[endDate,startDate])

     const guestLabel= useMemo(()=>{
            if(guestCount){
                return `${guestCount} guests`
            }
            return 'Add guests'
        
     },[guestCount])

    return (
        <div
        onClick={searchModal.onOpen}
        className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
           <div className="flex flex-row items-center justify-between">
                <div className="text-sm font-semibold px-6">
                    {locationLabel}
                </div>
                <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                    {durationLabel}
                </div>
                <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                    <div className="hidden sm:block"> 
                        {guestLabel}
                    </div>
                     <div className="p-1 bg-rose-500 rounded-full text-white">
                         <BiSearch size={14}/>
                     </div>
                </div>
           </div>
        </div>
    );
}

export default Search;