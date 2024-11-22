import { IoMdMenu } from "react-icons/io";
import { IoMailOutline, IoMailSharp } from "react-icons/io5";
import { MdOutlineChatBubble, MdOutlineChatBubbleOutline } from "react-icons/md";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ setIsNavPanelOpen }) {
  const location = useLocation(); 

  return (
    <div className="bg-black bg-opacity-30 w-16 h-screen flex flex-col items-center space-y-3 text-white">
      {/* Menu Icon */}
      <div className="text-2xl mb-8 mt-2 cursor-pointer p-3 rounded-full hover:bg-gray-400 hover:bg-opacity-20 transition duration-200 ease-in-out"  onClick={() => setIsNavPanelOpen(prev => !prev)}>
        <div className="text-white"><IoMdMenu /></div>
      </div>

      {/* Email Icon */}
      <Link to={'/gmail/mail'}>
        <div className="text-xl flex items-center justify-center flex-col cursor-pointer relative group">
          <div className={`p-1 px-3 rounded-full transition duration-200 ease-in-out ${location.pathname === '/mail' ? 'bg-gray-400' : 'group-hover:bg-gray-400'}`}>
            <div className="text-white">
              {location.pathname === '/gmail/mail' ? <IoMailSharp /> : <IoMailOutline />}
            </div>
          </div>
          <div className="text-xs">Mail</div>
        </div>
      </Link>
      
      {/* Chat Icon */}
      <Link to={'/gmail/chat'}>
        <div className="text-xl flex items-center justify-center flex-col cursor-pointer relative group">
          <div className={`p-1 px-3 rounded-full transition duration-200 ease-in-out ${location.pathname === '/chat' ? 'bg-gray-400' : 'group-hover:bg-gray-400'}`}>
            <div className="text-white">
              {location.pathname === '/chat' ? <MdOutlineChatBubble /> : <MdOutlineChatBubbleOutline />}
            </div>
          </div>
          <div className="text-xs">Chat</div>
        </div>
      </Link>

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
