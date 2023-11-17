'use client'

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItems from './MenuItems';
import { log } from 'console';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { User } from '@prisma/client';
import { signOut, useSession } from 'next-auth/react';
import { safeUser } from '@/app/types';
import { toast } from 'react-hot-toast';
import useRentModal from '@/app/hooks/useRentModal';
import RentModal from '../modals/RentModal';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
    currentUser?: safeUser | null;
}


const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    // const { data } = useSession();
    console.log("this is to check", currentUser);
 

    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);
    const loginModal = useLoginModal();
    const rentModal=useRentModal();

    const onRent=useCallback(()=>{
        if(!currentUser){
            toast.error("Please login to continue");
            return loginModal.onOpen();
        }

        //Add property
        rentModal.onOpen();

    },[currentUser, loginModal])
    const registerModal = useRegisterModal();
    const name=currentUser?.name;

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={onRent}
                    className="hidden md:block cursor-pointer text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition "
                >
                    Lodgify your home
                </div>
                <div onClick={toggleOpen()}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <AiOutlineMenu />
                    <div className='hidden md:block'>
                        <Avatar />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overlfow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser
                            ?
                            (
                                <>
                                    <MenuItems
                                        onClick={() => {}}
                                        label={name}
                                    />
                                    <MenuItems
                                        onClick={() => router.push('/trips')}
                                        label="My Trips"
                                    />
                                    <MenuItems
                                        onClick={() => router.push('/favourites')}
                                        label="My Favourites"
                                    />
                                      <MenuItems
                                        onClick={() => router.push('/reservations')}
                                        label="My reservations"
                                    />
                                      <MenuItems
                                        onClick={() => router.push('/properties')}
                                        label="My properties"
                                    />
                                      <MenuItems
                                        onClick={rentModal.onOpen}
                                        label="Lodgify my home"
                                    />
                                      <MenuItems
                                        onClick={() => signOut()}
                                        label="Log out"
                                    />
                                </>
                            )
                            :
                            (
                                <>
                                    <MenuItems
                                        onClick={loginModal.onOpen}
                                        label="Login"
                                    />
                                    <MenuItems
                                        onClick={registerModal.onOpen}
                                        label="Sign Up"
                                    />
                                </>
                            )

                        }

                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;