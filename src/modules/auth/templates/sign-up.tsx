import { login, signup } from "@libs/actions/customer"
import Button from "@modules/common/custom-button"
import Input from "@modules/common/custom-input"
import { AuthProps } from "app/(store)/accounts/@dash/[tab]/page"
import Link from "next/link"
import { useActionState } from "react"

export default function SIGNUP({ setCurrentView }: AuthProps) {
    const [message, formAction] = useActionState(signup, null)
    return (
        <>
            <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Become a Member
            </h2>
            <h3>
                Create your profile and get access to an enhanced shopping experience.
            </h3>
            <div className="w-full flex flex-col mt-8">
                <form action={formAction} className="flex flex-col w-full gap-y-2">
                    <div className="mt-2">
                        <Input
                            label="First name"
                            name="first_name"
                            required
                            autoComplete="given-name"
                        />
                    </div>
                    <div className="mt-2">
                        <Input
                            label="Last name"
                            name="last_name"
                            required
                            autoComplete="family-name"
                        />
                    </div>
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
                            label="Phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
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
                            <span onClick={() => setCurrentView("SIGN_IN")} className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer">
                                Sign in
                            </span>
                        </div>
                    </div>

                    <Button type="submit" variant="solid" className="w-full rounded-md">
                        Join
                    </Button>
                </form>

            </div>
        </>
    )
}