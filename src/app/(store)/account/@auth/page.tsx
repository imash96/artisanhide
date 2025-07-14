"use client"

import SIGNUP from "@modules/auth/templates/sign-up";
import SIGNIN from "@modules/auth/templates/sign-in";
import { useState } from "react";
import { notFound } from "next/navigation";

export default function Page() {
    const [currentView, setCurrentView] = useState<LOGIN_VIEW>("SIGN_IN");

    const renderView = () => {
        switch (currentView) {
            case "SIGN_IN":
                return <SIGNIN setCurrentView={setCurrentView} />;
            case "SIGN_UP":
                return <SIGNUP setCurrentView={setCurrentView} />;
            default:
                return notFound;
        }
    };
    return renderView()
}

type LOGIN_VIEW = "SIGN_IN" | "SIGN_UP"

export type AuthProps = {
    setCurrentView: (view: LOGIN_VIEW) => void
}