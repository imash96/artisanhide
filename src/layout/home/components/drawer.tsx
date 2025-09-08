"use client"

import { AnimatePresence, type MotionProps } from "motion/react"
import { div as Div } from "motion/react-client"
import { useEffect } from 'react'

export default function Drawer({ state, onClose, direction = "left", type, children }: DrawerProps) {

    useEffect(() => {
        if (state) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "unset";

        return () => { document.body.style.overflow = "unset" };
    }, [state])

    // const drawerMotionMotion: MotionProps = {
    //     initial: { x: direction === "left" ? "-100%" : "100%" },
    //     animate: { x: 0 },
    //     exit: { x: direction === "left" ? "-100%" : "100%" },
    // }

    const drawerVariants = {
        closed: { x: direction === "left" ? "-100%" : "100%" },
        open: { x: 0 },
    }

    return (
        <AnimatePresence>
            {state && <>
                <Div
                    {...drawerBackdropMotion}
                    className={`fixed inset-0 bg-overlay z-40 ${type != "cart" && "xm:hidden"}`}
                    onClick={onClose}
                />
                <Div
                    variants={drawerVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    transition={{ type: "spring", damping: 25, stiffness: 200, duration: 0.3 }}
                    className={`fixed flex h-full w-11/12 sm:w-5/6 max-w-md shadow-2xl z-50 ${type != "cart" && "xm:hidden"} ${direction === "left" ? "inset-0" : "top-0 right-0"}`}
                >
                    {children}
                </Div>
            </>}
        </AnimatePresence >
    )
}

const drawerBackdropMotion: MotionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 0.5 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: "easeInOut" }
}

type DrawerProps = {
    state: boolean
    onClose: () => void
    direction: "left" | "right"
    type?: "cart" | undefined
} & React.PropsWithChildren