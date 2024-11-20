import { IoMdMenu } from "react-icons/io";
import { IoMailOutline } from "react-icons/io5";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import { HiOutlineVideoCamera } from "react-icons/hi2";

function Sidebar() {
  return (
    <div className="bg-black bg-opacity-30 w-16 h-screen flex flex-col items-center space-y-3 text-white">
      {/* Menu Icon */}
      <div className="text-2xl mb-8 mt-4 cursor-pointer p-3 rounded-full hover:bg-black hover:bg-opacity-20 transition duration-200 ease-in-out">
        <div className="text-white"><IoMdMenu /></div>
      </div>

      {/* Email Icon */}
      <div className="text-xl flex items-center justify-center flex-col cursor-pointer relative group">
        <div className="p-1 px-3 rounded-full group-hover:bg-gray-400 transition duration-200 ease-in-out">
          <div className="text-white"><IoMailOutline /></div>
        </div>
        <div className="text-xs">Mail</div>
      </div>

      {/* Chat Icon */}
      <div className="text-xl flex items-center justify-center flex-col cursor-pointer relative group">
        <div className="p-1 px-3 rounded-full group-hover:bg-gray-400 transition duration-200 ease-in-out">
          <div className="text-white"><MdOutlineChatBubbleOutline /></div>
        </div>
        <div className="text-xs">Chat</div>
      </div>

      {/* Video Camera Icon */}
      <div className="text-xl flex items-center justify-center flex-col cursor-pointer relative group">
        <div className="p-1 px-3 rounded-full group-hover:bg-gray-400 transition duration-200 ease-in-out">
          <div className="text-white"><HiOutlineVideoCamera /></div>
        </div>
        <div className="text-xs">Meet</div>
      </div>
    </div>
  );
}

export default Sidebar;
