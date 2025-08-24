import ProfilePersonal from "../components/profile-basic";
import ProfilePassword from "../components/profile-password";
import ProfileBilling from "../components/profile-billing";
import { Metadata } from "next";
import { StoreCustomer, StoreRegion } from "@medusajs/types";

export const metadata: Metadata = {
    title: "Profile",
    description: "View and edit your Medusa Store profile.",
}

export default function Profile({ customer, regions }: CustomerProps) {
    return (
        <>
            <ProfileHolder
                title="Personal Information"
                desc="Use a permanent address where you can receive mail."
            >
                <ProfilePersonal customer={customer} />
            </ProfileHolder>

            <ProfileHolder
                title="Change password"
                desc="Update your password associated with your account."
            >
                <ProfilePassword />
            </ProfileHolder>

            <ProfileHolder
                title="Billing Address"
                desc="Update your billing address associated with your account."
            >
                <ProfileBilling customer={customer} regions={regions} />
            </ProfileHolder>
        </>
    )
}

const ProfileHolder = ({ children, title, desc }: HolderProp) => {
    return (
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-3 py-6">
            <div>
                <h2 className="text-base font-semibold leading-7">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-foreground-muted">
                    {desc}
                </p>
            </div>
            {children}
        </div>
    )
}

type HolderProp = {
    title: string
    desc: string
} & React.PropsWithChildren

export type CustomerProps = {
    customer: StoreCustomer
    regions: StoreRegion[]
}