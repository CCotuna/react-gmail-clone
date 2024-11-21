import React from "react";

import { logout } from "../../../utils/auth/authFunctions";

import { IoSearch } from "react-icons/io5";
import { RiSoundModuleFill, RiQuestionLine } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";

import logo from "../../../assets/logo/gmailLogo.svg";

function Navigation() {
    
    const handleLogout = async () => {
        const result = await logout();
        if (!result.success) {
            alert(result.error);
        }
    };

    return (
        <header className="flex w-full items-center p-2 ps-0 pb-0 bg-transparent justify-between">
            <div className="flex space-x-36 justify-between">
                <div className="flex items-center">
                    <img src={logo} alt="Gmail Logo" className="w-8 h-auto ms-2 mr-2" />
                    <span className="text-2xl text-gray-300">Gmail</span>
                </div>
                <div className="flex items-center w-[36rem]">
                    <div className="flex items-center bg-white bg-opacity-30 rounded-full w-full max-w-2xl px-4 py-3 text-white">
                        <span className="cursor-pointer">
                            <IoSearch className="text-xl" />
                        </span>
                        <input
                            type="text"
                            placeholder="Caută în e-mailuri"
                            className="bg-transparent placeholder-white text-white w-full pl-2 focus:outline-none"
                        />
                        <span className="cursor-pointer">
                            <RiSoundModuleFill className="rotate-90 text-xl" />
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end space-x-4 text-white">
                <div className="flex items-center bg-white bg-opacity-30 rounded-full px-4 py-3 space-x-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span>Activ</span>
                    <MdKeyboardArrowDown />
                </div>

                <RiQuestionLine className="text-2xl cursor-pointer" />
                <AiFillSetting className="text-2xl cursor-pointer" />
                <TbGridDots className="text-2xl cursor-pointer" />

                <div className="flex items-center space-x-2 p-1 rounded-lg border">
                    <span className='bg-white rounded-md text-gray-700 text-2xl p-1'>Google</span>
                    <div
                        className="w-10 h-10 rounded-full bg-white cursor-pointer"
                        onClick={handleLogout}
                    ></div>
                </div>
            </div>
        </header>
    );
}

export default Navigation;
