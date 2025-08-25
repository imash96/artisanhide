"use client"

import { useState } from "react";
import { redirect } from "next/navigation";
import SIGNIN, { LOGIN_VIEW } from "@module/account/templates/sign-in";
import SIGNUP from "@module/account/templates/sign-up";

export default function Page() {
    const [currentView, setCurrentView] = useState<LOGIN_VIEW>("SIGN_IN");

    const renderView = () => {
        switch (currentView) {
            case "SIGN_IN":
                return <SIGNIN setCurrentView={setCurrentView} />;
            case "SIGN_UP":
                return <SIGNUP setCurrentView={setCurrentView} />;
            default:
                return redirect("/account");
        }
    };
    return renderView()
}