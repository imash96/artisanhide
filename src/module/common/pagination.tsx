import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Pagination({ totalPages, currentPage, getPageNumbers, href }: PaginationProps) {
    return (
        <>
            {totalPages > 1 && (
                <nav className="flex items-center justify-center md:justify-end mt-8 gap-2 flex-wrap border-t-2 pt-4" aria-label="Pagination">
                    {/* Prev */}
                    <Link
                        href={`${href}?page=${currentPage - 1 <= 0 ? 1 : currentPage - 1}`}
                        aria-label="Previous page"
                        className={`inline-flex items-center justify-center rounded-full border px-3 py-2 text-sm font-medium min-w-11 h-10 shadow-sm transition-all ${currentPage <= 1 ? "bg-btn-disabled text-btn-disabled-foreground border-border cursor-not-allowed opacity-60" : "bg-background-elevated text-foreground border-border hover:bg-btn-primary hover:text-btn-primary-foreground hover:border-btn-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"}`}
                    >
                        <ArrowLeft className="size-4 mr-2" />
                        Prev
                    </Link>

                    {/* Page Numbers */}
                    {getPageNumbers().map((page, idx) => (
                        <div key={idx} className="hidden md:flex items-center">
                            {page === "..." ? (
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full text-muted select-none">
                                    …
                                </span>
                            ) : (
                                <Link
                                    href={`${href}?page=${page}`}
                                    aria-label={`Page ${page}`}
                                    aria-current={currentPage === page ? "page" : undefined}
                                    className={`inline-flex items-center justify-center rounded-full border px-3 py-2 text-sm font-medium min-w-11 h-10 transition-all shadow-sm ${currentPage === page ? "bg-primary text-primary-foreground border-primary shadow-soft" : "bg-background-elevated text-foreground border-border hover:bg-btn-primary hover:text-btn-primary-foreground hover:border-btn-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"}`}
                                >
                                    {page}
                                </Link>
                            )}
                        </div>
                    ))}

                    {/* Next */}
                    <Link
                        href={`${href}?page=${currentPage + 1 > totalPages ? totalPages : currentPage + 1}`}
                        aria-label="Next page"
                        className={`inline-flex items-center justify-center rounded-full border px-3 py-2 text-sm font-medium min-w-11 h-10 shadow-sm transition-all ${currentPage >= totalPages ? "bg-btn-disabled text-btn-disabled-foreground border-border cursor-not-allowed opacity-60" : "bg-background-elevated text-foreground border-border hover:bg-btn-primary hover:text-btn-primary-foreground hover:border-btn-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"}`}
                    >
                        Next
                        <ArrowRight className="size-4 ml-2" />
                    </Link>
                </nav>
            )}
        </>
    )
}

type PaginationProps = {
    totalPages: number,
    currentPage: number,
    getPageNumbers: () => (string | number)[]
    href: string
}