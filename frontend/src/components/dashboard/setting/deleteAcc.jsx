import { FaTrashAlt } from "react-icons/fa"

const DeleteAccount = () => {
    return (
        <div className="flex gap-3 p-5 rounded-md border border-pink-200 bg-[#ff0000] bg-opacity-30">
            <div className="text-xl h-10 w-10 bg-[#ff0000] bg-opacity-40 flex justify-center items-center rounded-full px-3 text-[#ff0000] opacity-70">
                <FaTrashAlt></FaTrashAlt>
            </div>
            <div>

                <h3 className="text-lg font-semibold">Delete Account</h3>
                <p className="text-sm">
                    Would you like to delete account?
                </p>
                <p className="text-sm">
                    This account contains Paid Courses. Deleting your account will remove all the contain associated with it.
                </p>
                <div className="flex justify-between my-4 text-center">

                    <p className="text-sm  text-[#ff0000] font-semibold">
                        I want to delete my account.
                    </p>
                    <button className="sm:px-3 font-semibold py-1 rounded-md text-[#ff0000] bg-[#ff0000] bg-opacity-20">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeleteAccount