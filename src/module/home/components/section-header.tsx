import Container from "@module/common/create-section";

export default function SectionHeader({ title, desc, sectionName, className = "", children }: SectionHeaderProps) {
    return (
        <Container sectionName={sectionName} className="space-y-8 py-6 md:py-10">
            <div className={`space-y-0.5 ${className}`}>
                <h2 className="text-center text-2xl lg:text-3xl tracking-tight font-normal">
                    {title}
                </h2>
                <p className="max-w-2xl mx-auto text-center text-xs lg:text-sm tracking-wide font-light text-foreground-muted">
                    {desc}
                </p>
            </div>
            {children}
        </Container>
    )
}

type SectionHeaderProps = {
    title: string,
    desc: string,
    sectionName: string,
    className?: string
} & React.PropsWithChildren