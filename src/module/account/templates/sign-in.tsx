import { login } from "@lib/action/customer"
import Button from "@module/common/custom-button"
import Input from "@module/common/custom-input"
import Link from "next/link"
import { useActionState } from "react"

export default function SIGNIN({ setCurrentView }: AuthProps) {
    const [message, formAction] = useActionState(login, null)
    return (
        <>
            <h2 className="text-2xl font-bold leading-9 tracking-tight">
                Welcome back
            </h2>
            <h3>
                Sign in to access an enhanced shopping experience.
            </h3>
            <div className="w-full mt-8">
                <form action={formAction} className="flex flex-col w-full gap-y-2">
                    <div className="mt-2">
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div className="mt-2">
                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm leading-6">
                            <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="text-sm leading-6">
                            <span onClick={() => setCurrentView("SIGN_UP")} className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer">
                                Join us
                            </span>
                        </div>
                    </div>

                    <Button type="submit" variant="outline" className="w-full rounded-md">
                        Sign in
                    </Button>
                </form>

            </div>
        </>
    )
}

export type AuthProps = {
    setCurrentView: (view: LOGIN_VIEW) => void
}

export type LOGIN_VIEW = "SIGN_IN" | "SIGN_UP"