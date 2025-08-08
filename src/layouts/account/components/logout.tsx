import { useTransition } from "react"
import { LogOut, LoaderCircle } from "lucide-react"
import { signout } from "@libs/actions/customer"

export default function SignoutButton() {
    const [isRemoving, startTransition] = useTransition();
    return (
        <button onClick={() => startTransition(() => signout())}
            className="mt-1 inline-flex items-center gap-1 text-xs font-light underline underline-offset-2 text-red-600 hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-red-500"
            aria-label="Sign out"
        >
            Sign out {isRemoving ? <LoaderCircle aria-hidden="true" size={14} className="animate-spin" /> : <LogOut aria-hidden="true" size={14} strokeWidth={1.5} />}
        </button>
    )
}