import { blogData } from "@/JSON/blog";
import SectionHeader from "@module/home/components/section-header";
import BlogCard from "@module/home/components/blog-card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Blogs",
    description: "Discover the latest trends, care tips, and style inspiration from the world of leather fashion at Artisan Hide.",
    alternates: {
        canonical: `${process.env.FRONTEND_URL}/blog`,
    },
};

export default async function Page(props: PageProps<"/blog">) {
    const query = await props.searchParams
    const currentPage = Number(query.page) || 1;
    const limit = 12;
    const totalBlogs = blogData.length;
    const totalPages = Math.ceil(totalBlogs / limit);

    const sortedBlogs = [...blogData].sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());

    const start = (currentPage - 1) * limit;
    const end = start + limit;
    const blogsToShow = sortedBlogs.slice(start, end);

    const getPageNumbers = () => {
        const delta = 2;
        const pages: (number | string)[] = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                pages.push(i)
            } else if (pages[pages.length - 1] !== "...") {
                pages.push("...")
            }
        }
        return pages;
    };

    return (
        <SectionHeader title="Our Blog" desc="Discover the latest trends, care tips, and style inspiration from the world of leather fashion at Artisan Hide." sectionName="blogs">
            {/* Blog Grid */}
            {blogsToShow.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {blogsToShow.map((item, index) => (
                        <BlogCard key={index} post={item} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-foreground-muted text-lg">No blogs available at the moment.</p>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <nav className="flex items-center justify-center md:justify-end mt-8 gap-2 flex-wrap border-t-2 pt-4" aria-label="Pagination">
                    {/* Prev */}
                    <Link
                        href={`/blog?page=${currentPage - 1 <= 0 ? 1 : currentPage - 1}`}
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
                                    href={`/blog?page=${page}`}
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
                        href={`/blog?page=${currentPage + 1 > totalPages ? totalPages : currentPage + 1}`}
                        aria-label="Next page"
                        className={`inline-flex items-center justify-center rounded-full border px-3 py-2 text-sm font-medium min-w-11 h-10 shadow-sm transition-all ${currentPage >= totalPages ? "bg-btn-disabled text-btn-disabled-foreground border-border cursor-not-allowed opacity-60" : "bg-background-elevated text-foreground border-border hover:bg-btn-primary hover:text-btn-primary-foreground hover:border-btn-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"}`}
                    >
                        Next
                        <ArrowRight className="size-4 ml-2" />
                    </Link>
                </nav>
            )}
        </SectionHeader >
    );
};

export async function generateStaticParams() {
    return []
}