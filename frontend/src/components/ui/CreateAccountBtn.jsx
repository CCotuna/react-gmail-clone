import React from 'react';

import { MdOutlineArrowDropDown } from "react-icons/md";
import { Link } from 'react-router-dom';

function CreateAccountBtn() {
    return (
        <div className='text-white bg-blue-500 py-2 px-4 pe-2 w-fit border rounded-md flex items-center justify-evenly'>
            <Link>Create an account</Link>
            <MdOutlineArrowDropDown className="ms-2 text-2xl" />
        </div>
    );
};

export default CreateAccountBtn;