 
import Image from 'next/image'
import { useRouter } from 'next/navigation';



function Logo() {
    const router = useRouter();
    return (
        <Image
            onClick={() => router.push('/')}
            alt='logo'
            className='hidden md:block cursor-pointer'
            height="60"
            width="60"
            src="/logohotel.png"
        />
            
    );
}

export default Logo;