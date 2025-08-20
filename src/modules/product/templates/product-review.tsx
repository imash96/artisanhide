import RatingSystem from "@modules/common/rating-system"
import RatingBreakdown from "../components/rating-breakdown"
import Image from "next/image"
import Button from "@modules/common/custom-button"

const reviews = {
    average: 4,
    totalCount: 1624,
    counts: [
        { rating: 5, count: 1019 },
        { rating: 4, count: 162 },
        { rating: 3, count: 97 },
        { rating: 2, count: 199 },
        { rating: 1, count: 147 },
    ],
    featured: [
        {
            id: 1,
            rating: 5,
            content:
                "This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.",
            author: "Emily Selman",
            avatarSrc:
                "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
        },
        {
            id: 2,
            rating: 4,
            content:
                "I love how versatile this bag is. It can hold anything ranging from cookies that come in trays to cookies that come in tins.",
            author: "Mark Edwards",
            avatarSrc:
                "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 3,
            rating: 5,
            content:
                "Before getting the Ruck Snack, I struggled my whole life with pulverized snacks, endless crumbs, and other heartbreaking snack catastrophes. Now, I can stow my snacks with confidence and style!",
            author: "Hector Gibbons",
            avatarSrc:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
        },
        {
            id: 4,
            rating: 5,
            content:
                "This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.",
            author: "Emily Selman",
            avatarSrc:
                "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
        },
        {
            id: 5,
            rating: 4,
            content:
                "I love how versatile this bag is. It can hold anything ranging from cookies that come in trays to cookies that come in tins.",
            author: "Mark Edwards",
            avatarSrc:
                "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 6,
            rating: 5,
            content:
                "Before getting the Ruck Snack, I struggled my whole life with pulverized snacks, endless crumbs, and other heartbreaking snack catastrophes. Now, I can stow my snacks with confidence and style!",
            author: "Hector Gibbons",
            avatarSrc:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
        },
    ],
}

export default function ProductReview() {
    return (
        <section aria-labelledby="product-review-heading" className="py-16">
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
                {/* LEFT PANEL */}
                <div className="lg:col-span-4">
                    <h2
                        id="product-review-heading"
                        className="text-2xl font-semibold text-gray-900"
                    >
                        Customer Reviews
                    </h2>

                    <div className="mt-3 flex items-center gap-2">
                        <RatingSystem rating={reviews.average} />
                        <p className="text-sm text-gray-600">
                            Based on {reviews.totalCount.toLocaleString()} reviews
                        </p>
                    </div>

                    <div className="mt-6">
                        <RatingBreakdown reviews={reviews} />
                    </div>

                    <div className="mt-10">
                        <h3 className="text-lg font-medium text-gray-900">
                            Share your thoughts
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                            If you&apos;ve used this product, share your experience with
                            others.
                        </p>

                        <Button
                            href="#"
                            variant="outline"
                            className="w-full mt-4 rounded-lg text-sm"
                        >
                            Write a review
                        </Button>
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="mt-12 lg:mt-0 lg:col-span-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Recent Reviews
                    </h2>

                    <div className="space-y-4">
                        {reviews.featured.slice(0, 4).map((review) => (
                            <div
                                key={review.id}
                                className="border-b border-gray-200 p-6"
                            >
                                <div className="flex items-center">
                                    <Image
                                        src={review.avatarSrc}
                                        alt={review.author}
                                        width={48}
                                        height={48}
                                        className="rounded-full"
                                    />
                                    <div className="ml-4">
                                        <h3 className="text-sm font-semibold text-gray-900">
                                            {review.author}
                                        </h3>
                                        <RatingSystem rating={review.rating} />
                                    </div>
                                </div>

                                <p className="mt-4 text-base text-gray-700 leading-relaxed">
                                    {review.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
