import { StarIcon } from "lucide-react";

type ReviewCount = {
    rating: number;
    count: number;
}

type ReviewData = {
    totalCount: number;
    counts: ReviewCount[];
}

type RatingBreakdownProps = {
    reviews: ReviewData;
}

export default function RatingBreakdown({ reviews }: RatingBreakdownProps) {
    return (
        <div className="mt-6">
            <h3 className="sr-only">Review data</h3>

            <dl className="space-y-3">
                {reviews.counts.map((count) => (
                    <div key={count.rating} className="flex items-center text-sm">
                        <dt className="flex-1 flex items-center">
                            <p className="w-3 font-medium text-gray-900">
                                {count.rating}
                                <span className="sr-only"> star reviews</span>
                            </p>
                            <div aria-hidden="true" className="ml-1 flex-1 flex items-center">
                                <StarIcon
                                    className={`h-5 w-5 flex-shrink-0 ${count.count > 0 ? 'text-amber-400' : 'text-gray-300'}`}
                                />
                                <div className="ml-3 relative flex-1">
                                    <div className="h-3 bg-gray-100 border border-gray-200 rounded-full" />
                                    {count.count > 0 && (
                                        <div
                                            className="absolute inset-y-0 bg-amber-400 border border-amber-400 rounded-full"
                                            style={{ width: `calc(${count.count} / ${reviews.totalCount} * 100%)` }}
                                        />
                                    )}
                                </div>
                            </div>
                        </dt>
                        <dd className="ml-3 w-10 text-right tabular-nums text-sm text-gray-900">
                            {Math.round((count.count / reviews.totalCount) * 100)}%
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}

