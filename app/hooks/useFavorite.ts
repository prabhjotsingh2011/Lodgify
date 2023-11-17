
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback,useMemo } from 'react';
import {toast} from 'react-hot-toast'

import { safeUser } from '../types';
import useLoginModal from './useLoginModal';

interface IuseFavorite{
    listingId:string
    currentUser?:safeUser | null 
}

const useFavorite = ({listingId,currentUser}:IuseFavorite) => {
    const router = useRouter();
    const loginModal= useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(listingId)
    },[currentUser,listingId])

    const toggleFavorite = useCallback(async () => {
        
        if(!currentUser){
            loginModal.onOpen();
            return;
        }

        try{
            let request;
            if(hasFavorited){
                request = axios.delete(`/api/favorites/${listingId}`)
            }else{
                request = axios.post(`/api/favorites/${listingId}`)
            }
            await request;
            router.refresh()
            toast.success('Success')
        }catch(err:any){
            toast.error(err.message)
        }
    },[currentUser,listingId,hasFavorited,loginModal,router])
    
    return {
        hasFavorited,
        toggleFavorite
    }
    
}

export default useFavorite