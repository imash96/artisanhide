import { IconProp } from "@/type/common";

export default function BrowserWireframe({ color = "currentColor", ...props }: IconProp) {
    return (
        <svg viewBox="-252.3 356.1 163 80.9" strokeWidth={0} stroke="currentColor" {...props} {...props}>
            <path strokeWidth={2} fill="none" d="M-108.9 404.1v30c0 1.1-.9 2-2 2H-231c-1.1 0-2-.9-2-2v-75c0-1.1.9-2 2-2h120.1c1.1 0 2 .9 2 2v37m-124.1-29h124.1" />
            <circle cx={-227.8} cy={361.9} r={1.8} />
            <circle cx={-222.2} cy={361.9} r={1.8} />
            <circle cx={-216.6} cy={361.9} r={1.8} />
            <path strokeWidth={2} fill="none" d="M-128.7 400.1H-92m-3.6-4.1 4 4.1-4 4.1" />
        </svg>
    )
}