import { IconProp } from "@/types/common";

export default function Placeholder({ ...props }: IconProp) {
    return (
        <svg xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 400" {...props}>
            <defs>
                <linearGradient id="a">
                    <stop offset={0} stopColor="#c2c2c2" />
                    <stop offset={1} stopColor="#9f9f9f" />
                </linearGradient>
                <linearGradient gradientTransform="translate(-45 0)" gradientUnits="userSpaceOnUse" y2={110} x2={660} y1={6.5} x1={660} id="b" xlinkHref="#a" />
            </defs>
            <g transform="translate(-400 -120)">
                <rect y={0} x={0} height={525} width={700} fill="#eee" />
                <g transform="translate(45 190)">
                    <rect fill="#9f9f9f" width={85} height={90} x={400} y={180} ry={8}  transform="rotate(-16)" />
                    <g transform="rotate(16.32 538.136 -184.897)" stroke="#fff">
                        <rect ry={4.6} y={1.6} x={547} height={115} width={110} fill="url(#b)" strokeWidth={5} />
                        <g strokeWidth={2.2}>
                            <path fill="#ccc" d="M559.109 12.206h84.789v77.692h-84.79z" />
                            <path fill="#fff" d="M559.109 12.206h84.789v36.257h-84.79z" />
                            <path fill="#ccc" paintOrder="stroke" d="m564.288 48.463 6.64-9.244 10.451-7.797 2.742 3.207 2.35-6.679 1.416-.514 2.299-4.871 31.077 31.077" />
                            <path fill="#b3b3b3" paintOrder="stroke" d="M590.186 22.565a153 153 0 0 1 2.964 15.172l-3.81-1.236-7.96-5.079.919 8.016-.28 4.279 1.736 5.245 12.636-2.03 14.513-3.649-8.253-13.369-1.674 2.578-4.684-3.82Z" />
                            <path d="m585.006 53.642 14.14-12.85 3.195-1.671 4.083-7.63 4.48-3.746 31.077 31.077" fill="#ccc" paintOrder="stroke" />
                            <path fill="#b3b3b3" paintOrder="stroke" d="m610.904 27.745 6.204 13.97V52.11l3.878 3.361a14.1 14.1 0 0 1 3.875-2.711c2.56-1.21 5.41-1.616 8.144-2.352 1.11-.299 2.228-.665 3.144-1.36a5 5 0 0 0 .652-.586h-5.18l-6.996-7.001-5.154-8.446-1.77 1.526z" />
                            <path color="#000" fill="#fff" d="M585.006 89.899c-.072-1.658-1.522-3.04 2.957-5.295 5.495-2.767 21.735-6.196 26.269-10.357 3.354-3.077-12.157-6.503-9.5-10.198 1.206-1.676 10.194-3.448 14.183-5.227 3.783-1.687 2.615-3.42 5.423-5.175 2.712-1.697 11.8-3.414 12.463-5.184-1.798 1.816-11.884 3.522-15.538 5.18-3.857 1.748-3.707 3.44-8.535 5.09-5.2 1.777-15.39 3.548-17.732 5.268-4.906 3.603 8.09 7.355 2.797 10.36-7.168 4.067-25.784 7.474-33.505 10.358-5.336 1.993-4.905 3.064-5.18 5.18"
                            />
                        </g>
                    </g>
                </g>
                <text y={412} x={562} fill="#767676" fontWeight={700} fontSize={32} textAnchor="middle">
                    <tspan>{"NO IMAGE"}</tspan>
                    <tspan y={450} x={560}>{"AVAILABLE"}</tspan>
                </text>
            </g>
        </svg>
    )
}