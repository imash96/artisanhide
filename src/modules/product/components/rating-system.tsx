import { StarIcon } from "lucide-react";

interface RatingProps {
    rating?: {
        rating: number,
        reviewCount: number
    };
}

export default function RatingSystem({ rating }: RatingProps) {

    return (
        <div className='flex items-center gap-2 mb-2'>
            <h2 className="sr-only">Rating</h2>
            <p className="sr-only">{rating?.rating} out of 5 stars</p>
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className={`w-4 h-4 ${i < Math.floor(rating?.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                ))}
            </div>
            <span className="text-sm font-medium">{rating?.rating}</span>
            <span className="text-sm text-muted-foreground">({rating?.reviewCount} reviews)</span>
        </div>
    );
};