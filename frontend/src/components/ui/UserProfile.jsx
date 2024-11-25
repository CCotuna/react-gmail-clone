import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { BsDot } from "react-icons/bs";
import { getAuth } from 'firebase/auth';

function UserProfile({ onClose, handleLogout }) {
    const [userEmail, setUserEmail] = useState('');
    const [domain, setDomain] = useState('');

    useEffect(() => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (currentUser) {
            const email = currentUser.email;
            setUserEmail(email);

            const domainPart = email.split('@')[1];
            setDomain(domainPart ? `Gestionat de ${domainPart}` : '');
        }
    }, []);

    return (
        <div className='bg-gray-700 w-96 rounded-2xl relative'>
            <div className='absolute top-2 right-2 cursor-pointer' onClick={onClose}>
                <IoMdClose className="text-2xl text-white" />
            </div>

            <div className='h-fit p-5 flex flex-col items-center justify-center space-y-5 bg-gray-750'>
                <div className='flex flex-col justify-center items-center space-y-2'>
                    <div className='flex flex-col items-center'>
                        <span>{userEmail}</span>
                        <span className='text-sm'>{domain}</span>
                    </div>
                    <span className='bg-white w-16 h-16 rounded-full'></span>
                    <span className='text-xl'>Salut, {userEmail.split('@')[0]}!</span>
                    <button className='px-3 py-2 border border-white text-blue-200 rounded-full'>Gestioneaza-ti Contul Google</button>
                </div>
                <div className='flex justify-between items-center w-full bg-red-700 text-white rounded-full py-3 px-5 mx-3 opacity-80'>
                    <span onClick={handleLogout}>Deconecteaza-te pentru moment</span>
                    {/* <span>Afiseaza mai multe conturi</span> */}
                    <span>
                        <IoMdClose />
                    </span>
                </div>
                <div className='flex items-center space-x-5 text-xs'>
                    <span>Politica de confidentialitate</span>
                    <span><BsDot /></span>
                    <span>Termeni si conditii</span>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
