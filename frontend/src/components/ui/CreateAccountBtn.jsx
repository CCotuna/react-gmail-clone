import React from 'react';
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Link } from 'react-router-dom';

function CreateAccountBtn() {
    return (
        <Link to={'/login'}>
            <div className="text-white bg-blue-500 py-3 px-4 w-fit border rounded-md flex items-center justify-evenly text-xs sm:text-sm md:text-base">
                <span className="text-xs sm:text-sm md:text-base">Create an account</span>
                <MdOutlineArrowDropDown className="ms-1 text-base sm:text-lg md:text-2xl" />
            </div>
        </Link>
    );
}

export default CreateAccountBtn;
