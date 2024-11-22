import { useState } from "react";
import { MdInbox, MdStar, MdSnooze, MdSend, MdDrafts, MdLabel, MdExpandMore, MdExpandLess } from "react-icons/md";
import { IoMdTrash, IoMdTime, IoMdMail } from "react-icons/io";
import { RiSpam2Line } from "react-icons/ri";
import { FaRegFolderOpen, FaCog, FaTag } from "react-icons/fa";
import ComposeBtn from "../../ui/ComposeBtn";

function NavigationPanel({ setFilter }) {
    const [showMore, setShowMore] = useState(false);
    const [activeItem, setActiveItem] = useState("all");  

    const menuItems = [
        { id: "received", icon: <MdInbox className="text-xl" />, label: "Mesaje primite" },
        { id: "starred", icon: <MdStar className="text-xl" />, label: "Cu stea" },
        { id: "snoozed", icon: <MdSnooze className="text-xl" />, label: "Amânate" },
        { id: "sent", icon: <MdSend className="text-xl" />, label: "Trimise" },
        { id: "drafts", icon: <MdDrafts className="text-xl" />, label: "Mesaje nefinalizate" },
    ];

    const moreItems = [
        { id: "important", icon: <MdLabel className="text-xl" />, label: "Importante" },
        { id: "scheduled", icon: <IoMdTime className="text-xl" />, label: "Programate" },
        { id: "all", icon: <IoMdMail className="text-xl" />, label: "Toate mesajele" },
        { id: "spam", icon: <RiSpam2Line className="text-xl" />, label: "Spam" },
        { id: "archived", icon: <FaRegFolderOpen className="text-xl" />, label: "Arhivate" },
        { id: "trash", icon: <IoMdTrash className="text-xl" />, label: "Coș de gunoi" },
    ];

    const handleMenuItemClick = (id) => {
        setActiveItem(id); 
        setFilter(id); 
    };

    const renderMenuItem = (item) => (
        <div
            key={item.id}
            className={`flex items-center justify-between space-x-3 px-3 rounded-full cursor-pointer 
                ${activeItem === item.id ? "bg-white bg-opacity-30" : "hover:bg-white hover:bg-opacity-30"}`}
            onClick={() => handleMenuItemClick(item.id)}
        >
            <div className="flex items-center space-x-3">
                {item.icon}
                <span>{item.label}</span>
            </div>
        </div>
    );

    return (
        <div className="w-auto min-w-64 h-[calc(100vh-5rem)] mt-4 bg-transparent text-white space-y-5">
            <ComposeBtn />
            <div className="space-y-1">
                {menuItems.map(renderMenuItem)}

                <div
                    className="flex items-center cursor-pointer rounded-full hover:bg-white hover:bg-opacity-30"
                    onClick={() => setShowMore(!showMore)}
                >
                    {showMore ? <MdExpandLess className="text-xl" /> : <MdExpandMore className="text-xl" />}
                    <span>{showMore ? "Mai puține" : "Mai multe"}</span>
                </div>

                {showMore && <div className="space-y-1">{moreItems.map(renderMenuItem)}</div>}
            </div>
        </div>
    );
}

export default NavigationPanel;
