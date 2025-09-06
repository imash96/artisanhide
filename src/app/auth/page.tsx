"use client";

import { useActionState, useState } from "react";
import Button from "@module/common/custom-button";
import { login, signup } from "@lib/action/customer";
import SIGNIN from "@module/auth/templates/sign-in";
import SIGNUP from "@module/auth/templates/sign-up";
import { LogIn } from "lucide-react";

export type LOGIN_VIEW = "SIGN_IN" | "SIGN_UP";

export default function Page() {
    const [view, setView] = useState<LOGIN_VIEW>("SIGN_IN");
    const isSignIn = view === "SIGN_IN";
    const safeAction = async (state: any, formData: FormData) => isSignIn ? login(state, formData) : signup(state, formData)
    const [message, formAction, isPending] = useActionState(safeAction, null);
    return (
        <div className="w-full space-y-6">
            {/* Headings */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    {isSignIn ? "Welcome back" : "Become a Member"}
                </h1>
                <p className="mt-1 text-sm text-foreground-muted">
                    {isSignIn ? "Sign in to access your account and enjoy personalized shopping." : "Create your account to enjoy a personalized and enhanced shopping experience."}
                </p>
            </div>

            {/* Form */}
            <form action={formAction} className="flex flex-col gap-y-4">
                {isSignIn ? <SIGNIN /> : <SIGNUP />}

                {/* Action Button */}
                <Button
                    Icon={LogIn}
                    iconClassName="w-4"
                    type="submit"
                    variant="solid"
                    className="w-full h-11"
                    isLoading={isPending}
                >
                    {isSignIn ? "Sign in" : "Sign up"}
                </Button>
            </form>

            {/* View Switcher */}
            <p className="text-center text-sm font-light">
                {isSignIn ? (
                    <>
                        Don&apos;t have an account?{" "}
                        <button
                            type="button"
                            onClick={() => setView("SIGN_UP")}
                            className="font-medium text-secondary hover:text-link transition-colors"
                        >
                            Sign up
                        </button>
                    </>
                ) : (
                    <>
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() => setView("SIGN_IN")}
                            className="font-medium text-secondary hover:text-link transition-colors"
                        >
                            Sign in
                        </button>
                    </>
                )}
            </p>
            {message && (
                <p className="text-sm text-center text-destructive mt-2">{message}</p>
            )}
        </div>
    );
}