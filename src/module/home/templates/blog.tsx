import { ArrowRight } from "lucide-react"
import BlogCard from "../components/blog-card"
import Button from "@module/common/custom-button"
import SectionHeader from "../components/section-header"
import { blogData } from "@/JSON/blog"

export default function Blog() {
    return (
        <SectionHeader title="Blogs & Articles" desc="Discover fashion insights, style tips, guides and the latest trends here." sectionName="blog-article">

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {blogData.slice(0, 4).map(post => (
                    <BlogCard key={post.id} post={post} />
                ))}
            </div>
            <div className="flex justify-center">
                <Button href="/blog" variant="outline" color="secondary">
                    <span>View All Articles</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </SectionHeader>
    )
}