import React from 'react';
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Link } from 'react-router-dom';

function CreateAccountBtn() {
    return (
        <div className="text-white bg-blue-500 py-3 px-4 w-fit border rounded-md flex items-center justify-evenly text-xs sm:text-sm md:text-base">
            <Link className="text-xs sm:text-sm md:text-base">Create an account</Link>
            <MdOutlineArrowDropDown className="ms-1 text-base sm:text-lg md:text-2xl" />
        </div>
    );
}

export default CreateAccountBtn;
