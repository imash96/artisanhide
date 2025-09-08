import { blogData } from "@/JSON/blog-old";
import Container from "@module/common/create-section";
import Button from "@module/common/custom-button";
import BlogCard from "@module/home/components/blog-card";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Our Blogs",
    description: "Explore our latest blogs on leather jackets and accessories.",
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
                pages.push(i);
            } else if (pages[pages.length - 1] !== "...") {
                pages.push("...");
            }
        }
        return pages;
    };

    return (
        <Container className="py-12 md:py-16 lg:py-20">
            {/* Header */}
            <header className="text-center space-y-4 mb-12">
                <h1 className="text-4xl md:text-5xl font-bold">Our Blog</h1>
                <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                    Discover the latest trends, care tips, and style inspiration from the world of leather fashion at Artisan Hide.
                </p>
            </header>

            {/* Blog Grid */}
            {blogsToShow.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {blogsToShow.map((item, index) => (
                        <BlogCard key={index} post={item} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-foreground-muted text-lg">No blogs available at the moment.</p>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <nav className="flex items-center justify-center gap-x-2 border-t mt-6 px-4 sm:px-0">

                    <div className="flex w-0 flex-1">
                        <Link
                            href={`/blog?page=${currentPage - 1 <= 0 ? 1 : currentPage - 1}`}
                            className={`inline-flex items-center border-t-2 pr-1 pt-4 text-sm font-medium hover:border-indigo-500 hover:text-indigo-600 ${currentPage < 2 ? "pointer-events-none border-transparent" : "text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                            aria-label="Previous Page"
                        >
                            <ArrowLeft aria-hidden="true" className="mr-3 h-5 w-5 text-gray-400" />
                            Previous
                        </Link>
                    </div>


                    {getPageNumbers().map((page, idx) => (
                        <div key={idx} className="flex items-center">
                            {page === "..." ? (
                                <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">...</span>
                            ) : (
                                <Link
                                    href={`/blog?page=${page}`}
                                    className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium  ${currentPage === page
                                        ? "border-indigo-500 text-indigo-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                        }`}
                                    aria-label={`Page ${page}`}
                                >
                                    {page}
                                </Link>
                            )}
                        </div>
                    ))}

                    <div className="flex w-0 flex-1 justify-end">
                        <Link
                            href={`/blog?page=${currentPage + 1}`}
                            className={`inline-flex items-center border-t-2 pl-1 pt-4 text-sm font-medium hover:border-indigo-500 hover:text-indigo-600 ${currentPage > totalPages ? "pointer-events-none" : "text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                            aria-label="Next Page"
                        >
                            Next
                            <ArrowRight aria-hidden="true" className="ml-3 h-5 w-5 text-gray-400" />
                        </Link>
                    </div>
                </nav>
            )
            }
        </Container >
    );
};