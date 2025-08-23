import { Star } from "lucide-react";

type RatingProps = {
    averageRating: number;
    reviewCount?: number;
    size?: "sm" | "md" | "lg";
    className?: string;   // extra classes
    type?: "card" | "test";
}

const sizeMap = { sm: 12, md: 16, lg: 20 } as const;
const textMap = { sm: "text-xs", md: "text-sm", lg: "text-md" } as const;

export default function Rating({ averageRating, reviewCount = 0, size = "sm", className = "", type }: RatingProps) {
    const average = averageRating ?? 0;
    const rounded = Math.floor(average);

    return (
        <div className={`flex items-center gap-1 ${className}`} aria-label={`${average.toFixed(1)} out of 5 stars`} >
            {[5, 4, 3, 2, 1].map((_, i) => (
                <Star
                    key={i}
                    size={sizeMap[size]}
                    className={`${i < rounded ? "fill-accent text-accent" : "fill-foreground-muted text-foreground-muted"}`}
                />
            ))}
            {type !== "test" &&
                <>
                    {type !== "card" && (
                        <span className={`font-medium ${textMap[size]}`}>
                            {average.toFixed(1)}
                        </span>
                    )}
                    <span className={`text-muted-foreground ${textMap[size]}`}>
                        ({reviewCount} review{reviewCount === 1 ? "" : "s"})
                    </span>
                </>
            }
        </div>
    );
}
