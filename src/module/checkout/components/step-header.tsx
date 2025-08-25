

export default function StepHeader({ title, subtitle, Icon, children }: StepHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-4">
            <div className="">
                <h2 className="flex items-center gap-2 text-xl font-semibold">
                    <Icon className="w-6 h-6" />
                    {title}
                </h2>
                <p className="mt-1 text-sm text-foreground-muted">{subtitle}</p>
            </div>
            {children}
        </div>
    )
}

type StepHeaderProps = {
    title: string,
    subtitle: string,
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
} & React.PropsWithChildren