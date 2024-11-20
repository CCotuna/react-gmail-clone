import { RiPencilLine } from "react-icons/ri";

function ComposeBtn() {
    return (
        <button
            className="flex justify-center w-fit items-center space-x-3 rounded-xl p-3 px-4  bg-white text-gray-600"
        >
            <RiPencilLine className="text-2xl" />
            <span className="text-sm">Scrie</span>
        </button>
    );
}

export default ComposeBtn;
