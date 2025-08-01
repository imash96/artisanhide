import Container from "@modules/common/create-section";

export default function SectionHeader({ title, desc, sectionName, children }: SectionHeaderProps) {
    return (
        <Container sectionName={sectionName} className="space-y-8 py-6 md:py-10">
            <div className="space-y-0.5">
                <h2 className="text-center text-[24px] lg:text-[30px] tracking-tight font-normal text-brown">
                    {title}
                </h2>
                <p className="max-w-xl mx-auto text-center text-[12px] lg:text-[14px] tracking-wide font-light text-gray-600">
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
    sectionName: string
} & React.PropsWithChildren