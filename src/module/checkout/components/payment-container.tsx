import { div as Div } from "motion/react-client"

export default function PaymentContainer({ children }: React.PropsWithChildren) {
    return (

        <Div
            key="extra-info"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-t"
        >
            {children}
        </Div>

    )
}