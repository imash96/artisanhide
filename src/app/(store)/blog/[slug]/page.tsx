import Image from "next/image";
import { blogData } from "@/JSON/blog";

import Button from "@module/common/custom-button";
import { ChevronLeft } from "lucide-react";

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
    const { slug } = await props.params;
    const blog = blogData.find((b) => b.slug === slug);

    if (!blog) {
        return {
            title: "Blog Not Found | Your Brand",
            description: "The blog you are looking for does not exist.",
        };
    }

    return {
        title: blog.seo?.metaTitle || blog.title,
        description: blog.seo?.metaDescription || blog.excerpt,
        openGraph: {
            siteName: "Artisan Hide",
            title: blog.seo?.ogTitle || blog.title,
            description: blog.seo?.ogDescription || blog.excerpt,
            url: `${process.env.FRONTEND_URL}/blog/${blog.slug}`,
            type: "article",
            images: [
                {
                    url: blog.thumbnail,
                    width: 1200,
                    height: 630,
                    alt: blog.title,
                },
            ],
        },
        twitter: {
            card: blog.seo?.twitterCard || "summary_large_image",
            title: blog.title,
            description: blog.excerpt,
            images: [blog.thumbnail],
        },
        alternates: {
            canonical: `${process.env.FRONTEND_URL}/blog/${blog.slug}`,
        },
    };
}

export default async function Page(props: PageProps<"/blog/[slug]">) {
    const { slug } = (await props.params);
    const blog = blogData.find((b) => b.slug === slug);

    if (!blog) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 lg:py-20 space-y-6 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-destructive">Blog Not Found</h1>
                <p className="text-lg text-foreground-muted">The blog you are looking for doesn’t exist.</p>
                <Button href="/blog">
                    Back to Blogs
                </Button>
            </div>
        );
    }

    return (
        <article className="max-w-4xl mx-auto px-4 py-8 md:py-12 lg:py-16 space-y-10">
            {/* Blog Header */}
            <header className="space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                    {blog.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-foreground-muted">
                    <span>Published on {new Date(blog.uploadDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span>•</span>
                    <span>By {blog.author.name}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                </div>
                <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden">
                    <Image
                        src={blog.thumbnail}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <p className="text-lg md:text-xl text-foreground-disabled leading-relaxed">
                    {blog.excerpt}
                </p>
            </header>

            {/* Blog Content */}
            <div className="space-y-8 md:space-y-10">
                {blog.content?.map((section, index) => (
                    <section
                        key={index}
                        className={`flex flex-col ${section.imageLeft ? 'md:flex-row-reverse' : 'md:flex-row'} gap-6 md:gap-8 items-start`}
                    >
                        {section.thumbanil && (
                            <div className="w-full md:w-1/2 relative h-64 rounded-lg overflow-hidden shadow-md">
                                <Image
                                    src={section.thumbanil}
                                    alt={section.heading || 'Blog image'}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div className={`${section.thumbanil ? 'w-full md:w-1/2' : 'w-full'} space-y-4`}>
                            {section.heading && (
                                <h2 className="text-2xl md:text-3xl font-semibold text-templateBrown">
                                    {section.heading}
                                </h2>
                            )}
                            {section.para.map((paragraph, pIndex) => (
                                <p key={pIndex} className="leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            {/* Footer / Related or Back */}
            <footer className="pt-8 border-t border-border">
                <Button href="/blog" variant="outline">
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Back to All Blogs
                </Button>
            </footer>
        </article>
    );
};


export async function generateStaticParams() {
    return blogData.map(p => ({ id: p.id.toString() }));
}