import { RiPencilLine } from "react-icons/ri";

function ComposeBtn() {
    return (
        <button
            className="flex justify-center w-fit items-center space-x-2 rounded-xl p-3 bg-white text-gray-600"
        >
            <RiPencilLine className="text-2xl" />
            <span className="text-sm">Compose</span>
        </button>
    );
}

export default ComposeBtn;
