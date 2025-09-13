import { StepType } from "@/type/common"
import { useCheckout } from "@lib/context/checkout-context"
import { Edit } from "lucide-react"

export default function StepHeader({ title, subtitle, Icon, showEdit, name }: StepHeaderProps) {
    const { setCurrentStep } = useCheckout()
    const handleEdit = () => setCurrentStep(name)
    return (
        <div className="flex items-center justify-between mb-4 pb-2 border-b">
            <div className="space-y-1">
                <h2 className="flex items-center gap-2 text-xl font-semibold">
                    <Icon className="w-6 h-6" />
                    {title}
                </h2>
                <p className="text-sm text-foreground-muted">{subtitle}</p>
            </div>
            {showEdit && <Edit className="w-6 mr-2 cursor-pointer" onClick={handleEdit} />}
        </div>
    )
}

type StepHeaderProps = {
    title: string,
    subtitle: string,
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    showEdit?: boolean,
    name: StepType
}