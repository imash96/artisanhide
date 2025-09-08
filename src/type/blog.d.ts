
interface BlogPost {
    id: string
    title: string
    slug: string
    uploadDate: string
    author: {
        name: string
        avatar: string
    }
    category: string
    tags: string[]
    excerpt: string
    thumbnail: string
    content?: {
        heading?: string
        para: string[];
        type: string;
        imageLeft: boolean;
        thumbanil?: string;
    }[]
    readTime: string
    status?: "published" | "draft" | string
    seo?: {
        metaTitle: string,
        metaDescription: string,
        metaKeywords: string[],
        canonicalUrl: string,
        ogTitle: string,
        ogDescription: string,
        ogImage: string,
        twitterCard: string,
    } & Record<string, any>
}