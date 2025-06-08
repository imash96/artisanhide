import { StarIcon } from "lucide-react";

interface RatingProps {
    rating: number;
    text?: string;
    className?: string
}

const RatingSystem = ({ rating, text, className }: RatingProps) => {

    return (
        <div className={`rating flex gap-x-0.5 items-center text-center text-gray-600 ${className && className}`}>
            <h2 className="sr-only">Reviews</h2>
            <p className="sr-only">{rating} out of 5 stars</p>
            {[0, 1, 2, 3, 4].map((index) => (
                <StarIcon key={index} size={18} strokeWidth={0} className={`${index < rating ? "fill-amber-400" : "fill-gray-300"}`} aria-hidden="true" />
            ))}
            {text && <span className='ml-2'>{text}</span>}
        </div>
    );
}

export default RatingSystem;