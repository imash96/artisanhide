"use client"

import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function BlogCard({ post }: { post: BlogPost }) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group block overflow-hidden no-scrollbar transition-all duration-300 bg-background border"
        >
            {/* Image Container */}
            <div className="relative h-48 sm:h-56 overflow-hidden no-scrollbar">
                <Image
                    src={post.thumbnail || "/svg/placeholder.svg"}
                    alt={post.title}
                    width={350}
                    height={250}
                    className="object-fill transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-overlay via-overlay-hover to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Category Badge */}
                <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-md shadow-sm">
                    {post.category}
                </span>

                {/* Read More Button */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <div className="bg-accent text-accent-foreground rounded-full p-2 shadow-md">
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Meta Information */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <time dateTime={post.uploadDate}>
                            {new Date(post.uploadDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </time>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-accent">
                    <span className="hover:underline">{post.title}</span>
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-foreground-muted leading-relaxed mb-3 line-clamp-3">
                    {post.excerpt}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden  no-scrollbar">
                        <Image
                            src={post.author.avatar || "/svg/placeholder.svg"}
                            alt={post.author.name}
                            width={35}
                            height={35}
                            className="object-fill"
                            sizes="32px"
                        />
                    </div>
                    <p className="text-sm font-medium">{post.author.name}</p>
                </div>
            </div>
        </Link>
    )
}
