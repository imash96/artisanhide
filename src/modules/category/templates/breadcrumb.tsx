import Link from "next/link";

type BreadcrumbProps = {
    heading: string;
    breadCrumb: any[];
}

export default function Breadcrumb({ heading, breadCrumb }: BreadcrumbProps) {
    return (
        <div className="overflow-hidden border-t border-white/10 relative">
            <div className="text-center Container py-10 relative md:py-8 lg:py-14 text-brown space-y-2">
                <h1 className="text-2xl lg:text-3xl tracking-wide font-normal capitalize">
                    {heading}
                </h1>
                <ul className="flex flex-wrap text-xs md:text-sm items-center gap-0.5 md:gap-1 justify-center text-brown">
                    {breadCrumb.map((item, index) => (
                        <li key={index} className={`flex items-center gap-0.5 md:gap-1.5 font- tracking-wide capitalize ${index === breadCrumb.length - 1 ? "text-brown underline underline-offset-2  font-medium" : ""}`}>
                            {index === 0 ? (
                                <Link href="/" className="hover:text-brown">
                                    {item}
                                </Link>
                            ) : (
                                <span>{item}</span>
                            )}
                            {index < breadCrumb.length - 1 && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide h-4 md:h-5 lucide-chevron-right"
                                >
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};