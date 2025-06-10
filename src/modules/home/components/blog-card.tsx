"use client"

import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

interface BlogPost {
    id: string
    title: string
    excerpt: string
    image: string
    author: {
        name: string
        avatar: string
    }
    publishedAt: string
    readTime: string
    category: string
    slug: string
}

interface BlogCardProps {
    post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <article className="group relative overflow-hidden no-scrollbar">
            {/* Image Container */}
            <div className="relative h-48 sm:h-56 overflow-hidden no-scrollbar">
                <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-800 shadow-sm">
                        {post.category}
                    </span>
                </div>

                {/* Read More Button - Appears on Hover */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
                    <div className="bg-white/90 rounded-full backdrop-blur-sm p-2 shadow-lg">
                        <ArrowRight className="w-4 h-4 text-gray-800" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="py-4">
                {/* Meta Information */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </time>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 no-scrollbar group-hover:text-blue-600 transition-colors duration-300">
                    <Link href={`/blog/${post.slug}`} className="hover:underline" aria-label="Read this blog">
                        {post.title}
                    </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 no-scrollbar">{post.excerpt}</p>

                {/* Author */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 overflow-hidden no-scrollbar">
                            <Image
                                src={post.author.avatar || "/placeholder.svg"}
                                alt={post.author.name}
                                fill
                                className="object-cover"
                                sizes="32px"
                            />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}
