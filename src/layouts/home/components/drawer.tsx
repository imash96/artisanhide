"use client"

import { AnimatePresence, motion } from "motion/react"
import type { MotionProps } from "motion/react"
import { useEffect } from "react"

export default function Drawer({ state, onClose, direction = "left", type, children }: DrawerProps) {
    const drawerMotionProps: MotionProps = {
        initial: { x: direction === "left" ? "-100%" : "100%" },
        animate: { x: 0 },
        exit: { x: direction === "left" ? "-100%" : "100%" },
        transition: {
            type: "spring",
            damping: 25,
            stiffness: 200,
            duration: 0.4,
        }
    }

    useEffect(() => {
        if (state) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "unset";

        return () => { document.body.style.overflow = "unset" };
    }, [state])


    return (
        <AnimatePresence>
            {state && <>
                <motion.div {...drawerBackdropProps} className={`fixed inset-0 bg-curtain z-40 ${type != "cart" && "xm:hidden"}`} onClick={onClose} />
                <motion.div {...drawerMotionProps} className={`fixed flex h-full w-11/12 sm:w-5/6 max-w-md bg-white shadow-2xl z-50 ${type != "cart" && "xm:hidden"} ${direction === "left" ? "inset-0" : "top-0 right-0"}`}>
                    {children}
                </motion.div>
            </>}
        </AnimatePresence >
    )
}

const drawerBackdropProps: MotionProps = {
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