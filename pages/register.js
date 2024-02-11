
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from 'react';
const Resigter = ()=>{


    const { data: session } = useSession();
    const isUserSignedIn = session?.user;
 

    useEffect(() => {
        console.log("user data after login", isUserSignedIn);
    }, [isUserSignedIn])
    return(
        <div className='flex gap-8 justify-center'>
                        <button onClick={(e) => {
                            if (isUserSignedIn) {
                                signOut();
                            } else {
                                e.preventDefault();
                                signIn('facebook');
                            }
                        }} className='border-[1px]  border-[rgba(113,113,113,.4)] border-solid rounded-md cursor-pointer flex items-center px-10 lg:px-12 py-2'><span className='pl-2'>Facebook</span></button>
                    </div>
    )
}

export default Resigter;