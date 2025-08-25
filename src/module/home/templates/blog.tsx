import { ArrowRight } from "lucide-react"
import BlogCard from "../components/blog-card"
import Button from "@module/common/custom-button"
import SectionHeader from "../components/section-header"

export default function Blog() {
    return (
        <SectionHeader title="Blogs & Articles" desc="Discover fashion insights, style tips, guides and the latest trends here." sectionName="blog-article">

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {blogPosts.map(post => (
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

const blogPosts = [
    {
        id: "2",
        title: "Spring Fashion Trends: Fresh Looks for the New Season",
        excerpt:
            "Explore the latest spring fashion trends that will keep you stylish and comfortable. From pastel colors to lightweight fabrics, discover what's trending this season.",
        image:
            "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        author: {
            name: "Michael Chen",
            avatar:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        },
        publishedAt: "2024-01-12",
        readTime: "7 min read",
        category: "Fashion",
        slug: "spring-fashion-trends-2024",
    },
    {
        id: "3",
        title: "Sustainable Beauty: Eco-Friendly Products That Actually Work",
        excerpt:
            "Learn about sustainable beauty products that don't compromise on quality. We review the best eco-friendly options for your daily beauty routine.",
        image:
            "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        author: {
            name: "Emma Wilson",
            avatar:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        },
        publishedAt: "2024-01-10",
        readTime: "6 min read",
        category: "Beauty",
        slug: "sustainable-beauty-eco-friendly-products",
    },
    {
        id: "4",
        title: "Home Decor Essentials: Creating a Cozy Living Space",
        excerpt:
            "Transform your home into a cozy sanctuary with these essential decor tips. From lighting to textiles, discover how to create the perfect ambiance.",
        image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        author: {
            name: "David Rodriguez",
            avatar:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        },
        publishedAt: "2024-01-08",
        readTime: "8 min read",
        category: "Home & Living",
        slug: "home-decor-essentials-cozy-living",
    },
    {
        id: "5",
        title: "Tech Accessories That Will Upgrade Your Daily Routine",
        excerpt:
            "Discover the latest tech accessories that can streamline your daily life. From wireless chargers to smart home devices, find your perfect tech companion.",
        image:
            "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        author: {
            name: "Alex Thompson",
            avatar:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        },
        publishedAt: "2024-01-05",
        readTime: "4 min read",
        category: "Technology",
        slug: "tech-accessories-upgrade-routine",
    },
]