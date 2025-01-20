import { RiPencilLine } from "react-icons/ri";
// import { saveMultipleEmails } from "../../utils/emails/emailFunctions";

function ComposeBtn({ onClick }) {
    return (
        <button
            className="flex justify-center w-fit items-center space-x-3 rounded-xl p-3 px-4  bg-white text-gray-600"
            onClick={() => {
                console.log("Compose button clicked");
                onClick();
            }}
        >
            <RiPencilLine className="text-2xl" />
            <span className="text-sm">Scrie</span>
            {/* <button className='flex justify-center w-fit items-center space-x-3 rounded-xl p-3 px-4  bg-white text-gray-600' onClick={saveMultipleEmails}>
                Send 51 Custom Emails
            </button> */}
        </button>

    );
}

export default ComposeBtn;
