import { signout } from "@libs/actions/customer";
import { LogOutIcon } from "lucide-react";

export default function Logout() {

    const handleLogout = async () => {
        await signout()
    }
    return (
        <li>
            <span
                onClick={handleLogout}
                className='group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 active:bg-gray-300 active:text-gray-900 text-gray-700 hover:bg-gray-200 hover:text-gray-800'>
                <LogOutIcon aria-hidden="true" className="h-5 w-5 shrink-0" />
                Logout
            </span>
        </li>
    )
}