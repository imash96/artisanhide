import { IconWithTextType } from "@/types/common";

export default function IconWithText({ data }: { data: IconWithTextType[] }) {
    return (
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 gap-y-6 lg:gap-5 px-5 py-8 lg:py-10">
            {data.map(({ name, Icon, description }) => (
                <div key={name} className="flex flex-col md:flex-row items-center gap-4 text-gray-900">
                    <Icon className="w-14 lg:w-16" />
                    <div className="sm:flex flex-col justify-center align-middle space-y-1 sm:space-y-0 text-center sm:text-left ">
                        <h3 className="text-sm font-medium tracking-wider text-gray-800">{name}</h3>
                        <p className="font-light text-xs">{description}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}