type ContainerProps<T extends React.ElementType> = {
    as?: T
    sectionName?: string
    className?: string | undefined
} & React.ComponentPropsWithoutRef<T>

export default function Container<T extends React.ElementType = "div">({ as, children, sectionName, className = "", ...props }: ContainerProps<T>) {
    const Component = as || 'div'

    return (
        sectionName ? <section aria-labelledby={`${sectionName}-heading`}>
            <Component className={`mx-auto max-w-8xl px-4 md:px-10 lg:px-14 ${className ?? ""}`} {...props}>
                {children}
            </Component>
        </section> : <Component className={`mx-auto max-w-8xl px-4 md:px-10 lg:px-14 ${className ?? ""}`} {...props}>
            {children}
        </Component>

    )
}